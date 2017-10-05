import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import Tabs from './Tabs';
import CollapsibleItem from './CollapsibleItem';

import { TABS_SAMPLE, COLLAPSIBLE_ITEM } from './samples';

storiesOf('Ui', module)
  .add('Tabs', () => (
    <Tabs {...TABS_SAMPLE} />
  ))
  .add('Collapsible item', () => (
    <CollapsibleItem {...COLLAPSIBLE_ITEM} />
  ));
