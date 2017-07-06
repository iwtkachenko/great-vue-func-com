# Vue JS true functional components
This is small helper function that helps to create functional components.

**Table of Contents**

- [Vue JS true functional components](#)
  - [Motivation](#motivation)
  - [Limitations](#limitations)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [Helper itself](#funccomponent)
    - [RenderFunction](#renderfunction)
    - [Options](#options)
    - [RenderPayload](#renderpayload)
  - [License](#license)

---
## Motivation
I'd like VueJs to behave more React way in my hands. [More deatils here.](https://github.com/vashigor/great-vue-hoc-helper#motivation)


## Limitations
This library is mostly useful when you use:
* vuejs with render functions


## Installation
```bash
# npm 5+
npm install great-vue-func-com
# or
yarn add great-vue-func-com
```


# Usage
```javascript
import Vue from 'vue';
import fcom from 'great-vue-func-com';

const MyComp = fcom({ props: { value: {} } })(
  (h, { value }) => <div>{value}</div>,
);

/* eslint-disable no-new */
new Vue({ el: '#example-app', render: h => (<MyComp value={1} />) });
/* eslint-enable no-new */
```

## API
This library uses pretty same API as [hoc helper.](https://github.com/vashigor/great-vue-hoc-helper#motivation) does.
### func-component
```javascript
<T>(options: Options<T> = {}) => (com: RenderFunction<T>) => typeof Vue
```

### RenderFunction
```javascript
type RenderFunction<T> = (
  h: any,
  props?: T,
  children: Vue[],
  payload?: RenderPayload<T>
) => any
```

### Options
```javascript
interface Options<T> {
  // Inject props values into the child component
  injectProps?: (props: T, self?: Vue, options?: Options<T>, metadata?: any) => T,
  // Prepare vue vm render data object
  prepareData?: (self: Vue, options?: Options<T>) => any,
  // Additional props definitions
  props?: T,
  // This object has to have shape of Vue component options
  options?: any,
  /**
   * Initial values for unbinded data for vnode instance.
   * The idea is that all vue data object (with props, data, methods etc.)
   * is under tight control by things like proxies, observers, watchers,
   * and any other things that can influnce or react on your values some way or
   * prevent you from operating it the way you want.
   * This is a safe place to keep some data that relates to your HOC.
   */
  metadata?: any,
}
```

### RenderPayload
```javascript
interface RenderPayload<T> {
  self: Vue,
  props?: T,
  metadata?: any,
}
```


## License
This module is provided under the MIT License. You have to read LICENSE.md file for details.

---
Copyright (c) 2017 by Igor Tkachenko <vash.igor@gmail.com>. All Rights Reserved.
