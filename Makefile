SHELL := /bin/bash

.PHONY: start
start:
	make bundle
	deno run --allow-env --allow-read --allow-sys --allow-ffi --allow-run npm:chokidar-cli@3.0.0 "public/**/*" -c "make bundle"

.PHONY: format
format:
	deno fmt

.PHONY: test
test:
	deno fmt --check
	deno lint
	deno check .
	make test-manifest

.PHONY: build-tailwind
build-tailwind:
	deno run --allow-env --allow-read --allow-sys --allow-ffi --vendor --unstable-detect-cjs --allow-write=public/css,/var/folders npm:tailwindcss@3.4.17 -i ./public/css/tailwind-input.css -o ./public/css/tailwind.css

.PHONY: bundle
bundle:
	@rm -fr ./dist
	make build-tailwind
	deno run --allow-env --allow-read --allow-sys --allow-run --allow-write=dist bundle.ts
	cp -r ./public/images ./dist/images
	cp ./public/*.json ./public/*.html ./dist
	cat ./public/css/style.css ./public/css/tailwind.css > ./dist/bundle.css

.PHONY: build
build:
	make bundle
	cd dist && deno run --allow-env --allow-read --allow-write --allow-net --allow-sys --allow-ffi --allow-run --allow-scripts npm:web-ext@8.5.0 build

.PHONY: test-manifest
test-manifest:
	make bundle
	cd dist && deno run --allow-env --allow-read --allow-write --allow-net --allow-sys --allow-ffi --allow-run --allow-scripts npm:web-ext@8.5.0 lint

.PHONY: load-in-firefox
load-in-firefox:
	make test-manifest
	@# NOTE: What's below doesn't work because Deno 2.2.11 still doesn't support the internals of web-ext for running the extension, only linting
	@#cd dist && deno run --allow-env --allow-read --allow-write --allow-net --allow-sys --allow-ffi --allow-run --allow-scripts npm:web-ext@8.5.0 run
	cd dist && npx web-ext@8.5.0 run
