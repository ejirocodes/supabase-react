import { Database } from './supabase';

export type Book = Database['public']['Tables']['book']['Row']
