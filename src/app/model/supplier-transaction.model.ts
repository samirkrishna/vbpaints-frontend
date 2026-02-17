export interface SupplierTransactionItem {
  paintId?: number;    // ✅ NEW - references dropdown paint
  paintName?: string;  // display only
  containerSize: number;
  quantity: number;
  pricePerUnit: number;
}
