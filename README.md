# What is Plasma FHIR?

Plasma FHIR is a framework to help with building interoperable health IT applications. It utilizes SMART-on-FHIR. Some features of this framework include:

* Templates to scaffold a new app
  * For web, we provide React templates
  * For mobile, we provide React Native templates
* Component libraries for displaying and working with FHIR resources
* Full TypeScript support
* Sample applications to use as a reference
* Videos and guides to help build your application

## Contact

You may contact us at plasmafhir@gmail.com

## References

#### SMART-on-FHIR

* App Launcher: [https://launch.smarthealthit.org/](https://launch.smarthealthit.org/)
* `fhirclient`: [https://github.com/smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js)
  * Docs: [http://docs.smarthealthit.org/client-js/typedoc/index.html](http://docs.smarthealthit.org/client-js/typedoc/index.html)

## Tips / Tricks / Common Issues:

#### Launch App With HTTPS

You should try to use HTTPS when testing. This is required in some cases (like Epic live health systems)

* Google Chrome Address bar: `chrome://flags/#allow-insecure-localhost`
  * Enable the setting
* Windows Powershell: `($env:HTTPS = "true") -and (npm start)`
* Mac: `HTTPS=true npm start`
* Other platforms: [https://create-react-app.dev/docs/using-https-in-development/](https://create-react-app.dev/docs/using-https-in-development/)

#### Invalid Hook Call

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
```

* Make sure React versions are the same.
* Try: `npm link ../../packages/plasma-fhir-react-client-context/node_modules/react` or `npm link ../../node_modules/react`
  * Might have to remove `plasma-fhir-client-context` from the `package.json` and then put it back
