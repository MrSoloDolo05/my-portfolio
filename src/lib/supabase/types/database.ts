export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          summary: string;
          project_url: string | null;
          image_url: string | null;
          display_order: number;
          owner_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary: string;
          project_url?: string | null;
          image_url?: string | null;
          display_order?: number;
          owner_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string;
          project_url?: string | null;
          image_url?: string | null;
          display_order?: number;
          owner_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_projects_owner_id_fkey';
            columns: ['owner_id'];
            referencedTable: 'auth.users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Enums: {};
    Functions: {};
    Views: {};
  };
};
