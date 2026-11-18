![CI](https://github.com/nearform/hub-template/actions/workflows/ci.yml/badge.svg?event=push)

# Angular patterns workshop

A workshop about beginner and intermediate Angular patterns.

## Getting started

Open and follow the slide deck at https://nearform.github.io/angular-patterns-workshop/.

## Running locally

### Requirements

- Node.js 24.19.0 or a newer 24.x release, matching `package.json`'s `engines.node` contract (`^24.19.0`)
  - With [nvm](https://github.com/nvm-sh/nvm), run `nvm install` and `nvm use` from the repository root to use the version pinned in `.nvmrc` (also used by CI)
  - Use the npm bundled with this Node.js version
- An API key from [The Movie Database](https://developers.themoviedb.org/3/getting-started/authentication)

### Setup

- Clone this repository
- Run `npm ci` from the repository root to install the locked dependencies
- Set up the local development environment:
  - Sign up to [The Movie Database](https://www.themoviedb.org/)
  - Make a note of your API key at Settings -> API -> Request an API Key -> Developer -> API Key (v3 auth)
  - Copy `apps/movies/src/environments/environment.ts` to `apps/movies/src/environments/environment.development.ts`
  - Update the `apiKey` property with the value of your API key
  - The development environment file is already ignored by Git; do not commit it or any API keys. The tracked environment file should retain its placeholder values
- `npm run movies` to start the application
  - To complete the exercises you will need to be signed in to TMDB
  - To sign in, select the "Login" button in the top right of the UI
- `npm run slides` to start the slide deck (optional)
