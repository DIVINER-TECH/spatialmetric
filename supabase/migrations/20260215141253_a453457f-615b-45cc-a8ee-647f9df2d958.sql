
-- Create storage bucket for content images
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true);

-- Allow public read access
CREATE POLICY "Content images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'content-images');

-- Allow service role to upload (edge functions use service role)
CREATE POLICY "Service role can upload content images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'content-images');

CREATE POLICY "Service role can update content images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'content-images');
