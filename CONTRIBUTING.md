# Contributing guide

## Local development

- Use Node.js, see `.nvmrc` for the version
- Use `npm`

### Initial setup

First, install dependencies.

```sh
$ npm i
```

Then create initial builds.

```sh
$ npm run build
```

### Development commands

| Command                 | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `npm test`              | Run unit tests.                                   |
| `npm run build`         | Build files.                                      |
| `npm run build --watch` | Build files in watch mode.                        |
| `npm run storybook`     | Start Storybook dev server. Requires built files. |
| `npm run fmt`           | Format source codes.                              |
| `npm run typecheck`     | Run `tsc` with `--noEmit` option.                 |

### Git hooks

Optional but recommended, run this command or copy the files under `.githooks` into `.git/hooks`.

```sh
$ git config core.hooksPath .githooks
```

This setups these git hooks:

- (pre-commit) Run `lint-staged` to format changed file with `dprint`
- (pre-commit) Run `tsc --noEmit`
- (commit-msg) Validate the commit message against conventional commit rules

See the contents of each files to see what will be executed.

## Release guide

1. Run `git switch master`
1. Make sure the working directory is clean (`git status` displays no files)
1. Run `git pull --prune`
1. Update `CHANGELOG.md`
1. Stage `CHANGELOG.md` (`git add CHANGELOG.md`)
1. Run `npm version -f <new version>`
1. Push `master` branch
1. Push the generated tag
1. (CI publish the package automatically)

If the last step failed, run `npm publish` manually.
