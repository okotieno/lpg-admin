import { Injectable } from "@angular/core";
import { loadError } from "./actions";
import { Store } from "@ngrx/store";
import { selectPageError } from "./selectors";

@Injectable({
  providedIn: 'root'
})
export class ErrorFacade {
  pageError$ = this.store.select(selectPageError);
  constructor(private store: Store) {
  }
  loadFormErrors(err: any) {
    this.store.dispatch(loadError(
      {
        data: {
          formErrors: (Object.values(err) as any[])
            .reduce((a: string[], b: string[]) => [...a, ...b], [])
            .map((message: string) => ({message}))
        }
      }
    ))
  }

  loadPageErrors(pageError: any) {
    this.store.dispatch(loadError({
      data: {
        pageError: pageError
      }
    }))
  }

  clearPageErrors() {
    this.store.dispatch(loadError({
      data: {
        pageError: {}
      }
    }))
  }
}
