import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent
    },
    { 
        path: ':id',
        component: UserProfileComponent,
    }
];

const isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // Don't perform initial navigation in iframes
        initialNavigation: !isIframe ? 'enabled' : 'disabled' // Remove this line to use Angular Universal
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
