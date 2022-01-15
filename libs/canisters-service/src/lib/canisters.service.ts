import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICanister, IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})
export class CanistersService {

  url = 'canisters';
  constructor(private http: HttpClient) {
  }


  getCanisters({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<ICanister[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteCanisterWithId(id: number) {
    return this.http.delete<IResponse<{headers: {message: string}}>>(`${this.url}/${id}`)
  };

  createCanister(data: ICanister) {
    return this.http.post<IResponse<ICanister>>(this.url, data)
  };

  updateCanister({ id, ...data}: { brandName: string; id: number }) {
    return this.http.patch<IResponse<ICanister>>(`${this.url}/${id}`, data)
  };
}
