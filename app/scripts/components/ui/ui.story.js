import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import Tabs from './Tabs';
import Search from './Search';
import CollapsibleItem from './CollapsibleItem';

import { TABS_SAMPLE, COLLAPSIBLE_ITEM } from './samples';

storiesOf('Ui', module)
  .add('Tabs', () => (
    <Tabs {...TABS_SAMPLE} />
  ))
  .add('Search', () => (
    <Search list={[{ id: 1, name: 'Apas' }, { id: 2, name: 'Fesis' }]} />
  ))
  .add('Collapsible item', () => (
    <CollapsibleItem {...COLLAPSIBLE_ITEM} />
  ));
