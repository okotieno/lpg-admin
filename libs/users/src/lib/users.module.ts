import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule } from "@angular/router";
import { LayoutModule } from "@lpg/layout";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { AddUserModule } from "@lpg/add-user";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent
      }
    ]),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    AddUserModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    UsersComponent
  ],
})
export class UsersModule {}
