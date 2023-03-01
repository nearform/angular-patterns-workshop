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

- Add the service to the `start-here` folder
- Inject the provided `ApiClient` into your service constructor and use it to make an HTTP request to `movies/popular`
- See https://developers.themoviedb.org/3/movies/get-popular-movies for details on the response shape
- Your service method will return a stream (an `Observable`) to which components and templates can subscribe


</div>

---

<div class="dense">

# Step 2: Trying it out

- Inject your service into your Hello World component
- To test your service response, you can subscribe to your get popular movies method from the component and console log any values from the stream

</div>
