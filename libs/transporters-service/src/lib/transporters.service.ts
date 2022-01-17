import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse, ITransporter } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TransportersService {

  url = 'transporters';
  transporters$ = this.getTransporters({perPage: 100, page: 1}).pipe(
    map(({data}) => data),
  )

  constructor(private http: HttpClient) {
  }

  getTransporters({perPage, page}: { perPage: number, page: number }) {
    return this.http.get<IResponse<ITransporter[]>>(this.url, {params: {['page_size']: perPage, page}});
  }

  deleteTransporterWithId(id: number) {
    return this.http.delete<IResponse<Record<string, never>>>(`${this.url}/${id}`)
  };

  createTransporter(data: { depotName: string }) {
    return this.http.post<IResponse<ITransporter>>(this.url, data)
  };

  updateTransporter({id, ...data}: { depotName: string; id: number }) {
    return this.http.patch<IResponse<ITransporter>>(`${this.url}/${id}`, data)
  };

  getRoles({ transporterId, perPage, page}: { perPage: number, page: number, transporterId: number }) {
    return this.http.get<IResponse<any[]>>(`${this.url}/${transporterId}/roles`, {params: {['page_size']: perPage, page}});
  }
}
