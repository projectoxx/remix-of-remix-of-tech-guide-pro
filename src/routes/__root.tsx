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
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getCatalogSnapshot } from "@/lib/catalog.functions";
import { CatalogProvider } from "@/context/catalog-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
      { title: "TechRadar Brasil — Reviews, Comparativos e Rankings de Eletrônicos" },
      { name: "description", content: "A autoridade brasileira em reviews de tecnologia. Testes laboratoriais rigorosos de TVs, smartphones, notebooks, fones e mais — reviews baseados em dados, não em hype." },
      { name: "author", content: "TechRadar Brasil" },
      { name: "theme-color", content: "#0f4c81" },
      { property: "og:site_name", content: "TechRadar Brasil" },
      { property: "og:title", content: "TechRadar Brasil — Reviews, Comparativos e Rankings de Eletrônicos" },
      { property: "og:description", content: "A autoridade brasileira em reviews de tecnologia. Testes laboratoriais rigorosos de TVs, smartphones, notebooks, fones e mais — reviews baseados em dados, não em hype." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@TechRadarBR" },
      { name: "twitter:title", content: "TechRadar Brasil — Reviews, Comparativos e Rankings de Eletrônicos" },
      { name: "twitter:description", content: "A autoridade brasileira em reviews de tecnologia. Testes laboratoriais rigorosos de TVs, smartphones, notebooks, fones e mais — reviews baseados em dados, não em hype." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d33a069a-01d2-43c2-9db4-010e727a69b7/id-preview-f813d4cb--34f48845-9eaf-4429-8fc9-55b826d19e4c.lovable.app-1783541644313.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d33a069a-01d2-43c2-9db4-010e727a69b7/id-preview-f813d4cb--34f48845-9eaf-4429-8fc9-55b826d19e4c.lovable.app-1783541644313.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:wght@500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TechRadar Brasil",
          description: "Portal brasileiro de reviews, comparativos e rankings de eletrônicos.",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  loader: async () => {
    try {
      return { catalog: await getCatalogSnapshot() };
    } catch (e) {
      console.error("[root] catalog loader failed", e);
      return { catalog: { overrides: {}, userProducts: [] } };
    }
  },
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
  const { catalog } = Route.useLoaderData();

  return (
    <QueryClientProvider client={queryClient}>
      <CatalogProvider initial={catalog}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </CatalogProvider>
    </QueryClientProvider>
  );
}
