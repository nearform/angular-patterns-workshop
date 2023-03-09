# Step 4: Structural directives

<div class="dense">

- Angular provides a set of built-in [structural directives](https://angular.io/guide/structural-directives) such as `NgIf`, `NgForOf`, `NgSwitch` and others which are commonly used in all Angular projects
- Angular templates allow **conditional rendering** by using the `NgIf` directive primarily with the shorthand syntax `*ngIf="condition"`
- Another familiar programming concept, **for loops**, are implemented in Angular templates as the `NgForOf` directive and can be used with the shorthand syntax `*ngFor="let movie of movies"`
- Simple values in templates can be **interpolated** using double curly brackets, e.g. `{{movie.overview}}`
- Templates also support **pipes**, which similar to piping data on the command-line, allow transforming values via one or more chained functions, e.g. `{{ birthday | date | uppercase}}`
- When working with Observable streams, a particularly useful pipe is `async`, which not only unwraps the value, but also automatically unsubscribes to the stream when the component is destroyed

</div>

---

# Step 4: Structural directives

<div class="dense">

- Angular transforms the shorthand form (e.g. `*ngIf`, `*ngFor`) into a surrounding `ng-template` and the directive becomes a property binding on the `ng-template`, e.g:

```html
<div *ngIf="movie">{{move.title}}</div>
```

Becomes an `ng-template` that is removed from the final DOM:

```html
<ng-template [ngIf]="movie"><div>{{movie.title}}</div></ng-template>
```

- You can use `ng-container` if you wish to apply structural directives without an additional HTML element being added to the DOM:

```html
<ng-container *ngIf="movie"><div>{{movie.title}}</div></ng-container>
```

</div>

---

# Step 4: Exercise 💻

<div class="dense">

- Update the template of your component to render a list of popular movies based on the response from **TMDB** which you have prepared in previous steps
- You will need to create a public property on the component with the movies Observable for the template to access
- Include both the **title** and **overview** fields in the rendered output
- You will need to use `*ngIf` to ensure the movies stream is ready, along with the `async` pipe to prepare the movies list for use in the template
- `*ngFor` will be required to loop through each of the movies in the list
- Finally, you will need to use interpolation syntax (`{{item.value}}`) to render the values from each of the movies
- 💡 Consider using [Material Card](https://material.angular.io/components/card/overview) to improve the visual appearance of the list (which is installed and ready to use)
- 💡 To add a little space in the list try adding the `stack` class to the list container

</div>

---

# Step 4: Trying it out

You can view the results of your work by visiting the page in your browser.

It should look similar to the following:

<img src="/images/simple-list-of-movies.png" alt="Screenshot of simple movie list" />
