import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Review = {
  id: string;
  product_slug: string;
  rating: number;
  author: string;
  comment: string;
  created_at: string;
};

export const listReviews = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string() }).parse(d))
  .handler(async ({ data }): Promise<Review[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("reviews")
      .select("id, product_slug, rating, author, comment, created_at")
      .eq("product_slug", data.slug)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      console.error("[reviews] list:", error);
      return [];
    }
    return (rows ?? []) as Review[];
  });

const submitInput = z.object({
  slug: z.string().min(1).max(200),
  rating: z.number().int().min(1).max(5),
  author: z.string().trim().min(1).max(60),
  comment: z.string().trim().min(3).max(1000),
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => submitInput.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").insert({
      product_slug: data.slug,
      rating: data.rating,
      author: data.author,
      comment: data.comment,
      status: "approved",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
