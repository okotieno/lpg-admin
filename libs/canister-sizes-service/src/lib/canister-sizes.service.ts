import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CanisterSizesService {

  sizes$ = this.getSizes().pipe(
    map(({data}) => data)
  );
  constructor(private http: HttpClient) { }

  getSizes({perPage, page} = {perPage: 100, page: 1}) {
    return this.http.get<IResponse<any[]>>('canister-sizes', {params: {['page_size']: perPage, page}});
  }
}
