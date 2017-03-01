import {Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class ErrorHandler {
    constructor(private toaster: ToasterService) {
    }

    public handle(error: any, title: string): void {
        if (error instanceof Object) {
            for (let message of error) {
                if(typeof message === 'string' && message) {
                    this.toaster.pop('error', title, message);
                }
            }
        } else if (error) {
            this.toaster.pop('error', title, error);
        } else {
            this.toaster.pop('error', title, 'Enter the correct data');
        }
    }
}