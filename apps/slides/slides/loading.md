# Step 6: Loading states

<div class="dense">

- One option for managing the loading states of asynchronous HTTP requests is to keep track of a loading state within your services
- Using the **RxJS** [`startWith`](https://rxjs.dev/api/operators/startWith) operator, you can initialise a stream with a provided value
- This will synchronously emit the value (e.g. `isLoading: true`) to subscribers, and then subscribe to the piped stream
- By using the `map` operator on the HTTP stream, once the response is received, the `isLoading` state can be reset to `false`, and the data can be transformed as part of a new stream

</div>

---

# Step 6: Exercise 💻

<div class="dense">

- Create a loading indicator for the popular movies request
- You can update the movies service to manage a loading state and data collection using the `map` operator
- You can initialise the stream to set loading to `true` using the `startWith` operator
- 💡 You will need to update the movie list template to use the new loading and data properties from the service. Use structural directives to conditionally show the loading indicator or data

</div>

---

# Step 6: Trying it out

<div class="dense">

- You can test the loading indicator by simulating a slow network
- You can use the browser developer tools or the **RxJS** `delay` operator within the service to simulate a delay

</div>
