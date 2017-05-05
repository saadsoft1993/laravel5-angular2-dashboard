import {Http, Response} from '@angular/http';

export abstract class ApiService {

    protected readonly url: string;

    constructor(protected http: Http) {
    }

    protected map(response: Response) {
        return response.text() ? response.json() : {};
    }
}

