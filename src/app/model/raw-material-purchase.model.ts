export interface RawMaterialPurchaseResponse {
  id: number;
  materialName: string;
  quantityPurchased: number;
  unitPrice: number;
  supplierName?: string;
  dateOfPurchase?: string;
  createdAt?: string;
  totalPrice: number;
  isEdit?: boolean;
}
