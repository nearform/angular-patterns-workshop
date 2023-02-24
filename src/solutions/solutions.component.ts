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
        ><a matListItemTitle routerLink="/solutions/1"
          >Solution 1</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/2"
          >Solution 2</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/3"
          >Solution 3</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/4"
          >Solution 4</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/5"
          >Solution 5</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/6"
          >Solution 6</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/7"
          >Solution 7</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/8"
          >Solution 8</a
        ></mat-list-item
      >
      <mat-list-item
        ><a matListItemTitle routerLink="/solutions/9"
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
