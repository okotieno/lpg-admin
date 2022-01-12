import { Component, OnInit } from '@angular/core';
import { StatisticsService } from "@lpg/statistics-service";
import { DrawerFacade } from "@lpg/layout";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: 'lpg-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  stats$ = this.statisticsService.getDashboardSummaryStats();
  constructor(private statisticsService: StatisticsService) { }


}
