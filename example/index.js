// Copyright (c) 2017 by Igor Tkachenko <vash.igor@gmail.com>. All Rights Reserved.
// This code is provided under the MIT license.
// You can find the full text in the package you get this file with.


import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies


import create from '../module/index';

const MyComp = create({ props: { value: {} } })(
  (h, { value }) => <div>{value}</div>,
);

/* eslint-disable no-new */
new Vue({ el: '#example-app', render: h => (<MyComp value={1} />) });
/* eslint-enable no-new */
