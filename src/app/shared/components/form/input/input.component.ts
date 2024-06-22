import { NgClass, NgForOf, NgIf, NgSwitch } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'shared-form-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgForOf, NgIf, NgSwitch],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) iconClass!: string;
  @Input({ required: true }) inputType!: string;
  @Input({ required: true }) label!: string;

  @Input() data: string = '';
  @Input() disabled = false;
  @Input() formType: string = '';
  @Input() options: { id: string; value: string }[] = [];

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
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
}
