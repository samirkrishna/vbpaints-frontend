export interface RawMaterial {
  id: number;
  name: string;
  category: string;
  unitOfMeasure: string;
  minimumStockLevel: number;
  description?: string;
  isEdit?: boolean;
}
