# Browser out of date module
A fully tested, simple module that determines if the user's browser fits their version support matrix.

```
npm install browser-compatible --save
```

#### ES6
```
import browserCompatible from 'browser-compatible';

browserCompatible(); // true or false
```

## Use Cases
- You want your own branding around unsupported browsers.
- You don't want to write and maintain your own logic to figure this out.
- You want a fully tested browser compatibility module that simply returns `true` or `false`.
- You are hip.

## @TODO
- automate user agent JSON hydration with `[].slice.call(document.querySelectorAll('#content ul li'), 0).map(n => n.textContent.trim())` from pages like http://www.useragentstring.com/pages/Safari/

## License

```
MIT License

Copyright (c) 2016 Matt Lo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```