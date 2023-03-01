# Step 2: Angular services

<div class="dense">

- An Angular service is a TypeScript class that can be used to share business or data access logic across an application
- Services can be marked as injectable using the `@Injectable` decorator
- Setting `providedIn` to `root`, ensures that Angular creates a single, shared instance and injects it into any class requesting the service


```typescript
@Injectable({
  providedIn: 'root'
})
class MovieService {}
```


</div>

---

<div class="dense">

# Step 2: Exercise 💻

- Create an Angular service to retrieve **popular movies** from the [The Movie Database](https://www.themoviedb.org/) (TMDB)
- You will need to create a TMDB account and an **API Read Access Token (v4 auth)** token
- Add your token to an `.env` file:

```
TMDB_ACCESS_TOKEN=....
```

- Angular provides a stream based `http` client for making HTTP requests
- This tutorial provides an `ApiService` that wraps the `http` service and adds authentication headers
- Inject the `ApiService` into your service constructor and use it to make an HTTP request to `movies/popular`
- 💡 See the [TMDB API Documentation](https://developers.themoviedb.org/3/movies/get-popular-movies) for details on the response shape
- Your service method will return a stream to which components and templates can subscribe
- Use the `pipe` and `map` operators to map the stream values into collection of movie `id`, `title`, and `description`

</div>

---

<div class="dense">

# Step 2: Trying it out

- Inject your service into your Hello World component via the constructor
- To test your service response, you can subscribe to your _get popular movies_ method from the component and `console.log` any values from the stream
- 💡 You can implement the `OnInit` interface and subscribe to the stream within the component's `ngOnInit` lifecycle event

</div>