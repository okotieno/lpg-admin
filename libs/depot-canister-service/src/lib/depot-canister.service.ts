import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICanister, IResponse } from "@lpg/data";

@Injectable({
  providedIn: 'root'
})
export class DepotCanisterService {

  constructor(private http: HttpClient) { }

  getCanisters({depotId, params}: {depotId: number, params: { filled: boolean, available: boolean }}) {
    return this.http.get<IResponse<ICanister[]>>(`depots/${depotId}/canisters`, {params})
  }
}
