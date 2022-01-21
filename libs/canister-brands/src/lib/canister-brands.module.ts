import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanisterBrandsComponent } from './canister-brands/canister-brands.component';
import { RouterModule } from "@angular/router";
import { LayoutModule } from "@lpg/layout";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DeleteConfirmationModule } from "@lpg/delete-confirmation";
import { AddBrandModule } from "@lpg/add-brand";
import { CanisterDispatchModule } from "@lpg/canister-dispatch";

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
    MatIconModule,
    MatDialogModule,
    DeleteConfirmationModule,
    AddBrandModule,
    CanisterDispatchModule
  ],
  declarations: [
    CanisterBrandsComponent
  ],
})
export class CanisterBrandsModule {}
