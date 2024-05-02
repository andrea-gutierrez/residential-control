import { Component, Input } from '@angular/core';

@Component( {
  selector: 'residential-unit-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
} )
export class FormComponent {
  @Input() modalTitle = 'Nuevo';
}
