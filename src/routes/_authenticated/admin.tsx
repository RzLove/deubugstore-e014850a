import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllProducts,
  upsertProduct,
  deleteProduct,
  seedCatalog,
  changeAdminPassword,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Painel Admin — Deu Bug Store" }] }),
});

type ProductRow = {
  id: string;
  slug: string;
  category: "games" | "streaming";
  name: string;
  short_description: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  is_active: boolean;
  is_sold_out: boolean;
  variations: any[];
  data: Record<string, any>;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const list = useServerFn(listAllProducts);
  const upsert = useServerFn(upsertProduct);
  const del = useServerFn(deleteProduct);
  const seed = useServerFn(seedCatalog);
  const changePw = useServerFn(changeAdminPassword);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => list(),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-products"] });

  const seedMut = useMutation({
    mutationFn: () => seed(),
    onSuccess: (r: any) => {
      alert(`Seed concluído. Inseridos: ${r.inserted}. Já existentes: ${r.skipped}.`);
      invalidate();
    },
    onError: (e: any) => alert(`Erro no seed: ${e.message}`),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: invalidate,
  });

  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [creating, setCreating] = useState<"games" | "streaming" | null>(null);
  const [tab, setTab] = useState<"games" | "streaming">("games");

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  async function onChangePassword() {
    const pw = prompt("Nova senha (mínimo 8 caracteres):");
    if (!pw) return;
    try {
      await changePw({ data: { newPassword: pw } });
      alert("Senha alterada com sucesso.");
    } catch (e: any) {
      alert(`Erro: ${e.message}`);
    }
  }

  const products: ProductRow[] = (data as any)?.products ?? [];
  const filtered = products.filter((p) => p.category === tab);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Painel Admin</h1>
          <div className="flex gap-2">
            <button
              onClick={() => seedMut.mutate()}
              disabled={seedMut.isPending}
              className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              {seedMut.isPending ? "Sincronizando…" : "Importar catálogo atual"}
            </button>
            <button
              onClick={onChangePassword}
              className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Trocar senha
            </button>
            <button
              onClick={logout}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("games")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${tab === "games" ? "bg-primary text-primary-foreground" : "border border-border"}`}
            >
              Jogos ({products.filter((p) => p.category === "games").length})
            </button>
            <button
              onClick={() => setTab("streaming")}
              className={`rounded-md px-4 py-2 text-sm font-medium ${tab === "streaming" ? "bg-primary text-primary-foreground" : "border border-border"}`}
            >
              Streaming ({products.filter((p) => p.category === "streaming").length})
            </button>
          </div>
          <button
            onClick={() => setCreating(tab)}
            className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
          >
            + Novo produto
          </button>
        </div>

        {isLoading && <p className="text-muted-foreground">Carregando…</p>}
        {error && <p className="text-red-500">Erro: {(error as Error).message}</p>}

        {!isLoading && filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
            Nenhum produto. Clique em <strong>Importar catálogo atual</strong> para popular o banco
            com os jogos e serviços de streaming já existentes no site.
          </div>
        )}

        <div className="grid gap-2">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
            >
              {p.image && (
                <img src={p.image} alt="" className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  R$ {Number(p.price).toFixed(2)} · estoque {p.stock}{" "}
                  {p.is_sold_out && <span className="ml-1 text-red-500">· ESGOTADO</span>}
                  {!p.is_active && <span className="ml-1 text-yellow-500">· INATIVO</span>}
                </p>
              </div>
              <button
                onClick={() => setEditing(p)}
                className="rounded-md border border-border px-3 py-1 text-sm hover:bg-accent"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  if (confirm(`Excluir "${p.name}"?`)) delMut.mutate(p.id);
                }}
                className="rounded-md border border-red-500/50 px-3 py-1 text-sm text-red-500 hover:bg-red-500/10"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </main>

      {(editing || creating) && (
        <ProductEditor
          row={editing}
          createCategory={creating}
          onClose={() => {
            setEditing(null);
            setCreating(null);
          }}
          onSave={async (payload) => {
            try {
              await upsert({ data: payload });
              invalidate();
              setEditing(null);
              setCreating(null);
            } catch (e: any) {
              alert(`Erro: ${e.message}`);
            }
          }}
        />
      )}
    </div>
  );
}

function ProductEditor({
  row,
  createCategory,
  onClose,
  onSave,
}: {
  row: ProductRow | null;
  createCategory: "games" | "streaming" | null;
  onClose: () => void;
  onSave: (p: any) => void;
}) {
  const [form, setForm] = useState<any>(() => ({
    id: row?.id,
    slug: row?.slug ?? "",
    category: row?.category ?? createCategory ?? "games",
    name: row?.name ?? "",
    short_description: row?.short_description ?? "",
    description: row?.description ?? "",
    price: row?.price ?? 0,
    image: row?.image ?? "",
    stock: row?.stock ?? 0,
    is_active: row?.is_active ?? true,
    is_sold_out: row?.is_sold_out ?? false,
    variations: row?.variations ?? [],
    sort_order: row?.sort_order ?? 0,
    data: row?.data ?? {},
  }));

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  function addVariation() {
    set("variations", [
      ...form.variations,
      { id: `var-${Date.now()}`, name: "Nova variação", price: 0, stock: 0, isActive: true },
    ]);
  }
  function updateVar(i: number, k: string, v: any) {
    const next = [...form.variations];
    next[i] = { ...next[i], [k]: v };
    set("variations", next);
  }
  function removeVar(i: number) {
    set("variations", form.variations.filter((_: any, j: number) => j !== i));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{row ? "Editar produto" : "Novo produto"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Slug (URL)"><input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} /></Field>
          <Field label="Categoria">
            <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option value="games">Jogos</option>
              <option value="streaming">Streaming</option>
            </select>
          </Field>
          <Field label="Nome" wide><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Descrição curta" wide><input className={inputCls} value={form.short_description} onChange={(e) => set("short_description", e.target.value)} /></Field>
          <Field label="Descrição completa" wide>
            <textarea rows={4} className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="URL da imagem/banner" wide>
            <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
            <p className="mt-1 text-xs text-muted-foreground">Upload de arquivo será adicionado em breve. Por enquanto, cole a URL pública da imagem.</p>
          </Field>
          <Field label="Preço (R$)"><input type="number" step="0.01" className={inputCls} value={form.price} onChange={(e) => set("price", parseFloat(e.target.value) || 0)} /></Field>
          <Field label="Estoque"><input type="number" className={inputCls} value={form.stock} onChange={(e) => set("stock", parseInt(e.target.value) || 0)} /></Field>
          <Field label="Status" wide>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} />
                Ativo (visível no site)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_sold_out} onChange={(e) => set("is_sold_out", e.target.checked)} />
                Esgotado
              </label>
            </div>
          </Field>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold">Variações</h3>
            <button onClick={addVariation} className="rounded-md border border-border px-2 py-1 text-xs hover:bg-accent">+ Adicionar</button>
          </div>
          {form.variations.length === 0 && <p className="text-xs text-muted-foreground">Sem variações.</p>}
          {form.variations.map((v: any, i: number) => (
            <div key={i} className="mb-2 grid grid-cols-[1fr_100px_80px_auto] gap-2">
              <input className={inputCls} value={v.name} onChange={(e) => updateVar(i, "name", e.target.value)} placeholder="Nome" />
              <input type="number" step="0.01" className={inputCls} value={v.price} onChange={(e) => updateVar(i, "price", parseFloat(e.target.value) || 0)} placeholder="Preço" />
              <input type="number" className={inputCls} value={v.stock} onChange={(e) => updateVar(i, "stock", parseInt(e.target.value) || 0)} placeholder="Estoque" />
              <button onClick={() => removeVar(i)} className="text-red-500 hover:text-red-400">✕</button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-accent">Cancelar</button>
          <button onClick={() => onSave(form)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Salvar</button>
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary";

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
