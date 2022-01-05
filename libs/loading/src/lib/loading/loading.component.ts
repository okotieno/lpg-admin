import { Component } from '@angular/core';
import { LoadingService } from "../services/loading.service";

@Component({
  selector: 'lpg-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading$ = this.loadingService.isLoading$;
  constructor(private loadingService: LoadingService) {
  }
}
