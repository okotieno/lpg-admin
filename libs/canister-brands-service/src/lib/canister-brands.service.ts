import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})

export class CanisterBrandsService {

  constructor(private http: HttpClient) {
  }

  brands$ = this.http.get<IResponse<any[]>>('brands')

  getBrands({ perPage, page } : { perPage: number, page: number}) {
    return this.http.get<IResponse<any[]>>('brands', { params: { ['page_size']: perPage, page }});
  }
}
