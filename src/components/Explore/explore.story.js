import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import DatasetItem from './DatasetItem';
import { DATASET_ITEM_SAMPLE } from './samples';

storiesOf('Explore', module)
  .add('Dataset Item', () => (
    <DatasetItem {...DATASET_ITEM_SAMPLE} />
  ));
