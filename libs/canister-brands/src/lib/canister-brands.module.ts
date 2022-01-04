import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanisterBrandsComponent } from './canister-brands/canister-brands.component';
import { RouterModule } from "@angular/router";
import { LayoutModule } from "@lpg/layout";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CanisterBrandsComponent
    }]),
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    CanisterBrandsComponent
  ],
})
export class CanisterBrandsModule {}
