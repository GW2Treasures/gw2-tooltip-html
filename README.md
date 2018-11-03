# gw2-tooltip-html

[![version][npm-badge]][npm]
[![license][license-badge]](LICENSE)
[![Travis][travis-badge]][travis]
[![Coverage][coverage-badge]][coverage]

[npm-badge]: https://img.shields.io/npm/v/gw2-tooltip-html.svg?style=flat-square
[license-badge]: https://img.shields.io/github/license/darthmaim/gw2-tooltip-html.svg?style=flat-square
[travis-badge]: https://img.shields.io/travis/darthmaim/gw2-tooltip-html/master.svg?style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/darthmaim/gw2-tooltip-html.svg?style=flat-square
[npm]: https://www.npmjs.com/package/gw2-tooltip-html
[travis]: https://travis-ci.org/darthmaim/gw2-tooltip-html
[coverage]: https://codecov.io/github/darthmaim/gw2-tooltip-html


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
