import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss',
    './board.component_mobile.scss'
  ]
})
export class BoardComponent {

}
