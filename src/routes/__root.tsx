import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logo from "../assets/deu-bug-logo.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteBackdrop } from "../components/store/SiteBackdrop";
import { FloatingWhatsApp } from "../components/store/FloatingWhatsApp";
const META_PIXEL_ID = "1323139189897318";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    __metaPixelInitialized?: boolean;
  }
}

function initializeMetaPixel() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // Impede que o Pixel seja instalado mais de uma vez
  if (window.__metaPixelInitialized) {
    return;
  }

  window.__metaPixelInitialized = true;

  // Código-base oficial da Meta
  if (!window.fbq) {
    const fbq = function (...args: any[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    } as any;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    window.fbq = fbq;
    window._fbq = fbq;
  }

  const scriptAlreadyExists = document.querySelector(
    'script[src="https://connect.facebook.net/en_US/fbevents.js"]'
  );

  if (!scriptAlreadyExists) {
    const script = document.createElement("script");

    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript = document.getElementsByTagName("script")[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <img
          src={logo.url}
          alt="Deu Bug Store"
          width={160}
          height={160}
          className="mx-auto h-40 w-40 animate-pulse object-contain drop-shadow-[0_0_24px_rgba(123,46,255,0.55)]"
        />
        <h1 className="mt-4 text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-foreground">Deu bug nessa página</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar para a home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Deu Bug Store - Os Melhores Jogos Steam e Streaming" },
      {
        name: "description",
        content:
          "Compre jogos Steam e serviços de streaming com os melhores preços. Entrega rápida, suporte ativo e pagamento via Pix.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Deu Bug Store" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/2frHIKaoobbSByVVSvnEru3d0lN2/social-images/social-1781467514099-Bug1.webp" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: logo.url },
      { rel: "shortcut icon", type: "image/png", href: logo.url },
      { rel: "apple-touch-icon", href: logo.url },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Deu Bug Store",
          url: "https://deubugstore.lovable.app",
          logo: logo.url,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initializeMetaPixel();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteBackdrop />
      <Outlet />
      <SpeedInsights />
      <Analytics />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
