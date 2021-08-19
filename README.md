# ui-claim-tracker

This repo contains the claim status app for Californians to better understand their overall claim status and how it
relates to weekly certification

## Running the Application

**Prerequisites:**

- Node 14 LTS
- yarn

**Run this app**

1. Clone this repo
2. Run `yarn install`
3. Define environment variables (see below)
4. Run `yarn dev`
5. Open [http://localhost:3000/claimstatus](http://localhost:3000/claimstatus) with your browser to see the result

### Environment Variables

- ID_HEADER_NAME: The name of the header that contains the EDD-defined unique ID / "Unique Number" in the incoming request
- API_URL: The url for the API
- API_USER_KEY: The user key for the API
- CERTIFICATE_DIR: The path to the client certificate (certificate must be in PFX/P12 format)
- PFX_FILE: The name of the client certificate file
- (Optional) PFX_PASSPHRASE: The import passphrase for the client certificate if there is one
- (Optional) URL_UIO_LANDING, URL_UIOMOBILE_LANDING: The environment-specific links to the UIO and UIO Mobile landing pages

For local development:

1. Create a `.env.local` file in the root of this repo
2. Define each of the environment variables above
   - Nava Engineers - see Vault for preconfigured `.env.local`
3. Configure a test header
   - Configure ModHeader ([firefox](https://addons.mozilla.org/en-US/firefox/addon/modheader-firefox/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)/[chrome](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)) to send the ID_HEADER_NAME defined header value to the local dev environment - see Vault for value. Also, we recommend limiting ModHeader to only modify `localhost:3000`

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
