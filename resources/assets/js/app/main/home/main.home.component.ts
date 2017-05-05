import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    // moduleId: module.id,
    selector: 'app-main-home',
    templateUrl: './main.home.html'
})
export class MainHomeComponent {

    public test;

    public constructor(private http: Http) {
    }

    public submit(type: string): void {
        let handler = (resp) => {
            this.test = resp.json();
        };

        switch (type) {
            case 'post':
                this.http.post('test', {test: 'test'}).subscribe(handler);
                break;

            case 'get':
                this.http.get('test').subscribe(handler);
                break;

            default:
                this.http.get(type).subscribe(handler);
                break;
        }
    }
}