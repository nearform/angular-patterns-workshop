import { environment } from '../../environments/environment'

/*
 Given a tmdb poster filename generate the full url for the thumbnail version of the image
 */
export const tmdbPosterThumbnailUrl = (filename: string) =>
  `${environment.imageBaseUrl}t/p/w92${filename}`
