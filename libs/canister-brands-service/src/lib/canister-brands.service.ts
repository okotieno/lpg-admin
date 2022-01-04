import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})

export class CanisterBrandsService {

  constructor(private http: HttpClient) {
  }

  getBrands({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<any[]>>('brands', {params: {['page_size']: perPage, page}});
  }

  deleteBrandWithId(id: number) {
    return this.http.delete<IResponse<any[]>>(`brands/${id}`)
  };

  createBrand(data: { brandName: string }) {
    return this.http.post<IResponse<any[]>>('brands', data)
  };

  updateBrand({ id, ...data}: { brandName: string; id: number }) {
    return this.http.patch<IResponse<any[]>>(`brands/${id}`, data)
  };
}
