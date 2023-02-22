import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
