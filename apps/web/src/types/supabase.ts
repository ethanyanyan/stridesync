// src/types/supabase.ts
export interface Profile {
  id: string;
  full_name: string;
  role: "admin" | "coach" | "athlete";
}

export interface Plan {
  id: string;
  name: string;
}

export interface SessionEntry {
  id: string;
  date: string;
  type: string;
  distance_km: number;
}
