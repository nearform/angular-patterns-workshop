/*
 Given a tmdb poster filename generate the full url for the thumbnail version of the image
 */
export const tmdbPosterThumbnailUrl = (filename: string) =>
  `https://image.tmdb.org/t/p/t/p/w92${filename}`;
