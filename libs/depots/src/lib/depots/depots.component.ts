import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DepotsService } from "@lpg/depots-service";
import { MatDialog } from "@angular/material/dialog";
import { AddDepotComponent } from "../../../../add-depot/src/lib/add-depot/add-depot.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'lpg-depots',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DepotsComponent {
  constructor(private depotsService: DepotsService, private dialog: MatDialog) {

  }

  dataSource$ = this.depotsService.depots$;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null = null;

  openAddDepotDialog() {
    this.dialog.open(AddDepotComponent, {
      data: {
        animal: 'panda',
      },
    });
  }
}

