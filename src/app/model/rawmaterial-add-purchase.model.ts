export interface RawMaterialPurchaseRequest {
  materialName: string;
  dateOfPurchase: Date;
  unitPrice: number;
  quantityPurchased: number;
  supplierName?: string;

}
