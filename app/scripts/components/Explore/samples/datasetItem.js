import React from 'react';
import Switch from '../../Button/Switch';

export const DATASET_ITEM_SAMPLE = {
  metadata: {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    tags: ['Hazard', 'Temperature']
  },
  leftElement: <Switch onChange={() => {}} checked />,
  toolsElements: [
    (<button key={'info-open'} onClick={() => {}} className="info">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>info</title><path d="M18.107 14.899v-1.101h-6.603v2.201h2.201v6.603h-2.201v2.201h8.804v-2.201h-2.201v-7.703zm-2.201 16.508C7.397 31.407.499 24.509.499 16S7.397.593 15.906.593 31.313 7.491 31.313 16s-6.898 15.407-15.407 15.407zM13.705 7.196v4.402h4.402V7.196h-4.402z"/></svg>
    </button>)
  ],
  layerActive: true,
  infoActive: false
};
