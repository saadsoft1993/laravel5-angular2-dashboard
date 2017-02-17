import {Component} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
    // moduleId: module.id,
    // selector: 'app-blank-layout',
    templateUrl: './blank.layout.html'
})
export class BlankLayout {

    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            // newestOnTop: false,
            positionClass:'toast-bottom-right',
            timeout: 15000
        });

}