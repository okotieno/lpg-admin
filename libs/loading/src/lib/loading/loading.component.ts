import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from "../services/loading.service";
import { debounceTime, distinctUntilChanged } from "rxjs";

@Component({
  selector: 'lpg-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  isLoading$ = this.loadingService.isLoading$.pipe(
    debounceTime(0),
    distinctUntilChanged(),
  );
  constructor(private loadingService: LoadingService) {
  }
}
