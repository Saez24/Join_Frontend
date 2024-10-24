import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss',
    './signup.component_mobile.scss'
  ]
})
export class SignupComponent {

}
