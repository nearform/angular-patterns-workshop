import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-challenges',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLink],
  template: `
    <mat-list>
      <mat-list-item
        ><a routerLink="challenges/1">Challenge 1</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/2">Challenge 2</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/3">Challenge 3</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/4">Challenge 4</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/5">Challenge 5</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/6">Challenge 6</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/7">Challenge 7</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/8">Challenge 8</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/9">Challenge 9</a></mat-list-item
      >
      <mat-list-item
        ><a routerLink="challenges/10">Challenge 10</a></mat-list-item
      >
    </mat-list>
  `
})
export class StartHereComponent {}
