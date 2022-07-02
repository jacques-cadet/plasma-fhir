# What is Plasma FHIR?



### Summary

#### Packages

* `create-plasma-app` Command Line Interface (CLI) for creating a PlasmaFHIR app. You can choose from various templates to get started with.
* `plasma-fhir-app-utils` Utility functions and APIs to help with building apps
* `plasma-fhir-react-client-context` A React component that provides access to the `fhirclient` in a React app
* `plasma-fhir-react-components` A library of React components for displaying and interacting with FHIR resources. Styles can be customized as needed.

#### Sample Apps

* `playground` Package for testing things out (not actually a real app)
* `plasma-portal` Patient Portal application
* `plasma-portal-lite` This is used as the template for `create-plasma-app`
* 🔜 `family-history-editor`
* 🔜 `plasma-pedigree`
* 🔜 `family-history-social-network`
* 🔜 `risk-calculator`

#### Tools

* Tools used to help with development (scraping data, generating code, etc.)

### Getting Started - Create a New App

***

* `npx create-plasma-app my-app`
  * This will setup a basic template for you to start working with

### Getting Started - Testing Your App

#### Patient Standalone App

***

**Local Testing (SMART-on-FHIR Sandbox)**

**Epic Sandbox**

**Epic Live Health System**

**Cerner Sandbox**

#### Provider EHR App

***

**Local Testing (SMART-on-FHIR Sandbox)**

* `yarn start`
* Navigate to [https://launch.smarthealthit.org/?auth\_error=\&fhir\_version\_2=r4\&iss=\&launch\_ehr=1\&launch\_url=https%3A%2F%2Flocalhost%3A3000%2Flaunch\&patient=\&prov\_skip\_auth=1\&provider=\&pt\_skip\_auth=0\&public\_key=\&sde=\&sim\_ehr=1\&token\_lifetime=15\&user\_pt=](https://launch.smarthealthit.org/?auth\_error=\&fhir\_version\_2=r4\&iss=\&launch\_ehr=1\&launch\_url=https%3A%2F%2Flocalhost%3A3000%2Flaunch\&patient=\&prov\_skip\_auth=1\&provider=\&pt\_skip\_auth=0\&public\_key=\&sde=\&sim\_ehr=1\&token\_lifetime=15\&user\_pt=)
* Choose `Provider EHR Launch` (Simulate launch within the EHR)
* Set App Launch URL = `https://localhost:3000/launch`

**Epic Sandbox**

**Epic Live Health System**

**Cerner Sandbox**

### Development (on PlasmaFHIR)

***

#### Build All Packages

* `cd` into each package and run `yarn` or `npm install`
* For `plasma-fhir-react-components`
  * `npm install`
  * `yarn rollup`

### Integrating with EHR Vendors - Epic

***

#### Setup for Epic Sandbox

1. Go to [https://fhir.epic.com/](https://fhir.epic.com/) and login
2. Click "Build Apps" and create a new app
3. Specify "Application Audience" is for "Patients"
4. Add resources that you need
5. Redirect URI = [https://localhost:3000/app](https://localhost:3000/app)
6. Select FHIR version
7. Complete other required fields
8. CLick "Save & Ready for Sandbox"
9. Copy your "Non-Production Client ID"

#### Setup for Live Epic Health System

1. Repeat the same process as above, but select "Ready for Production" and copy your Production Client ID
2. Go to [https://open.epic.com/MyApps/Endpoints](https://open.epic.com/MyApps/Endpoints) and find the endpoint for the system you want to connect to

#### Other Notes

**OAuth2 Error**

If you are getting an OAuth2 error with your Epic API key, it usually means your API has not yet been setup with Epic. In my observation, it takes about 1 business day (not Saturday/Sunday) before the API key will begin working.

### Integrating with EHR Vendors - Cerner

***

TODO:

### Tips / Tricks / Common Issues:

***

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

### Technical Notes

***

#### Libraries/Packages Being Used

* Plasma Portal
  * Install SASS
  * TailwindCSS
  * React Table
  * fhirclient

### References

***

#### SMART-on-FHIR

* App Launcher: [https://launch.smarthealthit.org/](https://launch.smarthealthit.org/)
* `fhirclient`: [https://github.com/smart-on-fhir/client-js](https://github.com/smart-on-fhir/client-js)
  * Docs: [http://docs.smarthealthit.org/client-js/typedoc/index.html](http://docs.smarthealthit.org/client-js/typedoc/index.html)

#### Epic

* Test providers: [https://fhir.epic.com/Documentation?docId=testpatients](https://fhir.epic.com/Documentation?docId=testpatients)
  * FHIR, USER
    * Login: `FHIR` / `EpicFhir11!`
* Test patients: [https://fhir.epic.com/Documentation?docId=testpatients](https://fhir.epic.com/Documentation?docId=testpatients)
  * Explore their data here: [https://fhir.epic.com/mychart-fhir/Authentication/Login](https://fhir.epic.com/mychart-fhir/Authentication/Login)
  * Camila Lopez
    * ID: `erXuFYUfucBZaryVksYEcMg3`
    * MyChart Login: `fhircamila` / `epicepic1`
  * Derrick Lin
    * ID: `eq081-VQEgP8drUUqCWzHfw3`
    * MyChart Login: `fhirderrick` / `epicepic1`
* API's that will be auto-downloaded (meaning you can immediately use it on an Epic Client):
  * [https://fhir.epic.com/Documentation?docId=patientfacingfhirapps](https://fhir.epic.com/Documentation?docId=patientfacingfhirapps)



{% hint style="info" %}
**Good to know:** providing a brief overview of your product and its core use cases is a great place to start with product docs. Your product might seem obvious to you – you made it! However, to others, even folks who are trying your product after reading your site or getting a sales demo, it can still be unclear. This is your chance to clarify your product and set the right expectations!
{% endhint %}

Here are a couple of examples of succinct overviews from products with really great docs:

> Loom is a video messaging tool that helps you get your message across through instantly shareable videos.
>
> With Loom, you can record your camera, microphone, and desktop simultaneously. Your video is then instantly available to share through Loom's patented technology.
>
> — From the [Loom Docs](https://support.loom.com/hc/en-us/articles/360002158057-What-is-Loom-)

> The Mailchimp Marketing API provides programmatic access to Mailchimp data and functionality, allowing developers to build custom features to do things like sync email activity and campaign analytics with their database, manage audiences and campaigns, and more.
>
> — From the [Mailchimp Marketing API docs](https://mailchimp.com/developer/marketing/docs/fundamentals/)

## Getting Started

**Got 2 minutes?** Check out a video overview of our product:

{% embed url="https://www.loom.com/share/3bfa83acc9fd41b7b98b803ba9197d90" %}

{% hint style="info" %}
**Good to know:** A succinct video overview is a great way to introduce folks to your product. Embed a Loom, Vimeo or YouTube video and you're good to go! We love this video from the fine folks at [Loom](https://loom.com) as a perfect example of a succinct feature overview.
{% endhint %}

### Guides: Jump right in

Follow our handy guides to get started on the basics as quickly as possible:

{% content-ref url="guides/creating-your-first-project.md" %}
[creating-your-first-project.md](guides/creating-your-first-project.md)
{% endcontent-ref %}

{% content-ref url="guides/creating-your-first-task.md" %}
[creating-your-first-task.md](guides/creating-your-first-task.md)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% hint style="info" %}
**Good to know:** your product docs aren't just a reference of all your features! use them to encourage folks to perform certain actions and discover the value in your product.
{% endhint %}

### Fundamentals: Dive a little deeper

Learn the fundamentals of MyProduct to get a deeper understanding of our main features:

{% content-ref url="packages/create-plasma-app/" %}
[create-plasma-app](packages/create-plasma-app/)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% content-ref url="broken-reference" %}
[Broken link](broken-reference)
{% endcontent-ref %}

{% hint style="info" %}
**Good to know:** Splitting your product into fundamental concepts, objects, or areas can be a great way to let readers deep dive into the concepts that matter most to them. Combine guides with this approach to 'fundamentals' and you're well on your way to great documentation!
{% endhint %}
