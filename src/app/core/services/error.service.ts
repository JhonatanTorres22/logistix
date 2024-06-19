import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public show(message: string): string {
    // TODO: When we have the modals module or toasted display the error
    return message;
  }
}
