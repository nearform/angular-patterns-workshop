import { Route } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UnsubscribeManuallyComponent} from "../solutions/10-unsubscribe-manually/unsubscribe-manually.component";

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'step-10-unsubscribe-manually', component: UnsubscribeManuallyComponent}
];
