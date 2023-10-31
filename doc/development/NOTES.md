# Notes

## Version Bumps

As per Semantic Versioning, only changes to the `src` folder require a version
bump. Fixes will bump the patch version, features, will bump the minor version
and braking changes with the previous API will bump the major version.

Bumping the version of the library should only happen via NPM by executing one
of the following commands at the root of the project:

```bash
npm version patch --no-git-tag-version
```

```bash
npm version minor --no-git-tag-version
```

```bash
npm version major --no-git-tag-version
```

Doing this will trigger a re-build of the application using the `postversion`
script in the `package.json`.

Changes to other folders or files that do not affect the library's functionality
should not bump the version of it.
