import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { UnsubscribeManuallyComponent } from '../solutions/10-unsubscribe-manually/unsubscribe-manually.component'
import { AuthApprovedComponent } from './auth/auth-approved.component'

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth/approved', component: AuthApprovedComponent },
  {
    path: 'solutions/step-10-unsubscribe-manually',
    component: UnsubscribeManuallyComponent
  }
]
