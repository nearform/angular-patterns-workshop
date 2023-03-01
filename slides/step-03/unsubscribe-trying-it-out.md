# Step 3: Unsubscribe to a service on component destroy
<div class="dense">

- Introduce a fake delay by adding an **RxJS** `delay` operator into the movie query pipe or use your browser devtools to simulate a slow network environment
- Add the `next` and `complete` callbacks in the call to `subscribe` with some simple logging (e.g. `console.log('complete called')`)
- Navigate away from the page *before* the request has completed and notice that the `next` callback is never called and the `complete` callback is immediately called

</div>
