# Step 1: Create an Angular component 💻

<div class="dense">

- An Angular [component](https://angular.io/guide/component-overview) is the main building block for Angular applications
- It consists of a **CSS selector** (defines how the component is used in a template), **TypeScript class** (the component behaviour), **HTML template** (what is rendered on the page), and optional **CSS styles**
- Angular >= 14 supports [standalone components](https://angular.io/guide/standalone-components), that specify their dependencies directly, rather than receiving them through an NgModule
- You can create components manually, or generate them via [Nx generators](https://nx.dev/packages/angular/generators/component)
- `npx nx g @nrwl/angular:component my-component --standalone` will generate a standalone component TypeScript, HTML, CSS, and test spec files
- You will work in the `start-here` folder
- Create an Angular component that renders **Hello World!** and add the component to the existing `app-start-here` component's template

</div>
