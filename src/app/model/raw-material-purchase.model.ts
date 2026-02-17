export interface PurchaseLevel {
  packSize: number;
  unit: string;
  itemCount: number;
  unitPrice: number;
  totalPrice?: number;
}

export interface RawMaterialPurchaseResponse {
  id: number;
  materialName: string;
  supplierName: string;
  quantityPurchased: number;
  unitPrice: number;
  totalPrice: number;
  dateOfPurchase: string;
  createdAt: string;

  purchaseLevels: PurchaseLevel[];

  isEdit?: boolean;
  isExpanded?: boolean; // 👈 add this
}

