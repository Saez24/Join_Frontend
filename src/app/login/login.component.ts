import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SignupComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
    './login.component_mobile.scss'
  ]
})

export class LoginComponent {

}
