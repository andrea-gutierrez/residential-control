import {Component, Input, Optional, Output, Self} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgSwitch} from "@angular/common";
import {ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule} from "@angular/forms";
import {DocumentTypeMapping} from "../../../enums/document.enum";

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

  @Input()
  public label: string = '';

  @Input()
  public options: {id: string; value: string}[] = [];

  @Input()
  public inputType: string = '';

  @Input()
  public formType: string = '';

  @Input()
  public controlName: string = '';

  @Input()
  public iconClass: string = '';

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
