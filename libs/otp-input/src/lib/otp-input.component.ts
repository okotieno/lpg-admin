import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { takeWhile, tap, timer } from "rxjs";

@Component({
  selector: 'lpg-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent implements ControlValueAccessor, OnInit {

  @ViewChild('inputItems') inputItems?: ElementRef<HTMLDivElement>;

  @Input() otpDigits = 6;
  values: any[] = [];

  get otp() {
    let otp = '';
    for (let i = 0; i < this.otpDigits; i += 1) {
      otp += this.inputItems?.nativeElement?.querySelectorAll('input')[i].value;
    }
    return otp;
  }
  onChanges: (val: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    const updateUi = () => {
      let empty = true;
      timer(50, 50).pipe(
        tap((count) => {
          const inputs = this.inputItems?.nativeElement?.querySelectorAll('input');
          if (Number(inputs?.length) > 0) {
            for (let i = 0; i < this.otpDigits; i += 1) {
              if(inputs?.[i]) {
                inputs[i].value = obj?.[i] ? obj[i] : '';
              }

            }
            empty = false;
          } else if(count > 80) {
            empty = false;
          }
        }),
        takeWhile(() => empty)
      ).subscribe();
    };
    updateUi();
  }

  ngOnInit(): void {
    this.values = Array(this.otpDigits).fill('');
  }

  setDisabledState(isDisabled: boolean): void {
  }

  moveCursor($event: any, i: number) {
    $event.preventDefault();

    if (/^\d/.test($event.key)) {
      if (this.inputItems?.nativeElement) {
        this.inputItems.nativeElement.querySelectorAll('input')[i].value = $event.key;
      }

      if (i < this.otpDigits - 1) {
        this.inputItems?.nativeElement.querySelectorAll('input')[i + 1].focus();
      }
    }

    if (/^Backspace/.test($event.key)) {
      if (this.inputItems?.nativeElement) {
        this.inputItems.nativeElement.querySelectorAll('input')[i].value = '';
      }

      if (i > 0) {
        this.inputItems?.nativeElement?.querySelectorAll('input')[i - 1].focus();
      }
    }

    this.onChanges(this.otp);
  }

  identity = (index: number) => index;

  validate() {
    return this.otp.length === this.otpDigits ? null : {minLength: true};
  }

  pasteContent($event: any) {
    $event.preventDefault();
    const obj = $event.clipboardData.getData('Text');
    if (!RegExp(`^\\d{${this.otpDigits},${this.otpDigits}}$`).test(obj)) {
      return;
    }
    const inputs = this.inputItems?.nativeElement?.querySelectorAll('input');
    for (let i = 0; i < this.otpDigits; i += 1) {
      if(inputs?.[i]) {
        inputs[i].value = obj[i] ? obj[i] : '';
        inputs?.[i]?.focus();
      }

    }
  }
}
