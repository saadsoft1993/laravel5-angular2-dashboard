import {Component} from '@angular/core';
import {SidebarService} from '../../services/sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    providers: [SidebarService]

})

export class MainSidebarComponent {
    
}