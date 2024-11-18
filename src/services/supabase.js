import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://zfytsmckrvikjwfqhgws.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmeXRzbWNrcnZpa2p3ZnFoZ3dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxMDI3MjksImV4cCI6MjA0NTY3ODcyOX0.7UWaAEWs0WHaftIU2E3G8FxcYBquTiQjxPSkSJqJS-w"
const supabase = createClient(supabaseUrl, supabaseKey) 
export default supabase 