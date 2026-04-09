-- Create material_prices table for price tracking history
CREATE TABLE IF NOT EXISTS material_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  current_price DECIMAL(10, 2) NOT NULL,
  source VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on material_id for faster queries
CREATE INDEX idx_material_prices_material_id ON material_prices(material_id);
