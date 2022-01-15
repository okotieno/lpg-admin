import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrViewerComponent } from './qr-viewer.component';
import { MatCardModule } from "@angular/material/card";
import { QRCodeModule } from "angularx-qrcode";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  imports: [CommonModule, MatCardModule, QRCodeModule, MatButtonModule, MatIconModule, MatRippleModule, MatDialogModule, MatDividerModule],
  declarations: [
    QrViewerComponent
  ],
  exports: [
    QrViewerComponent
  ],
})
export class QrViewerModule {}
