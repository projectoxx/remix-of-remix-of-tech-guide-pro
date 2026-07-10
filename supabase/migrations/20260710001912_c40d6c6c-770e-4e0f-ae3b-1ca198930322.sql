
-- Product overrides (price, image, affiliate link etc) editable by admin
CREATE TABLE public.product_overrides (
  slug TEXT PRIMARY KEY,
  price_min NUMERIC,
  price_old NUMERIC,
  discount_pct INT,
  offer_label TEXT,
  image_url TEXT,
  affiliate_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_overrides TO anon, authenticated;
GRANT ALL ON public.product_overrides TO service_role;
ALTER TABLE public.product_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read product overrides"
  ON public.product_overrides FOR SELECT
  USING (true);

-- Admin-created products (stored as JSON blob for simplicity)
CREATE TABLE public.user_products (
  slug TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_products TO anon, authenticated;
GRANT ALL ON public.user_products TO service_role;
ALTER TABLE public.user_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read user products"
  ON public.user_products FOR SELECT
  USING (true);

-- Reviews left by visitors
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  author TEXT NOT NULL,
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX reviews_product_slug_idx ON public.reviews (product_slug, created_at DESC);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved');

-- Price alert subscribers
CREATE TABLE public.price_alert_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);
GRANT ALL ON public.price_alert_subscribers TO service_role;
ALTER TABLE public.price_alert_subscribers ENABLE ROW LEVEL SECURITY;
-- no anon/authenticated policies: all access via server functions using service role

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER product_overrides_updated_at
  BEFORE UPDATE ON public.product_overrides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER user_products_updated_at
  BEFORE UPDATE ON public.user_products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
