![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Angular patterns workshop

A workshop about beginner and intermediate Angular patterns.

## Getting started

Open and follow the slide deck at https://nearform.github.io/angular-patterns-workshop/.

## Running locally

### Requirements

- Node LTS
- A read only access token from [tmdb](https://developers.themoviedb.org/3/getting-started/authentication)

### Setup

- Clone this repository
- Sign up to [The Movie Database](https://www.themoviedb.org/) and make a note of your API key at Settings -> API -> API Key (v3 auth)
- Copy `src/environment/environment.ts` to `src/environment/environment.development.ts` and update `apiKey` to your API key value
- `npm i`
- `npm run movies` to start the application
- [optional] `npm run slides` to start the slide deck
