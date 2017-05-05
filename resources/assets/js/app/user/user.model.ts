import {Model} from '../core/Model';
import {UserService} from './user.service';
import {InjectionToken} from '@angular/core';
import {CrudService} from '../core/services/crud.service';
export class User extends Model {
    id:number;
    name = '';
    email = '';
    created_at = '';

    public get service():any {
        return UserService;
    }

}