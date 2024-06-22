import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgSwitch} from "@angular/common";

import {DocumentTypeMapping} from "@shared/enums/document.enum";

@Component({
  selector: 'shared-form-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf,
    NgSwitch,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {

  @Input({required: true})
  public label: string = '';

  @Input({required: true})
  public inputType: string = '';

  @Input({required: true})
  public controlName: string = '';

  @Input({required: true})
  public iconClass: string = '';

  @Input()
  public options: { id: string; value: string }[] = [];

  @Input()
  public formType: string = '';

  @Input()
  public disabled = false;

  @Input()
  public data: string = '';

  public onChangeFn = (_: any) => {
  };

  public onTouchedFn = () => {
  };

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
  }

  public get invalid(): boolean | null {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean | null {
    if (!this.control) {
      return false;
    }

    const {dirty, touched} = this.control;

    return this.invalid ? (dirty || touched) : false;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.data = obj;
  }

  public onChange() {
    this.onChangeFn(this.data);
  }

  protected readonly DocumentTypeMapping = DocumentTypeMapping;
}
