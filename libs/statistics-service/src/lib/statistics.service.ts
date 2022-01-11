import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IDashboardStats, IResponse } from "@lpg/data";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) {
  }

  getDashboardSummaryStats() {
    return this.http.get<IResponse<IDashboardStats>>('statistics/dashboard-summary')
      .pipe(map(({data}) => data))
  }
}
