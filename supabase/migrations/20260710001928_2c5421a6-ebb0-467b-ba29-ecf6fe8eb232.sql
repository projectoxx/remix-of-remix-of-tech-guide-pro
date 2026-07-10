
-- Silence linter: explicit no-op policy documenting server-only access
CREATE POLICY "No public access to subscribers"
  ON public.price_alert_subscribers FOR SELECT
  USING (false);
