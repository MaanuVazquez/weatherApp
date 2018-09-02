# BACKEND STARTER

## Introduction

The intention of this repository is to make an easy-to-start backend with only a few dependencies and the latest ECMAScript features. It uses `polka` for the web server and `morgan` to log.

### Linting

We use `eslint` with `AirBnB` configuration and some minimal changes like allowing the use of `console.info`, `console.error` and `console.warn` functions.

### Testing

Our choice is `mocha` with `chai` for testing and `istanbul` for coverage. The name convention is thingBeingTested.`spec.js`

Finishing with `nodemon` to watch changes.

## Folder structure

The ideal folder structure would be:

    ├── ...
    ├── tests Test files (remember thing.spec.js)
    ├── src                    # Main source files
    │   ├── controllers        # Endpoint controllers
    │   ├── routes             # Endpoint routes
    │   ├── utils              # Utility functions
    │   └── index.js           # Main server file
    └── ...

## NPM Scripts

    build               # Transpiles the code into the dist/ folder
    start               # Runs the dist/index.js file with node binary.
    dev                 # Runs the src/index.js file with babel-node binary.
    dev:watch           # Runs the src/index.js file with babel-node through nodemon that watches for any file change
    test                # Runs mocha in all the tests/* files that ends with .spec.js
    test:watch          # Same as test but watching for changes in the tests
    test:coverage       # Runs istanbul that calls mocha to check the test coverage of the files
