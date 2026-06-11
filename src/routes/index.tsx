import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { HeroSection } from "@/components/store/HeroSection";
import { PopularGames } from "@/components/store/PopularGames";
import { Categories } from "@/components/store/Categories";
import { ProductGrid } from "@/components/store/ProductGrid";
import { SocialProofToast } from "@/components/store/SocialProofToast";
import { Footer } from "@/components/store/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deu Bug Store — Keys Steam com entrega instantânea" },
      {
        name: "description",
        content:
          "Compre keys Steam com preços imbatíveis e ativação na hora. Os melhores jogos digitais com até 99% OFF e pagamento via Pix.",
      },
      { property: "og:title", content: "Deu Bug Store — Keys Steam" },
      {
        property: "og:description",
        content: "Os melhores jogos Steam com entrega instantânea e descontos de até 99%.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <Header cartCount={0} />
      <AnnouncementBar />
      <main className="relative z-10">
        <HeroSection />
        <PopularGames />
        <Categories />
        <ProductGrid />
      </main>
      <Footer />
      <SocialProofToast />
    </div>
  );
}
