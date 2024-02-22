# gw2-tooltip-html

[![version][npm-badge]][npm]
[![license][license-badge]](LICENSE)
[![build][build-badge]][build]

[npm-badge]: https://img.shields.io/npm/v/gw2-tooltip-html.svg?style=flat-square
[license-badge]: https://img.shields.io/github/license/darthmaim/gw2-tooltip-html.svg?style=flat-square
[build-badge]: https://img.shields.io/github/actions/workflow/status/darthmaim/gw2-tooltip-html/ci.yml?style=flat-square
[npm]: https://www.npmjs.com/package/gw2-tooltip-html
[build]: https://github.com/darthmaim/gw2-tooltip-html/actions/workflows/ci.yml


Parses markup text from Guild Wars 2 tooltips to html.


## Installation
Install this module with your favorite package manager, e.g. `npm install gw2-tooltip-html`.


### Usage
```javascript
import { format } from 'gw2-tooltip-html';

format('<c=@abilitytype>Heat Threshold</c>')
// ⇒ '<span class="color-format--abilitytype">Heat Threshold</span>'
```


## License
**gw2-tooltip-html** is licensed under the [MIT License](LICENSE).
