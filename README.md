# `babel-plugin-add-unit-styled-components`

This plugin adds unit to css properties that need it to work on the browser. This is intended to help with the use of `react-native-web`and `styled-components` so you can create your components without unit and still use the same code to run it on the browser.

## Quick start

Install the plugin first:

```
npm install --save-dev babel-plugin-add-unit-styled-components
```

Then add it to your babel configuration:

```JSON
{
  "plugins": [["babel-plugin-add-unit-styled-components", { unit: 'px' }]]
}
```
## License

Licensed under the MIT License, Copyright © 2018 Rodrigo Orofino.

See [LICENSE.md](./LICENSE.md) for more information.