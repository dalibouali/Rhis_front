import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        window.alert("heeeeeeey" + error.message);
        window.location.assign('login');

      } else {
        window.alert(error.message);
      }
    } else {
      console.error(error);
    }

  }

  constructor() { }
}
