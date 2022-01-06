import { Component, OnDestroy } from '@angular/core';
import { ErrorFacade } from "../store/facade";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'lpg-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnDestroy {
  destroyed$ = new Subject();
  pageError$ = this.errorFacade.pageError$.pipe(
    tap((err) => {
      if(err.message) {
         setTimeout(() => {
           this.errorFacade.clearPageErrors();
         },6000)
      }
    }),
    takeUntil(this.destroyed$)
  );
  constructor(private errorFacade: ErrorFacade) {
  }

  ngOnDestroy() {
    this.destroyed$.next(null)
  }

  close() {
    this.errorFacade.clearPageErrors();
  }
}
