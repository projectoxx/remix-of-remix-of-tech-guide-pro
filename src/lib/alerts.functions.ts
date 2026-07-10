import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscribeInput = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

export const subscribeAlert = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => subscribeInput.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Upsert by email (unique index); reset unsubscribed_at if resubscribing.
    const { error } = await supabaseAdmin
      .from("price_alert_subscribers")
      .upsert(
        { email: data.email, unsubscribed_at: null },
        { onConflict: "email" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
