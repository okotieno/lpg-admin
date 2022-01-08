import { Component } from '@angular/core';
import { ErrorFacade } from "../store/facade";

@Component({
  selector: 'lpg-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent {

  formErrors$ = this.errorFacade.formErrors$
  constructor(private errorFacade: ErrorFacade) { }

  closeAlert() {
    this.errorFacade.clearFormErrors();
  }
}
