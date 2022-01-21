import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ICanister } from "@lpg/data";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'lpg-qr-viewer',
  templateUrl: './qr-viewer.component.html',
  styleUrls: ['./qr-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrViewerComponent {

  @ViewChild('qrImgSection') qrImgSection?: ElementRef<HTMLDivElement>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICanister,
    private snackbar: MatSnackBar
  ) {
  }

  get qrData() {
    return {
      'id': this.data.canisterId,
      'size': this.data.canisterSizeId,
      'RFID': this.data.canisterRFID,
      'brand': this.data.canisterBrandName,
    }
  }

  downloadQRasImg() {
     const canvas: HTMLCanvasElement = this.qrImgSection?.nativeElement.querySelector('canvas') as HTMLCanvasElement;
     const image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
     const link = document.createElement('a');
     link.download = `canister-qr-${this.data.canisterId}.png`;
     link.href = image;
     link.click();
     this.snackbar.open('Successfully downloaded image', 'close', {
       panelClass: 'alert-success',
       horizontalPosition: "end",
       verticalPosition: "top"
     })
  }
}
