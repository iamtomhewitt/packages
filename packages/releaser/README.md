# @iamtomhewitt/releaser

Creates and writes a new version of your project using your commits based on `@commitlint/config-conventional`, updates your `CHANGELOG.md`, creates a tag, and pushes it all to your remote.

- `feat` commits, or more than 25 changed files since the last tag, bumps major
- `chore` commits bumps minor
- everything else commits bumps patch

Usage:

- `--dryRun` runs the releaser, but will not modify or commit any files.
- `--forceVersion` forces a version, instead of one being calculated.
- `--help` is self explanatory.

## Installation

```sh
npm i -D @iamtomhewitt/releaser
```

Then, in `package.json`:

```json
{
  "scripts": {
    "release": "iamtomhewitt-releaser",
  }
}
```
