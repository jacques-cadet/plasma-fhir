# family-history-editor

## Description
- Family History editing tool using PlasmaFHIR
- Only works with SMART-on-FHIR for now because Epic does not allow patients to write/edit their own FamilyMemberHistory

## Run
- `yarn start`
- Windows (HTTPS): `($env:HTTPS = "true") -and (npm start)`
- Mac (HTTPS): `HTTPS=true npm start`

## Project Setup Instructions
1. Create a new TypeScript React App
    - https://create-react-app.dev/docs/adding-typescript/
    - `yarn create react-app my-app --template typescript`
2. Install SASS
    - https://create-react-app.dev/docs/adding-a-sass-stylesheet/
    - `yarn add sass`
    - Rename `App.css` to `App.scss`
    - Update `App.tsx` to use `App.scss`
3. Copy `plasma-fhir` modules
    - Create a `src/plasma-fhir` directory
    - Copy `FHIRResourceHelpers.ts` and `FHIRClientHelper.ts` into `/src/plasma-fhir/api`
    - Copy `FHIRClient` files into `src/plasma-fhir/FHIRClient`
4. Install FHIR types
    - `yarn add @types/fhir`
5. Install `fhirclient`
    - `yarn add fhirclient`
6. Install `react-router-dom`
    - `yarn add react-router-dom`
7. Create `config.ts` with the API key configurations
8. Install some libraries
  - Tailwind CSS
    - https://tailwindcss.com/docs/guides/create-react-app
    - `npm install -D tailwindcss postcss autoprefixer`
    - `npx tailwindcss init -p`
    - Update `tailwind.config.js`
    - Update `index.css`
  - react-table
    - https://github.com/TanStack/react-table
    - `yarn add react-table`
    - `yarn add @types/react-table`
  - VechaiUI
    - https://www.vechaiui.com/
    - `yarn add @vechaiui/core @vechaiui/react @tailwindcss/forms`

