# ui-claim-tracker

This repo contains the claim status app for Californians to better understand their overall claim status and how it
relates to weekly certification

## Running the Application

**Prerequisites:**
  - Node 12+
  - yarn

**Run this app**

Clone this repo, and then run:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000/claimstatus](http://localhost:3000/claimstatus) with your browser to see the result.

## Running the test suite

```bash
yarn test
```

or interactively:

```bash
yarn test:watch
```

### Updating the snapshots

```bash
yarn test:update-snapshots # or yarn test -u
```

## Linting the code

You can manually run the linters:

```bash
yarn lint
```

Changed files are auto-linted on commit.

[Set up your editor to automatically lint on save](https://prettier.io/docs/en/editors.html)

## Running Storybook

To develop or preview our front end components start up the Storybook server:

```bash
yarn storybook
```

The storybook live on `main` can be viewed [on chromatic](https://www.chromatic.com/library?appId=60705d04dcad7600211e34d2).
