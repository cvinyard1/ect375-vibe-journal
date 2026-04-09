-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_prices ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies
-- Users can only see their own projects
CREATE POLICY "Users can view their own projects"
ON projects FOR SELECT
USING (auth.uid() = user_id);

-- Users can only create projects for themselves
CREATE POLICY "Users can create projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own projects
CREATE POLICY "Users can update their own projects"
ON projects FOR UPDATE
USING (auth.uid() = user_id);

-- Users can only delete their own projects
CREATE POLICY "Users can delete their own projects"
ON projects FOR DELETE
USING (auth.uid() = user_id);

-- Materials RLS Policies
-- Users can view materials only from their own projects
CREATE POLICY "Users can view materials in their projects"
ON materials FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = materials.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can create materials only in their own projects
CREATE POLICY "Users can create materials in their projects"
ON materials FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can update materials only in their own projects
CREATE POLICY "Users can update materials in their projects"
ON materials FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = materials.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can delete materials only from their own projects
CREATE POLICY "Users can delete materials from their projects"
ON materials FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = materials.project_id
    AND projects.user_id = auth.uid()
  )
);

-- Material Prices RLS Policies
-- Users can view prices only for materials in their projects
CREATE POLICY "Users can view prices for their materials"
ON material_prices FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM materials
    JOIN projects ON projects.id = materials.project_id
    WHERE materials.id = material_prices.material_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can create prices only for materials in their projects
CREATE POLICY "Users can create prices for their materials"
ON material_prices FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM materials
    JOIN projects ON projects.id = materials.project_id
    WHERE materials.id = material_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can update prices only for materials in their projects
CREATE POLICY "Users can update prices for their materials"
ON material_prices FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM materials
    JOIN projects ON projects.id = materials.project_id
    WHERE materials.id = material_prices.material_id
    AND projects.user_id = auth.uid()
  )
);

-- Users can delete prices only for materials in their projects
CREATE POLICY "Users can delete prices for their materials"
ON material_prices FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM materials
    JOIN projects ON projects.id = materials.project_id
    WHERE materials.id = material_prices.material_id
    AND projects.user_id = auth.uid()
  )
);
