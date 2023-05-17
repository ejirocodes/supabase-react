export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          author: string | null
          created_at: string | null
          id: number
          rating: number | null
          title: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: number
          rating?: number | null
          title?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: number
          rating?: number | null
          title?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
