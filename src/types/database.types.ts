export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      b_user_height: {
        Row: {
          b_height: number | null
          user_id: string
        }
        Insert: {
          b_height?: number | null
          user_id?: string
        }
        Update: {
          b_height?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "b_user_height_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      brand: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          brand_id: number | null
          created_at: string
          description: string | null
          id: number
          image_url: string | null
          model_code: string | null
          name: string | null
          price: number | null
          stock: number | null
        }
        Insert: {
          brand_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          model_code?: string | null
          name?: string | null
          price?: number | null
          stock?: number | null
        }
        Update: {
          brand_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image_url?: string | null
          model_code?: string | null
          name?: string | null
          price?: number | null
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["id"]
          }
        ]
      }
      user_img: {
        Row: {
          created_at: string | null
          original: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          original?: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          original?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_img_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_info: {
        Row: {
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          id?: number
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preprocess: {
        Row: {
          cropped: string | null
          densepose: string | null
          "image-parse-v3": string | null
          pose_json: Json | null
          segment: string | null
          user_id: string
        }
        Insert: {
          cropped?: string | null
          densepose?: string | null
          "image-parse-v3"?: string | null
          pose_json?: Json | null
          segment?: string | null
          user_id?: string
        }
        Update: {
          cropped?: string | null
          densepose?: string | null
          "image-parse-v3"?: string | null
          pose_json?: Json | null
          segment?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preprocess_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_img"
            referencedColumns: ["user_id"]
          }
        ]
      }
      user_result: {
        Row: {
          product_id: number
          result_img: string | null
          user_id: string
        }
        Insert: {
          product_id: number
          result_img?: string | null
          user_id: string
        }
        Update: {
          product_id?: number
          result_img?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_result_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_result_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_img"
            referencedColumns: ["user_id"]
          }
        ]
      }
      user_size: {
        Row: {
          l_sleeve: number | null
          s_sleeve: number | null
          user_id: string
          width: number | null
        }
        Insert: {
          l_sleeve?: number | null
          s_sleeve?: number | null
          user_id: string
          width?: number | null
        }
        Update: {
          l_sleeve?: number | null
          s_sleeve?: number | null
          user_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_size_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "b_user_height"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      test_kanye: {
        Args: {
          name: string
        }
        Returns: string
      }
      test_talk_to: {
        Args: {
          name: string
        }
        Returns: string
      }
    }
    Enums: {
      user_type_enum: "NORMAL" | "KIOSK"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
