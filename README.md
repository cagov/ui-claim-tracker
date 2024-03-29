# Claim Status Tracker

This repo contains the Claim Status Tracker app, which helps Californians better understand what’s happening with their unemployment claim and benefits.

## Run the application

**Prerequisites:**

- Node 14 LTS
- yarn

**Run this app**

1. Clone this repo
2. Run `yarn install`
3. Define environment variables (see below)
4. Run `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

### Environment variables

- ID_HEADER_NAME: The name of the header that contains the EDD-defined unique ID / "Unique Number" in the incoming request
- API_URL: The url for the API
- API_USER_KEY: The user key for the API
- CERTIFICATE_DIR: The path to the client certificate (certificate must be in PFX/P12 format)
- PFX_FILE: The name of the client certificate file
- (Optional) PFX_PASSPHRASE: The import passphrase for the client certificate if there is one
- (Optional) Environment-specific path prefixes for UIO and BPO links
  - URL_PREFIX_BPO
  - URL_PREFIX_UIO_CLAIMSTATUS
  - URL_PREFIX_UIO_DESKTOP
  - URL_PREFIX_UIO_MOBILE
- ASSET_PREFIX: The static asset path (default is `/claimstatus`; this env var is required for local development)

For local development:

1. Create a `.env.local` file in the root of this repo
2. Define each of the environment variables above
   - Obtain a preconfigured `.env.local` from an existing developer
   - Set `ASSET_PREFIX` to `""`
3. Configure a test header
   - Configure ModHeader ([firefox](https://addons.mozilla.org/en-US/firefox/addon/modheader-firefox/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)/[chrome](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)) to send the ID_HEADER_NAME defined header value to the local dev environment - see Vault for value. Also, we recommend limiting ModHeader to only modify `localhost:3000`
   - Please add developer_test=YOUR_NAME as an additional header to make it easier to distinguish ModHeader queries

## Run the test suite

```bash
yarn test
```

or interactively:

```bash
yarn test:watch
```

### Update the snapshots

```bash
yarn test:update-snapshots # or yarn test -u
```

## Lint the code

You can manually run the linters:

```bash
yarn lint
```

Changed files are auto-linted on commit.

[Set up your editor to automatically lint on save](https://prettier.io/docs/en/editors.html)

## Run Storybook

To develop or preview our front end components start up the Storybook server:

```bash
yarn storybook
```
