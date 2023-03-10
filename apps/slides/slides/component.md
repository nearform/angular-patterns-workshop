---
layout: center
---

# Angular

---

# Step 1: Angular components

<div class="dense">

- An Angular [component](https://angular.io/guide/component-overview) is the main building block for Angular applications
- It consists of:
  - **CSS selector** - defines how the component is used in a template
  - **TypeScript class** - the component behaviour
  - **HTML template** - what is rendered on the page
  - Optional **CSS styles**
- Angular >= 14 supports [standalone components](https://angular.io/guide/standalone-components), that specify their dependencies directly, rather than receiving them through an NgModule
- You can create components manually, or generate them via [Nx generators](https://nx.dev/packages/angular/generators/component)

</div>

---

# Step 1: Lifecycle hooks

<div class="dense">

- Angular components have a lifecycle that includes initialisation, change detection, and destruction
- Your component can use [lifecycle hooks](https://angular.io/guide/lifecycle-hooks) to respond to these lifecycle events and run custom logic. Common component methods include `ngOnInit`, `ngOnChanges`, and `ngOnDestroy`
- It is recommended that the corresponding interfaces (e.g. `OnInit`, `OnDestroy` etc) are used to ensure the correct lifecycle method names are enforced:

```typescript
class MyComponent implements OnInit, OnDestroy {
  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.logger.log('OnInit');
  }

  ngOnDestroy() {
    this.logger.log('OnDestroy');
  }
}
```

</div>

---

# Step 1: Exercise 💻

<div class="dense">

- Create an Angular `MovieListComponent` that initially renders **Hello World!!!**
- You can use `npx nx g @nrwl/angular:component movie-list --standalone`
- This generates a standalone component, including TypeScript, HTML, CSS, and test spec files
- You will work in the `start-here` folder
- Add the new component to the existing `start-here.component.ts` component's template to view it within the application
- 💡 The movie list component will be adapted in later steps to render a list of popular movies
- 💡 The **Nx** component generator is preconfigured for this workshop and can be viewed under the `generators` property in `nx.json`

</div>

---

# Step 1: Trying it out

<div class="dense">

You can view the results of your work by visiting the page in your browser

It should look similar to the following:

<img src="/images/hello-world.png" alt="Screenshot of hello world component" />

</div>
