# @iamtomhewitt/linter

Custom linter supporting typescript / javascript, including `.scss` and `.md` files.

## Installation

```sh
npm i -D @iamtomhewitt/linter
```

Then, in `package.json`:

```json
{
  "scripts": {
    "lint": "iamtomhewitt-linter --sourceFolder=./ --type=typescript",
    "lint-fix": "iamtomhewitt-linter --sourceFolder=./ --type=typescript --fix",
  }
}
```

```sh
# display help/options
iamtomhewitt-linter --help
```