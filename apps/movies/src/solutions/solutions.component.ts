import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLink],
  template: `
    <mat-list>
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/01"
          >Solution 1</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/02"
          >Solution 2</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/03"
          >Solution 3</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/04"
          >Solution 4</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/05"
          >Solution 5</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/06"
          >Solution 6</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/07"
          >Solution 7</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/08"
          >Solution 8</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/09"
          >Solution 9</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/10"
          >Solution 10</a
        ></mat-list-item
      >
    </mat-list>
  `
})
export class SolutionsComponent {}
