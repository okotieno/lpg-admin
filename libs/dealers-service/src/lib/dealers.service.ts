import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";
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
    return this.http.get<IResponse<any[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteDealerWithId(id: number) {
    return this.http.delete<IResponse<any[]>>(`${this.url}/${id}`)
  };

  createDealer(data: { dealerName: string }) {
    return this.http.post<IResponse<any[]>>(this.url, data)
  };

  updateDealer({ id, ...data}: { dealerName: string; id: number }) {
    return this.http.patch<IResponse<any[]>>(`${this.url}/${id}`, data)
  };

}
