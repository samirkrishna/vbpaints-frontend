import {SupplierTransactionItem} from "./supplier-transaction.model";

export interface SupplierTransactionRequest {
  vendorId: number,
  vehicleType: string,
  vehicleNumber: string,
  items: SupplierTransactionItem[]

}
