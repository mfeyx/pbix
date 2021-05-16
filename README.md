# pbix
Read Microsoft Power BI Files (*.pbix) with Node.js

## :warning: WIP

Be aware, this is work in progress, and I do not know how this package will end up. So use with caution

## How-to Use

```javascript
const PBIX = require('pbix')
const fpath = 'my-dataset.pbix';

// no options atm, but will be of type `object`
const options = {};
const pbix = new PBIX(options);
pbix.readFile(fpath).then(data => {
  const layout = data.layout;
  console.log(layout);
});
```

## To Do

... a lot :sweat_smile:
