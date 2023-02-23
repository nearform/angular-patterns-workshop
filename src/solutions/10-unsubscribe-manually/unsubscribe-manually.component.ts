import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { map } from 'rxjs'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MovieService } from '../../app/services/movie.service'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-unsubscribe-manually',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './unsubscribe-manually.component.html',
  styleUrls: ['./unsubscribe-manually.component.css']
})
export class UnsubscribeManuallyComponent {
  movies$ = this.moviesService.getPopular().pipe(map(data => data.results))

  constructor(private moviesService: MovieService) {
    moviesService.getPopular().subscribe(v => {
      console.log({ v })
    })
  }
}
