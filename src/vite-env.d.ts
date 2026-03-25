/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string
  readonly VITE_SUPABASE_PROJECT_ID: string
  readonly GROQ_API_KEY: string
  readonly TAVILY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
