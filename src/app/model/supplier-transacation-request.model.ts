import {SupplierTransactionItem} from "./supplier-transaction.model";

export interface SupplierTransactionRequest {
  transactionId?: number;
  vendorName?: string;
  vendorId: number,
  vehicleType: string,
  vehicleNumber: string,
  transactionDate?: string;
  totalAmount?: number;
  items: SupplierTransactionItem[]

}
