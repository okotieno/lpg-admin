import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DepotsService {

  url = 'depots';
  depots$ = this.getDepots({ perPage: 100, page: 1}).pipe(
    map(({ data }) => data ),
  )

  constructor(private http: HttpClient) {
  }

  getDepots({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<any[]>>('depots', {params: {['page_size']: perPage, page}});
  }

  deleteDepotWithId(id: number) {
    return this.http.delete<IResponse<any[]>>(`depots/${id}`)
  };

  createDepot(data: { depotName: string }) {
    return this.http.post<IResponse<any[]>>('depots', data)
  };

  updateDepot({ id, ...data}: { depotName: string; id: number }) {
    return this.http.patch<IResponse<any[]>>(`depots/${id}`, data)
  };

  getRoles({ depotId, perPage, page}: { perPage: number, page: number, depotId: number }) {
    return this.http.get<IResponse<any[]>>(`${this.url}/${depotId}/roles`, {params: {['page_size']: perPage, page}});
  }

}
