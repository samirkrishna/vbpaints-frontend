export interface SupplierTransactionItem {
  paintId?: string;    // ✅ NEW - references dropdown paint
  paintName?: string;  // display only
  containerSize: number;
  quantity: number;
  pricePerUnit: number;
}
