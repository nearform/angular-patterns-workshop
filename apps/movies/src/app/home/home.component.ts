import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
