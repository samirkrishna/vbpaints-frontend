export interface StockValidationItem {
  paintId: number;
  containerSize: number;
  quantity: number;
}

export interface StockValidationRequest {
  items: StockValidationItem[];
}

export interface RowStatus {
  paintId: number;
  containerSize: number;
  requestedQty: number;
  availableQty: number;
  available: boolean;
}

export interface StockValidationResponse {
  allAvailable: boolean;
  rows: RowStatus[];
}
