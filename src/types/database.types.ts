export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      brand: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name?: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      product: {
        Row: {
          brand_id: number | null;
          created_at: string;
          description: string | null;
          id: number;
          image_url: string | null;
          model_code: string | null;
          name: string | null;
          price: number | null;
          stock: number | null;
        };
        Insert: {
          brand_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          model_code?: string | null;
          name?: string | null;
          price?: number | null;
          stock?: number | null;
        };
        Update: {
          brand_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          image_url?: string | null;
          model_code?: string | null;
          name?: string | null;
          price?: number | null;
          stock?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "product_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brand";
            referencedColumns: ["id"];
          },
        ];
      };
      user_img: {
        Row: {
          original: string;
          user_id: string;
        };
        Insert: {
          original?: string;
          user_id?: string;
        };
        Update: {
          original?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_img_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_info: {
        Row: {
          id: number;
          name: string | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          name?: string | null;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_info_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_size: {
        Row: {
          height: number | null;
          l_sleeve: number | null;
          s_sleeve: number | null;
          user_id: string;
          width: number | null;
        };
        Insert: {
          height?: number | null;
          l_sleeve?: number | null;
          s_sleeve?: number | null;
          user_id: string;
          width?: number | null;
        };
        Update: {
          height?: number | null;
          l_sleeve?: number | null;
          s_sleeve?: number | null;
          user_id?: string;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_size_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      test_kanye: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      test_talk_to: {
        Args: {
          name: string;
        };
        Returns: string;
      };
    };
    Enums: {
      user_type_enum: "NORMAL" | "KIOSK";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
