# WhereInTheWorld

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3. The project is to practice Angular development and is based on Frontend Mentor's challenge [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). However, when you run the code you will see that I have extended the project with extra functionality.

There are several ways to manage data in Angular projects. This project uses an [observable data services](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/) architecture to manage the data. You can see my more mature [implementation using NgRx](https://github.com/covuworie/where-in-the-world-ngrx). I highly recommend using that approach instead.

Furthemore there is no database in this project and the data is actually stored in a simple `db.json` file at the root of the project using [json-server](https://www.npmjs.com/package/json-server). JSON Server creates a full fake REST API so that you can communicate with the backend via standard HTTP requests.

## Prerequisites

1. Install [nodejs](https://nodejs.org/).
2. Install the [Angular CLI](https://angular.io/guide/setup-local).
3. Install [Visual Studio Code](https://code.visualstudio.com/download) (optional).

## Development server

Run `npm run dev`. This will concurrently run the dev data server and the dev server. Navigate to `http://localhost:3000` if you want to see the endpoints available and the data for the data server.
Navigate to `http://localhost:4200/` to see the running app. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). No unit tests were written for this project.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities. No end-to-end tests were written for this project.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
