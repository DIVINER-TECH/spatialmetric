-- Create content_items table for AI-generated content (market briefs, articles, startup profiles)
CREATE TABLE public.content_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('article', 'market-brief', 'startup-profile')),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    tags TEXT[] DEFAULT '{}',
    sources JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Content items are readable by everyone"
ON public.content_items
FOR SELECT
USING (true);

-- Create function_runs table for monitoring scheduled functions
CREATE TABLE public.function_runs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    function_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('success', 'failure', 'pending')),
    duration_ms INTEGER,
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.function_runs ENABLE ROW LEVEL SECURITY;

-- Public read access for function runs (monitoring)
CREATE POLICY "Function runs are readable by everyone"
ON public.function_runs
FOR SELECT
USING (true);

-- Create articles table for admin-managed articles
CREATE TABLE public.articles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    region TEXT,
    author_type TEXT NOT NULL DEFAULT 'ai' CHECK (author_type IN ('ai', 'human')),
    author_name TEXT DEFAULT 'SpatialMetrics AI',
    author_title TEXT DEFAULT 'AI Research Analyst',
    read_time INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    key_takeaways TEXT[] DEFAULT '{}',
    metrics JSONB DEFAULT '[]',
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public read access for published articles
CREATE POLICY "Published articles are readable by everyone"
ON public.articles
FOR SELECT
USING (is_published = true);

-- Create role type for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for admin access control
CREATE TABLE public.user_roles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own roles
CREATE POLICY "Users can read their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for articles table
CREATE POLICY "Admins can insert articles"
ON public.articles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
ON public.articles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete articles"
ON public.articles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_content_items_type ON public.content_items(type);
CREATE INDEX idx_content_items_published_at ON public.content_items(published_at DESC);
CREATE INDEX idx_function_runs_function_name ON public.function_runs(function_name);
CREATE INDEX idx_function_runs_created_at ON public.function_runs(created_at DESC);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_is_published ON public.articles(is_published);