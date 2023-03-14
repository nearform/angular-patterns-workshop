# Step 2: Angular services

<div class="dense">

- An Angular service is a TypeScript class that can be used to share business or data access logic across an application
- Services can be marked as injectable using the [`@Injectable`](https://angular.io/guide/dependency-injection) decorator
- Setting `providedIn` to `root` ensures that Angular creates a single, shared instance and injects it into any class requesting the service

```typescript
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  ...
}
```

- 💡 A common naming convention in Angular is to include `.service` before the file extension, e.g. `movie.service.ts`

</div>

---

# Step 2: Environments

<div class="dense">

- Angular supports defining differently named [build configurations](https://angular.io/guide/build) for your project, such as `development` and `staging`, with different defaults
- The build, serve, and test commands can replace files with appropriate versions for your intended target environment
- For example, you can define an `environment.ts` with default configuration:

```typescript
// environment.ts
export const environment = {
  apiUrl: 'http://my-prod-url',
};
```

</div>

---

# Step 2: Environments

<div class="dense">

- You can then define overrides in environment specific files:

```typescript
// environment.development.ts
export const environment = {
  apiUrl: 'http://my-development-url',
};
```

- When you import from `environment.ts`, Angular will switch out the appropriate file at build/serve/test time:

```typescript
import { environment } from 'environments/environment';
```

- 💡 You can specify which configuration to use as a parameter to the Nx command, e.g. `npx nx build --configuration=development`
- 💡 The default configurations for each Nx command are specified in the `project.json` file

</div>

---

# Step 2: HttpClient

<div class="dense">

- Angular provides a stream based [`HttpClient`](https://angular.io/guide/http) for making HTTP requests

```typescript
class MyService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Config>('config').subscribe((data) => console.log(data));
  }
}
```

- 💡 You should always unsubscribe from an Observable when a component is destroyed - this is covered in the next step
- 💡 This workshop provides an `ApiService` that wraps the `HttpClient` and adds authentication headers
- 💡 In this workshop you should use the `ApiService` rather than the `HttpClient` directly to avoid authentication errors from TMDB

</div>

---

# Step 2: Exercise 💻

<div class="dense">

- Create an Angular service (in the `start-here` directory) to retrieve **popular movies** from the [The Movie Database](https://www.themoviedb.org/) (TMDB)
- Your service method will return a stream to which components and templates can subscribe
- Use the `pipe` and `map` operators to map the stream values into a collection of movies (`id`, `title`, and `overview`)
- 💡 Inject the `ApiService` into your service constructor and use it to make an HTTP GET request to `movies/popular`
- 💡 See the [TMDB API Documentation](https://developers.themoviedb.org/3/movies/get-popular-movies) for details on the response shape
- 💡 You will need to create a TMDB account and add your **API Key (v3 auth)** to a development environment file (`src/environments/environment.development.ts`):

```typescript
apiKey: '<YOUR_API_KEY_HERE>',
```

</div>

---

# Step 2: Trying it out

<div class="dense">

- Inject your service into your movie list component via the constructor
- To test your service response, you can subscribe to your _get popular movies_ method from the component and `console.log` any values from the stream
- 💡 You can implement the `OnInit` interface and subscribe to the stream within the component's `ngOnInit` lifecycle event

</div>
