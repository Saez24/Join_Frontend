import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from '../../add-task/add-task.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, AddTaskComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
