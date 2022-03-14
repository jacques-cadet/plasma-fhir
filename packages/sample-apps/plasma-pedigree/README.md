# plasma-pedigree

## Description
A tablet-based Pedigree app using the Plasma framework.
Written in React Native. Utilizing Firebase.

## Installation
- Expo: https://docs.expo.dev/

## Running:
- `yarn start`
- `yarn android`
- `yarn ios`
- `yarn web`

## TODO:
**User/Auth**
- [x] Create ForgotPassword screen
- [ ] Remove animations for the auth screens
- [ ] Check for navigation options and make sure you can't "swipe" to go forward/back on iPhone
- [x] Error after logging in: Can't perform a React state update on an unmounted component
- [ ] Clean up the auth pages. Put a logo or something. Make it look COOl. Add some instructions/information.
- [ ] Make some generic components and styles that the auth pages can import
- [ ] Add some social logins (let's start with just google)
- [ ] I don't think the "Alert" is working
- [ ] Profile as Tab #3.
- [ ] Profile Navigator with these options/pages (I already did this in all my apps, so just need to port it)
  - [ ] See my profile (my email address, name, etc.)
  - [ ] Change my password
  - [ ] Change my email
  - [ ] Logout button on profile page

**Pedigree**
- [ ] Prototype drawing with a finger
- [ ] Research/prototype how we'd draw the Pedigree shapes in React Native (svg?)

**Other**
- [ ] Come up with some ideas on the HealthIT workflows. This can be a "standalone Pedigree", but also want it integrated.
  - [ ] What if we launched it from the Plasma Portal and were able to retain the authentication? (Don't think that's possible).
  - [ ] What if we treat this as an "EHR-Launch" scenario?