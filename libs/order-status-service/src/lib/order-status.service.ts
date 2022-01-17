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
  assignOrderToTransporter ({orderId, transporterId}: {orderId: number, transporterId: number}){
    return this.http.post<IResponse<IOrder>>(`${this.url}/${orderId}/status`, {transporterId} )
  }
}
