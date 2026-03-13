export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            bookings: {
                Row: {
                    consultation_type: string
                    created_at: string | null
                    email: string
                    full_name: string
                    id: string
                    notes: string | null
                    phone: string
                    preferred_date: string | null
                    preferred_time: string | null
                    status: string | null
                }
                Insert: {
                    consultation_type: string
                    created_at?: string | null
                    email: string
                    full_name: string
                    id?: string
                    notes?: string | null
                    phone: string
                    preferred_date?: string | null
                    preferred_time?: string | null
                    status?: string | null
                }
                Update: {
                    consultation_type?: string
                    created_at?: string | null
                    email?: string
                    full_name?: string
                    id?: string
                    notes?: string | null
                    phone?: string
                    preferred_date?: string | null
                    preferred_time?: string | null
                    status?: string | null
                }
                Relationships: []
            }
            collections: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    image_url: string | null
                    is_active: boolean | null
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            custom_orders: {
                Row: {
                    admin_notes: string | null
                    created_at: string | null
                    delivery_timeline: string | null
                    design_reference: string | null
                    email: string
                    event_date: string | null
                    fabric_preference: string | null
                    full_name: string
                    id: string
                    measurements: Json | null
                    occasion: string | null
                    phone: string
                    status: string | null
                }
                Insert: {
                    admin_notes?: string | null
                    created_at?: string | null
                    delivery_timeline?: string | null
                    design_reference?: string | null
                    email: string
                    event_date?: string | null
                    fabric_preference?: string | null
                    full_name: string
                    id?: string
                    measurements?: Json | null
                    occasion?: string | null
                    phone: string
                    status?: string | null
                }
                Update: {
                    admin_notes?: string | null
                    created_at?: string | null
                    delivery_timeline?: string | null
                    design_reference?: string | null
                    email?: string
                    event_date?: string | null
                    fabric_preference?: string | null
                    full_name?: string
                    id?: string
                    measurements?: Json | null
                    occasion?: string | null
                    phone?: string
                    status?: string | null
                }
                Relationships: []
            }
            inquiries: {
                Row: {
                    created_at: string | null
                    email: string
                    full_name: string
                    id: string
                    is_read: boolean | null
                    message: string
                    phone: string | null
                    subject: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    full_name: string
                    id?: string
                    is_read?: boolean | null
                    message: string
                    phone?: string | null
                    subject?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    full_name?: string
                    id?: string
                    is_read?: boolean | null
                    message?: string
                    phone?: string | null
                    subject?: string | null
                }
                Relationships: []
            }
            order_items: {
                Row: {
                    id: string
                    name: string
                    order_id: string | null
                    product_id: string | null
                    quantity: number | null
                    size: string | null
                    unit_price: number
                }
                Insert: {
                    id?: string
                    name: string
                    order_id?: string | null
                    product_id?: string | null
                    quantity?: number | null
                    size?: string | null
                    unit_price: number
                }
                Update: {
                    id?: string
                    name?: string
                    order_id?: string | null
                    product_id?: string | null
                    quantity?: number | null
                    size?: string | null
                    unit_price?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "order_items_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "order_items_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                ]
            }
            orders: {
                Row: {
                    created_at: string | null
                    customer_email: string
                    customer_name: string
                    customer_phone: string | null
                    id: string
                    notes: string | null
                    status: string | null
                    total_amount: number
                }
                Insert: {
                    created_at?: string | null
                    customer_email: string
                    customer_name: string
                    customer_phone?: string | null
                    id?: string
                    notes?: string | null
                    status?: string | null
                    total_amount: number
                }
                Update: {
                    created_at?: string | null
                    customer_email?: string
                    customer_name?: string
                    customer_phone?: string | null
                    id?: string
                    notes?: string | null
                    status?: string | null
                    total_amount?: number
                }
                Relationships: []
            }
            products: {
                Row: {
                    category: string | null
                    collection_id: string | null
                    created_at: string | null
                    description: string | null
                    id: string
                    images: string[] | null
                    is_active: boolean | null
                    is_featured: boolean | null
                    name: string
                    price: number
                    sizes: string[] | null
                    slug: string
                    stock_status: string | null
                }
                Insert: {
                    category?: string | null
                    collection_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    images?: string[] | null
                    is_active?: boolean | null
                    is_featured?: boolean | null
                    name: string
                    price: number
                    sizes?: string[] | null
                    slug: string
                    stock_status?: string | null
                }
                Update: {
                    category?: string | null
                    collection_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    images?: string[] | null
                    is_active?: boolean | null
                    is_featured?: boolean | null
                    name?: string
                    price?: number
                    sizes?: string[] | null
                    slug?: string
                    stock_status?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "products_collection_id_fkey"
                        columns: ["collection_id"]
                        isOneToOne: false
                        referencedRelation: "collections"
                        referencedColumns: ["id"]
                    },
                ]
            }
            subscribers: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                }
                Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
    DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
