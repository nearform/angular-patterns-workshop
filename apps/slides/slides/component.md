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

<div class="dense">

# Step 1: Exercise 💻

- Create an Angular component that renders **Hello World!**
- You can use `npx nx g @nrwl/angular:component my-component --standalone`
- This generates a standalone component, including TypeScript, HTML, CSS, and test spec files
- You will work in the `start-here` folder
- Add the new component to the existing `app-start-here` component's template to view it within the application

</div>
