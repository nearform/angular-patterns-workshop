import { Route } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { MovieList10Component } from '../solutions/10-watchlist-autorefresh/movie-list-10.component'
import { AuthApprovedComponent } from './auth/auth-approved.component'
import { ChallengesComponent } from '../challenges/challenges.component'
import { SolutionsComponent } from '../solutions/solutions.component'
import { MovieList01Component } from '../solutions/01-add-your-first-component/movie-list-01.component'
import { MovieList02Component } from '../solutions/02-create-a-movie-service/movie-list-02.component'
import { MovieList03Component } from '../solutions/03-unsubscribe-on-destroy/movie-list-03.component'
import { MovieList04Component } from '../solutions/04-render-a-list/movie-list-04.component'
import { MovieList05Component } from '../solutions/05-add-an-image/movie-list-05.component'
import { MovieList06Component } from '../solutions/06-implement-loading-states/movie-list-06.component'
import { MovieList07Component } from '../solutions/07-post-to-server/movie-list-07.component'
import { MovieList08Component } from '../solutions/08-post-to-server-unsubscribe-on-destroy/movie-list-08.component'
import { MovieList09Component } from '../solutions/09-combine-data-from-two-streams/movie-list-09.component'

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth/approved', component: AuthApprovedComponent },
  { path: 'challenges', component: ChallengesComponent, pathMatch: 'full' },
  { path: 'solutions', component: SolutionsComponent, pathMatch: 'full' },
  {
    path: 'solutions/01',
    component: MovieList01Component
  },
  {
    path: 'solutions/02',
    component: MovieList02Component
  },
  {
    path: 'solutions/03',
    component: MovieList03Component
  },
  {
    path: 'solutions/04',
    component: MovieList04Component
  },
  {
    path: 'solutions/05',
    component: MovieList05Component
  },
  {
    path: 'solutions/06',
    component: MovieList06Component
  },
  {
    path: 'solutions/07',
    component: MovieList07Component
  },
  {
    path: 'solutions/08',
    component: MovieList08Component
  },
  {
    path: 'solutions/09',
    component: MovieList09Component
  },
  {
    path: 'solutions/10',
    component: MovieList10Component
  }
]
