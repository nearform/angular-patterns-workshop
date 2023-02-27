import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { UnsubscribeManuallyComponent } from '../solutions/10-unsubscribe-manually/unsubscribe-manually.component'
import { AuthApprovedComponent } from './auth/auth-approved.component'
import { ChallengesComponent } from '../challenges/challenges.component'
import { SolutionsComponent } from '../solutions/solutions.component'

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth/approved', component: AuthApprovedComponent },
  { path: 'challenges', component: ChallengesComponent, pathMatch: 'full' },
  { path: 'solutions', component: SolutionsComponent, pathMatch: 'full' },
  {
    path: 'solutions/10',
    component: UnsubscribeManuallyComponent
  }
]
