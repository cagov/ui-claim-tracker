optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

//import Adapter from "enzyme-adapter-react-16";
//import Enzyme from "enzyme";

// Setup Enzyme for React component tests
//Enzyme.configure({ adapter: new Adapter() });

// Mock manifest files, which are generated as part of the build process
//jest.mock(
//  "./src/data/manifest-scripts.json",
//  () => ({
//    client: {
//      js: "/mocked-client.js",
//    },
//  }),
//  { virtual: true }
//);
//jest.mock(
//  "./src/data/manifest-styles.json",
//  () => ({
//    "App.css": "mocked-app.css",
//    "styles/globals.css": "mocked-css",
//  }),
//  { virtual: true }
//);
