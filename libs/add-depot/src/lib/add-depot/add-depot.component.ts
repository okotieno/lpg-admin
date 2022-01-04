import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'lpg-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.scss']
})
export class AddDepotComponent {
  form = this.fb.group({
    'depotName': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

}
