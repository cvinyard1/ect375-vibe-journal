-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  part_number VARCHAR(100) NOT NULL,
  material_name VARCHAR(255) NOT NULL,
  quantity_ordered INTEGER DEFAULT 0,
  quantity_received INTEGER DEFAULT 0,
  quantity_needed INTEGER DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'needed' CHECK (status IN ('ordered', 'received', 'needed')),
  unit_price DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_materials_project_id ON materials(project_id);
CREATE INDEX idx_materials_part_number ON materials(part_number);
CREATE INDEX idx_materials_status ON materials(status);
