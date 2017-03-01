import {Component} from '@angular/core';
import {Restangular} from 'ng2-restangular';

@Component({
    // moduleId: module.id,
    selector: 'app-main-home',
    templateUrl: './main.home.html'
})
export class MainHomeComponent {

    public test;

    public constructor(private rest: Restangular) {

    }

    public submit(type:string): void {
        let handler = (resp)=>{
            console.log(resp);
            this.test = resp.json();
        };

        switch (type){
            case 'post':
                this.rest.all('test').post({test: 'test'}).subscribe(handler);
                break;

            case 'get':
                this.rest.all('test').get('').subscribe(handler);
                break;

            default:
                this.rest.all(type).get('').subscribe(handler);
                break;
        }
    }

}