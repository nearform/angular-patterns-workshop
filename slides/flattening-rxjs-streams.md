# Step 8: Flattening RxJS streams
<div class="dense">

- A common situation when working with RxJS is triggering streams based on another stream, an example of this being a stream of clicks from a button which calls an api returning an observable stream
- The naive and intuitive approach would lead to heavy nesting and difficult to understand code
- To prevent this and make this ergonomic, **RxJS** lets you apply a number of strategies to flattening streams and is at the core of how asynchronous behaviour is defined
- **RxJS** supplies a number of flattening operators including `mergeMap`, `concatMap`, `exhaustMap` and `switchMap` which take the current value of the primary stream and return an **inner** stream
- For instance the behaviour of `concatMap` is to queue up all emissions from the primary stream one by one to execute the function supplied to it
- In day to day usage a particularly useful flattening operator is `switchMap` which, on receiving a new value from the primary stream, immediately cancels the current inner stream and creates a new inner stream based on this latest value
- In the case of an api call, it ensures that only one call is being made to the backend, this is based on the latest value and that requests based on the old value are cancelled properly

</div>

---

# Step 8: Exercise
<div class="dense">

- Add a new `Subject` property to the movie list component that takes a `number` as it's generic parameter
- Trigger this stream when the "Add to watch list" event occurs in the movie summary card, passing in the movie id to the `next` method
- On component initialization subscribe to this stream and use a suitable **RxJs** operator to call the watchlist endpoint to add the movie to the users watchlist
- In flight requests should be cancelled when a new "Add to watchlist" click is received
- Similar to the previous **unsubscribe** challenge ensure the request is cancelled on navigating away from the page

</div>

---

# Step 8: Trying it out
<div class="dense">
 
- Use your browser devtools to slow down network request by setting **throttling** to "Slow 3G" or similar 
- Click repeatedly on the "Add to watchlist" button on a few different movies
- Notice that only the last request is sent to the server, all other queued requests are cancelled
- While not perhaps being as useful here, this can iron out a good deal of UX issues for something like an autocomplete search box

</div>

---

<div>

  In flight network requests are cancelled when a new value is emitted on the primary stream: 

  <img src="/images/cancelled-requests.png" alt="Cancelled requests due to RxJS switchMap" />

</div>
