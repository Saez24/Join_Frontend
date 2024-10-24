import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';
import { BoardComponent } from './board/board.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SummaryComponent } from './summary/summary.component';


export const routes: Routes = [
    {
        path: '', component: LoginComponent,

    },
    { path: 'create-account', component: SignupComponent },
    { path: 'board', component: BoardComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'add-task', component: AddTaskComponent },
    { path: 'contacts', component: ContactsComponent },
    { path: 'summary', component: SummaryComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'legal-notice', component: LegalNoticeComponent }
];
