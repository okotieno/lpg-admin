import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IOrder, IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  url = 'orders';

  constructor(private http: HttpClient) {
  }

  assignOrderToTransporter({orderId, transporterId}: { orderId: number, transporterId: number }) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {transporterId})
  }

  depotToDealerDispatch({orderId , ...formValue}: { orderId: number, canisters: {canisterId: number}[]}) {
    return this.http.post<IResponse<any>>(`orders/${orderId}/dispatch`, formValue)
  }

  acceptOrder({orderId}: {orderId: number}) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {acceptOrder: true})
  }

  confirmDispatch({orderId}: {orderId: number}) {
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {acceptOrder: true})
  }

  confirmCanisterDispatch({orderId, params}: {orderId: number, params: any}) {
    return this.http.post<IResponse<any>>(`${this.url}/${orderId}/status`, {...params})
  }
}
