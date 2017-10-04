import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import Tabs from './Tabs';
import { TABS_SAMPLE } from './samples';

storiesOf('Ui', module)
  .add('Tabs', () => (
    <Tabs {...TABS_SAMPLE} />
  ));
