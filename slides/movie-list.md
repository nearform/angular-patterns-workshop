# Step 4: Output a list of movies

<div class="dense">

- **Angular** templates allow **conditional rendering** parts of it by using the `ngIf` directive primarily with the shorthand syntax `*ngIf="condition"`
- Another familiar programming concept, **for loops**, are implemented in **Angular** templates as the `ngFor` directive and can be used with the shorthand syntax `*ngFor="let movie of movies"` 
- Simple values in templates can be **interpolated** using the double curly brackets, e.g. `{{movie.description}}`
- Another useful concept available in templates is **pipes**, which similar to piping data on the commandline allow transforming values via one or more pipes, e.g. `{{ birthday | date | uppercase}}`
- When working with observable streams a particularly useful pipe is the `async` pipe which not only transforms the latest value of the stream into a value that can be used in the template but also automatically unsubscribes to the stream when the component is destroyed

</div>

---

# Step 4: Exercise

<div class="dense">

- Render a basic list of popular movies based on the response from tmdb
- You will need 
- 💡 To make it look nicer you should consider using the [material card](https://material.angular.io/components/card/overview) which is installed and ready to use
- 💡 To add a little space in the list try adding the `stack` class to the list container

</div>

---

# Step 4: Trying it out

You can view the results of your work by visiting the page and should look similar to the screenshot:

<img src="images/simple-list-of-movies.png" alt="Screenshot of simple movie list" />
