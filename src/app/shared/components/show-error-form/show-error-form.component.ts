import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'shared-show-error-form',
  standalone: true,
  templateUrl: './show-error-form.component.html',
})
export class ShowErrorFormComponent {
  @Input() control: null | AbstractControl = null;
  @Input() inputName: string = '';
  @Input() range: {min: number, max: number} | null = null;
}
