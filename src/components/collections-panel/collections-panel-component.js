import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

// Helpers
import { logEvent } from 'helpers/analytics';

import CollectionPanelItem from './collections-panel-item/collections-panel-item-component';

// constants
import { FAVOURITES_COLLECTION } from './collections-panel-constants';

class CollectionsPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newCollectionName: null // new collection's name
    };
  }

  onAddCollection = () => {
    const { addCollection } = this.props;
    const { newCollectionName } = this.state;

    if ((newCollectionName || '').toLowerCase() === 'favourites') {
      toastr.error('Duplicated Favourites list', 'You cannot duplicate this list.');
      return;
    }

    addCollection({ collectionName: newCollectionName });
  }

  onToggleFavourite = () => {
    const { toggleFavourite, favourites, resource, resourceType } = this.props;
    const favourite = favourites.find(fav => fav.resourceId === resource.id) || {};

    // If the user favourite a dataset, we send an
    // analytics event
    if (resourceType === 'dataset' && !favourite.id) {
      logEvent('Explore Menu', 'User favourites a dataset', resource.name);
    }

    toggleFavourite({
      favourite,
      resource: {
        resourceId: resource.id,
        resourceType
      }
    });
  }

  onToggleCollection = (isAdded, collection) => {
    const { toggleCollection, resource, resourceType } = this.props;
    toggleCollection({
      isAdded,
      collectionId: collection.id,
      resource: { id: resource.id, type: resourceType }
    });
  }

  hanldeKeyPress = (evt) => {
    if (evt.key !== 'Enter') return;

    this.onAddCollection();
  }

  handleInputChange = (evt) => {
    this.setState({ newCollectionName: evt.currentTarget.value });
  }

  renderCollections() {
    const { collections, resource, resourceType,
      favourites, collectionsLoadingQueue, favouritesLoading } = this.props;

    const favouriteCollection = (
      <CollectionPanelItem
        key={FAVOURITES_COLLECTION.id}
        collection={FAVOURITES_COLLECTION}
        loading={favouritesLoading}
        resource={resource}
        resourceType={resourceType}
        isChecked={favourites.some(favourite =>
          favourite.resourceId === resource.id)}
        onToggleCollection={this.onToggleFavourite}
      />
    );

    const collectionItems = collections.map(collection =>
      (<CollectionPanelItem
        key={collection.id}
        collection={collection}
        loading={(collectionsLoadingQueue.find(loader =>
          loader.id === collection.id) || {}).loading}
        resource={resource}
        resourceType={resourceType}
        isChecked={collection.resources.some(collectionResource =>
          collectionResource.id === resource.id)}
        onToggleCollection={this.onToggleCollection}
      />));

    collectionItems.unshift(favouriteCollection);

    return (
      <ul className="collection-list">
        {collectionItems}
      </ul>
    );
  }

  render() {
    const { onDone } = this.props;

    return (
      <div className="c-collections-panel">
        <div className="new-collection-container">
          <input
            type="text"
            name="new-collection"
            className="new-collection-input"
            placeholder="New collection"
            onChange={this.handleInputChange}
            onKeyPress={this.hanldeKeyPress}
          />
          <button
            className="c-button add-button"
            onClick={this.onAddCollection}
          >
            Add
          </button>
        </div>
        <div className="collection-list-container">
          {this.renderCollections()}
        </div>
        {/* <div className="actions">
          <button
            className="c-button done-button"
            onClick={onDone}
          >
            Done
          </button>
        </div> */}
      </div>
    );
  }
}

CollectionsPanel.defaultProps = {
  collections: [],
  favourites: [],
  resource: {},
  collectionsLoadingQueue: [],
  favouritesLoading: false,
  addCollection: () => {},
  toggleCollection: () => {},
  toggleFavourite: () => {},
  onDone: () => {}
};

CollectionsPanel.propTypes = {
  collections: PropTypes.array,
  favourites: PropTypes.array,
  resource: PropTypes.object,
  collectionsLoadingQueue: PropTypes.array,
  favouritesLoading: PropTypes.bool,
  addCollection: PropTypes.func,
  toggleCollection: PropTypes.func,
  toggleFavourite: PropTypes.func,
  onDone: PropTypes.func,
  resourceType: PropTypes.oneOf(['dataset', 'layer', 'widget'])
};

export default CollectionsPanel;
