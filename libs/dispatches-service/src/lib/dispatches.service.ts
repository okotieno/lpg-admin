import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICanisterBatch, IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})
export class DispatchesService {
  private url = 'canisters/batch-dispatches';

  constructor(private http: HttpClient) {

  }

  getBatches({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<ICanisterBatch[]>>(this.url, {params: {['page_size']: perPage, page}})
  }
}
