import { Component, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormActions } from '@shared/interfaces/formActions.enum';

import { FormComponent } from '../../components/form/form.component';
import { Resident } from '../../interfacse/resident.interface';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss',
})
export class ResidentComponent {
  private modalService = inject(NgbModal);

  protected readonly FormActions = FormActions;

  loadResident(): void {}

  onOpenFormModal(action: FormActions, residentInfo?: Resident): void {
    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    const isEditing: boolean = action === FormActions.edit;

    modalRef.componentInstance.modalTitle = isEditing ? 'Editar' : 'Nuevo';
    modalRef.componentInstance.residentInfo = isEditing ? residentInfo : null;
    modalRef.result.then((isCreated: boolean) => {
      if (isCreated) {
        this.loadResident();
      }
    });
  }
}
