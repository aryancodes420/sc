export type ModType = 'material_swap' | 'mesh_toggle' | 'mesh_attach' | 'ride_height';

export interface MaterialSwapPayload {
  mesh: string;
  color: string;
  metalness?: number;
  roughness?: number;
  opacity?: number;
  transparent?: boolean;
}

export interface MeshTogglePayload {
  show: string[];
  hide: string[];
}

export interface MeshAttachPayload {
  attach_node: string;
  attach_model: string;
}

export interface RideHeightPayload {
  axis: 'y';
  delta: number;
}

export type ModPayload =
  | MaterialSwapPayload
  | MeshTogglePayload
  | MeshAttachPayload
  | RideHeightPayload;

export type SectionId =
  | 'front_aero'
  | 'rear_aero'
  | 'side_skirts'
  | 'wheels'
  | 'paint'
  | 'window_tint'
  | 'suspension'
  | 'exhaust';

export interface Section {
  id: SectionId;
  label: string;
  icon: string;
  mesh_names: string[];
}

export interface Part {
  id: string;
  vehicle_id: string;
  section: SectionId;
  name: string;
  brand: string;
  sku?: string;
  price_gbp: number;
  thumbnail_url: string;
  buy_url?: string;
  description?: string;
  mod_type: ModType;
  mod_payload: ModPayload;
}

export interface PartSnapshot {
  id: string;
  name: string;
  brand: string;
  price_gbp: number;
  thumbnail_url: string;
  section: SectionId;
}

export interface BuildSnapshot {
  parts: PartSnapshot[];
  total_gbp: number;
}

export interface Build {
  id: string;
  slug: string;
  user_id?: string;
  vehicle_id: string;
  name: string;
  selected_parts: string[];
  snapshot_json: BuildSnapshot;
  is_public: boolean;
  created_at: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  generation: string;
  year_from: number;
  year_to: number;
  model_path: string;
  thumbnail?: string;
  sections: Section[];
}
