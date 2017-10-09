import { configure } from '@storybook/react';

function loadStories() {
  // Import all styles
  require('../app/styles/lib/custom-foundation.css');
  require('../app/styles/index.scss');

  // Import components
  require('../app/scripts/components/Explore/explore.story.js');
  require('../app/scripts/components/ui/ui.story.js');
}

configure(loadStories, module);
