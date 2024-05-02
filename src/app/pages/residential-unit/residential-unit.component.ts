import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component( {
  selector: 'app-residential-unit',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './residential-unit.component.html',
  styleUrl: './residential-unit.component.scss'
} )
export class ResidentialUnitComponent {
  public showModal = false;
  public modalTitle = 'Nuevo';

  onOpenModal( action: string ) {
    this.modalTitle = this.getModalTitle( action );
    this.showModal = true;
  }

  getModalTitle( action: string ): string {
    switch ( action ) {
      case 'create':
        return 'Nuevo';
      default:
        return 'Nuevo';
    }
  }
}
