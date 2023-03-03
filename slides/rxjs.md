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

</div>
