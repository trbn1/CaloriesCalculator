# Calories Calculator

## Dependencies

```bash
node.js
```

## Prerequisites

```bash
npm install -g @angular/cli firebase-tools
```

## Installation

```bash
npm install
```

## Configuration

Create `src/environments/environment.ts` and/or `src/environments/environment.ts` and add your Firebase configuration.

```ts
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: '<your-key>',
        authDomain: '<your-project-authdomain>',
        databaseURL: '<your-database-URL>',
        projectId: '<your-project-id>',
        storageBucket: '<your-storage-bucket>',
        messagingSenderId: '<your-messaging-sender-id>',
    },
  };
```

## Usage

For development:

```bash
ng serve
go to http://localhost:4200

```

or configure firebase with

```bash
firebase login
firebase init
```

and deploy production:

```bash
npm run-script build
firebase deploy
```
