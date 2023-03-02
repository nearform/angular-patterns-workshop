# Step 6: Structural directives

<div class="dense">

- Angular provides a set of built-in [structural directives](https://angular.io/guide/structural-directives) (such as `NgIf`, `NgForOf`, `NgSwitch` and others) which are commonly used in all Angular projects
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

# Step 6: Loading states

<div class="dense">

- One option for managing the loading states of asynchronous HTTP requests is to keep track of a loading state within your services
- Using the RxJS [`startWith`](https://rxjs.dev/api/operators/startWith) operator, you can initialise a stream with a provided value
- This will synchronously emit the value (e.g. `isLoading: true`) to subscribers, and then subscribe to the piped stream
- Using the `map` operator on the HTTP stream, once the HTTP response is received, the `isLoading` state can be reset to `false`, and the data can be transformed as part of the new stream

</div>

---

# Step 6: Exercise 💻

<div class="dense">

- Create a loading indicator for the popular movies request
- You can update the movies service to manage a loading state and data collection using the `map` operator
- You can initialise the stream to set loading to `true` with the `startWith` operator
- 💡 You will need to update the movie list template to use the new loading and data properties from the service, and structural directives to conditionally show the loading indicator or data

</div>

---

# Step 6: Trying it out

<div class="dense">

- You can test the loading indicator by simulating a slow network
- You can use the browser developer tools, or the RxJS `delay` operator within the service to simulate a delay

</div>
