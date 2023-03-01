# Step 3: Unsubscribe to a service on component destroy
<div class="dense">

- Implement the `OnDestroy` life cycle method in the movie list component
- Create a new **RxJS** subject to track the lifecycle of the component by calling its `next` method in the `ngOnDestroy` method
- Pipe your query to the movies service into an **RxJS** `takeUntil` operator to cancel the subscription on when the component is destroyed

</div>
