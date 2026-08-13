-- AutoMod schema — safe to run alongside existing Idea Engine tables (am_ prefix)

-- ================================================================
-- VEHICLES
-- ================================================================
CREATE TABLE am_vehicles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make         TEXT NOT NULL,
  model        TEXT NOT NULL,
  variant      TEXT NOT NULL,
  generation   TEXT NOT NULL,
  year_from    INTEGER NOT NULL,
  year_to      INTEGER NOT NULL,
  model_path   TEXT NOT NULL,
  thumbnail    TEXT,
  sections     JSONB NOT NULL DEFAULT '[]',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- PARTS
-- ================================================================
CREATE TABLE am_parts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id      UUID NOT NULL REFERENCES am_vehicles(id) ON DELETE CASCADE,
  section         TEXT NOT NULL,
  name            TEXT NOT NULL,
  brand           TEXT NOT NULL,
  sku             TEXT,
  price_gbp       NUMERIC(10,2) NOT NULL,
  thumbnail_url   TEXT NOT NULL,
  buy_url         TEXT,
  description     TEXT,
  mod_type        TEXT NOT NULL,
  mod_payload     JSONB NOT NULL DEFAULT '{}',
  sort_order      INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_am_parts_vehicle_section ON am_parts(vehicle_id, section);

-- ================================================================
-- BUILDS
-- ================================================================
CREATE TABLE am_builds (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  vehicle_id      UUID NOT NULL REFERENCES am_vehicles(id) ON DELETE CASCADE,
  name            TEXT NOT NULL DEFAULT 'My Build',
  selected_parts  UUID[] NOT NULL DEFAULT '{}',
  snapshot_json   JSONB NOT NULL DEFAULT '{}',
  is_public       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_am_builds_slug    ON am_builds(slug);
CREATE INDEX idx_am_builds_user_id ON am_builds(user_id);

CREATE OR REPLACE FUNCTION am_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_am_builds_updated_at
  BEFORE UPDATE ON am_builds
  FOR EACH ROW EXECUTE FUNCTION am_set_updated_at();

-- ================================================================
-- RLS
-- ================================================================
ALTER TABLE am_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE am_parts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE am_builds   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_vehicles" ON am_vehicles FOR SELECT USING (true);
CREATE POLICY "public_read_parts"    ON am_parts    FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_builds"
  ON am_builds FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "owner_insert_builds"
  ON am_builds FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "owner_update_builds"
  ON am_builds FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "owner_delete_builds"
  ON am_builds FOR DELETE USING (auth.uid() = user_id);

-- ================================================================
-- SEED DATA — 2011 Vauxhall Astra J Turbo 1.4
-- ================================================================
INSERT INTO am_vehicles (id, make, model, variant, generation, year_from, year_to, model_path, sections)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Vauxhall',
  'Astra',
  'Turbo 1.4',
  'J (MK6)',
  2009,
  2015,
  '/models/astra-j.glb',
  '[
    {"id":"front_aero","label":"Front Aero","icon":"car-front","mesh_names":["FrontBumper","FrontSplitterV1","FrontSplitterV2","FrontSplitterV3"]},
    {"id":"rear_aero","label":"Rear Aero","icon":"wind","mesh_names":["RearBumper","RearSpoilerV1","RearSpoilerV2","RearWingV1","RearDiffuserV1","RearDiffuserV2"]},
    {"id":"side_skirts","label":"Side Skirts","icon":"layout-horizontal","mesh_names":["SideSkirtL_V1","SideSkirtR_V1","SideSkirtL_V2","SideSkirtR_V2"]},
    {"id":"wheels","label":"Wheels","icon":"circle","mesh_names":["WheelFL","WheelFR","WheelRL","WheelRR","Wheels"]},
    {"id":"paint","label":"Paint & Wrap","icon":"paintbrush","mesh_names":["Body"]},
    {"id":"window_tint","label":"Window Tint","icon":"eye-off","mesh_names":["Windows"]},
    {"id":"suspension","label":"Suspension","icon":"chevrons-down","mesh_names":["Suspension_F","Suspension_R"]},
    {"id":"exhaust","label":"Exhaust","icon":"flame","mesh_names":["ExhaustTip_Stock","ExhaustTip_Milltek","ExhaustTip_Cobra"]}
  ]'
);
