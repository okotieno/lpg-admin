import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IOrder, IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'orders';
  constructor(private http: HttpClient) {
  }


  getOrders({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<IOrder[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteOrderWithId(id: number) {
    return this.http.delete<IResponse<{headers: {message: string}}>>(`${this.url}/${id}`)
  };

  createOrder(data: IOrder) {
    return this.http.post<IResponse<IOrder>>(this.url, data)
  };

  updateOrder({ id, ...data}: { brandName: string; id: number }) {
    return this.http.patch<IResponse<IOrder>>(`${this.url}/${id}`, data)
  };
}
