import {PageService} from './page/page.service';
import {Model} from '../Model';
import {Observable} from 'rxjs/Observable';
import {GetDataParams} from './page/GetData';
import {Response} from '@angular/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
export abstract class CrudService extends PageService {
    private getModelUrl(model: Model) {
        if (model.pk) {
            return this.getResourceUrl(model.pk)
        } else {
            return this.url;
        }
    }

    private getResourceUrl(pk: number | string) {
        return `${this.url}/${pk}`;
    }

    create(model: Model) {
        return this.handleRequest(this.http.post(this.getModelUrl(model), model));
    }

    readOne(pk: string | number) {
        return this.handleRequest(this.http.get(this.getResourceUrl(pk)));
    }

    update(model: Model) {
        return this.handleRequest(this.http.patch(this.getModelUrl(model), model));
    }

    remove(model: Model) {
        return this.handleRequest(this.http.delete(this.getModelUrl(model)));
    }

    protected getAll(params: GetDataParams): Observable<Model> {
        return this.handleRequest(super.getAll(params).map(i => i.map(this.makeModel)));
    }

    private handleRequest(obs: Observable<Response>) {
        let subject = new ReplaySubject();
        obs.subscribe(data => {
            subject.next(data)
        }, data => {
            subject.error(data)
        });
        return subject.share();
    }

    protected abstract makeModel(data: any): Model;
}

