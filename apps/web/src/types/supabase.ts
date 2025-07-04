// src/types/supabase.ts
export interface Role {
  id: number;
  name: "admin" | "coach" | "athlete";
}

export interface Profile {
  id: string;
  full_name: string;
  role_id: number;
  roles: Role;
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

export interface PlanAssignment {
  id: string;
  plan_id: string;
  athlete_id: string;
  assigned_at: string;
}
