# eslint-plugin-geller

An ESLint wrapper around Geller to identify undefined env vars

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-geller`:

```sh
npm install eslint-plugin-geller --save-dev
```

## Usage

Add `geller` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["geller"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "geller/geller": "error"
  }
}
```

## Configuration

The Rule will need to be configured with a path to any `.env` files that you want to validate. Monorepos will need to pass a `cwd` config to help `geller` find your `.env` files.

### Example

In your `eslintrc` file:

```javascript
{
  rules: {
    "geller/geller": [
      "error",
      {
        cwd: __dirname,
        envs: [".env"],
      },
    ],
  },
}
```

- `envs`: The env files that you would like to have validated and inspected. Leaving this value undefined or an empty array is acceptable.

- `cwd`: This option allows `geller` to support monorepos and other projects that may have their `.env` files at somewhere other than the root of their workspace.

## License

Copyright 2023 Chris Griffing

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
