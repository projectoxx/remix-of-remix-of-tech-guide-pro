import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Product } from "./mock-data";

export type OverrideRow = {
  slug: string;
  price_min: number | null;
  price_old: number | null;
  discount_pct: number | null;
  offer_label: string | null;
  image_url: string | null;
  affiliate_url: string | null;
};

export type CatalogSnapshot = {
  overrides: Record<string, OverrideRow>;
  userProducts: Product[];
};

/** Public read — snapshot of admin overrides and admin-created products. */
export const getCatalogSnapshot = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogSnapshot> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [ovrRes, upRes] = await Promise.all([
      supabaseAdmin
        .from("product_overrides")
        .select("slug, price_min, price_old, discount_pct, offer_label, image_url, affiliate_url"),
      supabaseAdmin.from("user_products").select("data"),
    ]);

    if (ovrRes.error) console.error("[catalog] overrides:", ovrRes.error);
    if (upRes.error) console.error("[catalog] user_products:", upRes.error);

    const overrides: Record<string, OverrideRow> = {};
    for (const row of (ovrRes.data ?? []) as OverrideRow[]) {
      overrides[row.slug] = row;
    }
    const userProducts = ((upRes.data ?? []) as Array<{ data: Product }>).map((r) => r.data);

    return { overrides, userProducts };
  },
);

const adminBody = z.object({
  password: z.string().min(1),
});

function requireAdmin(password: string) {
  const expected = process.env.ADMIN_PANEL_PASSWORD;
  if (!expected) throw new Error("ADMIN_PANEL_PASSWORD not configured");
  if (password !== expected) throw new Error("Senha incorreta");
}

const saveOverrideInput = adminBody.extend({
  slug: z.string().min(1),
  priceMin: z.number().nullable().optional(),
  priceOld: z.number().nullable().optional(),
  discountPct: z.number().int().min(0).max(99).nullable().optional(),
  offerLabel: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional().or(z.literal("")),
  affiliateUrl: z.string().url().nullable().optional().or(z.literal("")),
});

export const saveOverride = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => saveOverrideInput.parse(d))
  .handler(async ({ data }) => {
    requireAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      slug: data.slug,
      price_min: data.priceMin ?? null,
      price_old: data.priceOld ?? null,
      discount_pct: data.discountPct ?? null,
      offer_label: data.offerLabel || null,
      image_url: data.imageUrl || null,
      affiliate_url: data.affiliateUrl || null,
    };
    const { error } = await supabaseAdmin.from("product_overrides").upsert(row);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteOverride = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => adminBody.extend({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    requireAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("product_overrides")
      .delete()
      .eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveUserProduct = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    adminBody.extend({ product: z.record(z.string(), z.any()) }).parse(d),
  )
  .handler(async ({ data }) => {
    requireAdmin(data.password);
    const p = data.product as Product;
    if (!p.slug) throw new Error("Produto sem slug");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_products")
      .upsert({ slug: p.slug, data: p as never });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteUserProduct = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => adminBody.extend({ slug: z.string() }).parse(d))
  .handler(async ({ data }) => {
    requireAdmin(data.password);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("user_products").delete().eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => adminBody.parse(d))
  .handler(async ({ data }) => {
    requireAdmin(data.password);
    return { ok: true };
  });
