# geller

`geller` is a pre-build step cli tool to help you identify undefined environment variables as well as mistyped environment variable names.

The name `geller` is a reference to Uri Geller, a famous psychic.

![A photo of Uri Geller holding keys](../../readme/uri-geller.jpeg)

## Install

```bash
npm install -D geller
// OR
yarn add -D geller
// OR
pnpm add -D geller
```

## Usage

You can run `geller` manually:

```bash
geller scan -g ./foo.ts
```

It is usually ideal to make it part of a `prebuild` step:

```javascript
{
  "prebuild": "geller scan -g ./src/**/*.ts"
}
```

## Commands

### `scan`

Scan is the currently the only command for the tool besides help. It will scan a glob or series of globs for environment variables and check to see if they are defined in the current environment.

#### Args

- **-g** **--glob** : `string` : When passing a glob with `*`, you will need to wrap the glob in quotes to prevent the OS from autocompleting the glob. To pass multiple globs, use multiple flags. eg: `geller -g "./foo/**.ts" -g "./bar/**.ts"`

- **-e** **--env** : `string` : The `.env` file you would like to parse. Defaults to `./.env` if the file is present. To pass multiple envs, use multiple flags. eg: `geller -g "./foo/**.ts" e .env -e .env.local`

## Roadmap

- Github Action
- Other languages?

## License

Copyright 2023 Chris Griffing

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
