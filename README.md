# Safelyx Browser Extension

[![](https://github.com/safelyx/browser-extension/workflows/Run%20Tests/badge.svg)](https://github.com/safelyx/browser-extension/actions?workflow=Run+Tests)

This is a Safelyx's browser extension built using [Deno](https://deno.land).

## Supported Browsers

- Firefox ([AMO](https://addons.mozilla.org/en-GB/firefox/addon/safelyx/))
- Chrome/Brave/Vivaldi (link coming soon)
- Safari (coming soon)

## Requirements

This was tested with `deno`'s version stated in the `.dvmrc` file, though it's possible other versions might work.

There are no other dependencies. **Deno**!

## Development

```sh
$ make start
$ make load-in-firefox
$ make format
$ make test
$ make bundle
$ make build
```

## Structure

- Static files are defined at `public/`.
- Bundling happens via `bundle.ts`.

## Deployment / Publishing

- Push to the `main` branch with the new versions, then manually upload the result of `make build` to [AMO](https://addons.mozilla.org/en-GB/developers/addon/submit/distribution).
