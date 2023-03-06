# Step 3: Unsubscribe to a service on component destroy

<div class="dense">

- Angular provides the `OnDestroy` hook to allow executing code when a component is destroyed
- This is an ideal place to clean up component specific resources that have been created during its lifetime
- The **RxJs** `takeUntil` operator allows you to supply a second Observable stream which will close the first stream when it emits a value
- An **RxJS** `Subject` allows you to create a simple read/write stream and can be supplied to `takeUntil` as its argument
- To emit a value from a Subject you call its `next` method with either a value or without any argument if the Subject is typed as `Subject<void>()`

</div>

---

# Step 3: Exercise 💻

<div class="dense">

- Implement the `OnDestroy` life cycle method in the movie list component
- Create a new **RxJS** Subject to track the lifecycle of the component by calling its `next` method in `ngOnDestroy`
- Pipe the movies service query into an **RxJS** `takeUntil` operator to cancel the subscription when the component is destroyed

</div>

---

# Step 3: Trying it out

<div class="dense">

- Introduce a fake delay by adding an **RxJS** `delay` operator into the movie query pipe or use your browser developer tools to simulate a slow network environment
- Add the `next` and `complete` callbacks in the call to `subscribe` with some simple logging (e.g. `console.log('complete called')`)
- Navigate away from the page _before_ the request has completed and notice that the `next` callback is never called and the `complete` callback is immediately called

</div>
