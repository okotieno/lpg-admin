import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IDealer, IResponse } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DealersService {
  url = 'dealers';
  dealers$ = this.getDealers({ perPage: 100, page: 1}).pipe(
    map(({ data }) => data ),
  )

  constructor(private http: HttpClient) {
  }

  getDealers({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<IDealer[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteDealerWithId(id: number) {
    return this.http.delete<IResponse<IDealer[]>>(`${this.url}/${id}`)
  };

  createDealer(data: { dealerName: string }) {
    return this.http.post<IResponse<IDealer[]>>(this.url, data)
  };

  updateDealer({ id, ...data}: { dealerName: string; id: number }) {
    return this.http.patch<IResponse<IDealer[]>>(`${this.url}/${id}`, data)
  };

  getRoles({ dealerId, perPage, page}: { perPage: number, page: number, dealerId: number }) {
    return this.http.get<IResponse<IDealer[]>>(`${this.url}/${dealerId}/roles`, {params: {['page_size']: perPage, page}});
  }
}
