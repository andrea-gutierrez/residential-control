import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private spinner: NgxSpinnerService) {}

  public showSpinner() {
    this.spinner.show();
  }

  public hideSpinner() {
    this.spinner.hide();
  }
}
