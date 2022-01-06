import { Injectable } from "@angular/core";
import { loadError } from "./actions";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ErrorFacade {
  constructor(private store: Store) {
  }
  loadFormErrors(err: any) {
    this.store.dispatch(loadError(
      {
        data: (Object.values(err) as any[])
          .reduce((a: string[], b: string[]) => [...a, ...b], [])
          .map((message: string) => ({ message }))
      }
    ))
  }
}
