import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "@lpg/data";
import { IDepot } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DepotsService {
  constructor(private http: HttpClient) {
  }

  depots$ = this.http.get<IResponse<IDepot[]>>('depots').pipe(
    map(({data}) => data)
  )
}
