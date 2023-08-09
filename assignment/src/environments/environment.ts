// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userApiUrl: 'http://localhost:8080/api/users',
  uApiUrl: 'http://localhost:8080/api/user/',
  projectApiUrl: 'http://localhost:8080/api/project/',
  taskApiUrl: 'http://localhost:8080/api/task/',
  loginApiUrl: 'http://localhost:8080/api/signin',
  registerApiUrl: 'http://localhost:8080/api/signup',
  logoutApiUrl: 'http://localhost:8080/api/signout',
  userLocal: 'http://localhost:8080/api/current-user'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
