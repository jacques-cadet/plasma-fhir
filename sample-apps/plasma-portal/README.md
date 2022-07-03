# Plasma Portal

Patient Portal built with Plasma FHIR.

## Description

* Standalone patient portal utilizing FHIR and the PlasmaFHIR framework.
* Select your health system, login using your MyChart credentials, and view your health data!
  * Note: Currently only Epic-based health systems are available

## To Run Locally

* Update `config/config.ts` to set `mode = "LOCAL"`
* It will probably launch at `/portal` because the `package.json` has that set as the homepage. In this case, just remove the `/portal`
* Run in https
  * Windows: `($env:HTTPS = "true") -and (npm start)`
  * Mac: `HTTPS=true npm start`

## Instructions for Deploying to https://plasmafhir.com/portal

* Update `config/config.ts` to set `mode = "PRODUCTION"`
* Instructions found here: [https://github.com/rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)
  * Add the `404.html` page in the root directory and set `pathSegmentsToKeep = 1` since we will be using `/portal`
  * Add the script from the instructions into `index.html`
  * Set `<BrowserRouter basename="/portal">` (this is already handled by `config.ts`)
  * Set the `redirectUri` to `https://plasmafhir.com/portal/app`
* Build the site with `yarn build`
* Copy files into the `/portal` directory, but DO NOT copy `404.html`. Keep `404.html` at the root level
