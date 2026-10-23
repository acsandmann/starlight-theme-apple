# `starlight-theme-apple`

An Apple Developer Documentation-inspired theme for [Astro Starlight](https://starlight.astro.build).

It was built for [Rift](https://github.com/acsandmann/rift)’s [documentation site](https://acsandmann.github.io/rift-docs/), which uses it with no custom CSS.

- [`packages/starlight-theme-apple`](./packages/starlight-theme-apple): the Starlight plugin.
- [`docs`](./docs): the documentation and component showcase.

## Develop

```sh
bun install
bun run dev    # documentation site
bun run test   # theme tests
bun run build  # documentation build
```

To test the actual distributable in the sibling Rift docs checkout without changing its dependency manifest:

```sh
cd packages/starlight-theme-apple
bun pm pack --destination /tmp
cd ../../../rift-docs
theme_stage=$(mktemp -d)
tar -xzf /tmp/starlight-theme-apple-0.8.0.tgz -C "$theme_stage"
mv node_modules/starlight-theme-apple "$theme_stage/previous"
mv "$theme_stage/package" node_modules/starlight-theme-apple
bun run check:docs
bun run build:site
```

These commands assume the consumer’s dependencies are already installed (for a fresh checkout, install them from the pre-migration revision first). Restart the consumer's dev server after installing a new tarball. This checks the package exports and included files as well as the source.

## License

MIT © acsandmann. See [LICENSE](./LICENSE).
