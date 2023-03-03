<div class="dense">

# Step 0: RxJS primer 
- An **observable** can be compared to a simple JavaScript function
- Like a function they are lazy and won't do anything until they are invoked
- Unlike functions however they allow outputting multiple values over time
- Similarly to a function call for functions, an observable stream is "activated" when it is **subscribed** to
- Up to that point it can be thought of as a blueprint for the behaviour and transformation of the observable

```typescript
// Does nothing
const myObservable$ = of(1, 2, 3, 4)
// Still does nothing, simply describes the transformation of the stream by multiplying each value by 10
const myObservable2$ = myObservable$.pipe(map(x => x * 10))

// Now the observable is actually ran
myObservable2$.subscribe(nextValue => console.log(nextValue))
```

</div>

---

<div class="dense">

# Step 0: Creating and transforming observables
- While you will most commonly work with observables that are returned from different services such as the **Angular** **HttpClient**, simple observables can be created using the `of` operator provided by **RxJS** 
- `const myObs$ = of(1, 2, 3, 4)` creates an observable that will emit each of the numbers in sequence when subscribed to
- Observables can be chained with a call to it's `pipe` method which accepts single or multiple operators to transform the stream
- For instance when the **RxJS** `map` function is supplied as an argument to `pipe`, it works similarly to the standard js array `map` method but transforms each value as it is received over time rather than immediately iterating over all elements
- More complex higher order operators such as `mergeMap`, `switchMap` and `concatMap` allow combining other streams and dynamically altering the stream topology (these will be touched on later in the workshop)

</div>

---

<div class="dense">

# Step 0: Exercise 💻

- In the `start-here.component.ts` file, create an observable using **RxJS** `of` with a series of integers (e.g. `const myObs$ = of(1000, 2000)`) 
- 💡 The various operators should be imported from the **RxJS** library as follows `import { map, delay } from 'rxjs'`
- Subscribe to the observable using it's `.subscribe` method, passing in a callback function which logs the stream values (e.g. `myObs$.subscribe(value => console.log(value))`)
- Chain a `.pipe` to this and experiment with some different **RxJS** operators to transform this value, e.g. `map`, `delay`
- Try passing in a higher order operator like `concatMap` to really alter the behaviour of the stream:
```typescript
// Will delay each by the value in the stream
myObs$.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
// (No need to fully understand this for now)
```

</div>

---

<div class="dense">

# Step 0: Trying it out

- Observe the behaviour of the stream in your browsers console as you enter the different lines of code
- Pay particular attention to the fact that the observable is completely inert until it is subscribed to
- 💡You can remove this code before continuing to the next step

<img src="/images/try-rxjs.png" alt="RxJS subscription output">

</div>
