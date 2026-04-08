# AbleAssist

AbleAssist is an Expo accessibility companion organized by user-facing subject.

## Run

```sh
npm install
npm run start
```

Validate the web bundle and architecture boundaries with:

```sh
npm run check
npm run check:architecture
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for the module ownership map.

The visual system uses warm neutral surfaces, solid teal primary actions, coral
accents, and muted semantic states. Shared values live in `shared/theme` so
feature screens do not need to define their own palette.
