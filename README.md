![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Angular patterns workshop

A workshop about beginner and intermediate Angular patterns.

## Getting started

Open and follow the slide deck at https://nearform.github.io/angular-patterns-workshop/.

## Running locally

### Requirements

- Node LTS
- An API key from [The Movie Database](https://developers.themoviedb.org/3/getting-started/authentication)

### Setup

- Clone this repository
- Add a TMDB API key:
  - Sign up to [The Movie Database](https://www.themoviedb.org/) 
  - Make a note of your API key at Settings -> API -> Request an API Key -> Developer -> API Key (v3 auth)
  - Copy `apps/movies/src/environment/environment.ts` to `apps/movies/src/environment/environment.development.ts`
  - Update the `apiKey` property with the value of your API key
- `npm i`
- `npm run movies` to start the application
  - To complete the exercises you will need to be signed in to TMDB
  - To sign in, select the "Login" button in the top right of the UI
- `npm run slides` to start the slide deck (optional)
