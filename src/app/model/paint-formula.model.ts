export interface PaintFormulaItem {
  rawMaterialId: number;
  rawMaterialName: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface PaintFormula {
  id: number;
  paintName: string;
  batchSize: number;
  batchUnit: string;
  items: PaintFormulaItem[];
  active: boolean;

  isEdit?: boolean;
}
