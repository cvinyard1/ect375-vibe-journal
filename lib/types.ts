// Database Types - Auto-generated from Supabase schema
export interface Project {
  id: string;
  user_id: string;
  name: string;
  project_number: string;
  budget: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Material {
  id: string;
  project_id: string;
  part_number: string;
  material_name: string;
  quantity_ordered: number;
  quantity_received: number;
  quantity_needed: number;
  status: "ordered" | "received" | "needed";
  unit_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialPrice {
  id: string;
  material_id: string;
  current_price: number;
  source: string | null;
  updated_at: string;
}

// Form Types
export interface CreateProjectInput {
  name: string;
  project_number: string;
  budget?: number;
  description?: string;
}

export interface UpdateProjectInput {
  name?: string;
  budget?: number;
  description?: string;
}

export interface CreateMaterialInput {
  project_id: string;
  part_number: string;
  material_name: string;
  quantity_ordered?: number;
  quantity_received?: number;
  quantity_needed?: number;
  status?: "ordered" | "received" | "needed";
  unit_price?: number;
  notes?: string;
}

export interface UpdateMaterialInput {
  part_number?: string;
  material_name?: string;
  quantity_ordered?: number;
  quantity_received?: number;
  quantity_needed?: number;
  status?: "ordered" | "received" | "needed";
  unit_price?: number;
  notes?: string;
}

export interface CreateMaterialPriceInput {
  material_id: string;
  current_price: number;
  source?: string;
}
