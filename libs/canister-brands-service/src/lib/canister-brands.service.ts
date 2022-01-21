import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IBrand, IResponse } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CanisterBrandsService {

  brands$ = this.getBrands({perPage: 100, page: 1}).pipe(
    map(({data}) => data)
  )
  constructor(private http: HttpClient) {
  }

  getBrands({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<IBrand[]>>('brands', {params: {['page_size']: perPage, page}});
  }

  deleteBrandWithId(id: number) {
    return this.http.delete<IResponse<any[]>>(`brands/${id}`)
  };

  createBrand(data: { canisterBrandName: string }) {
    return this.http.post<IResponse<IBrand>>('brands', data)
  };

  updateBrand({ id, ...data}: { canisterBrandName: string; id: number }) {
    return this.http.patch<IResponse<IBrand>>(`brands/${id}`, data)
  };
}
