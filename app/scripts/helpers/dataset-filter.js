const getDatasetsFiltered = (datasetList, datasetFilters) =>
  datasetList.filter((dataset) => {
    let matches = true;

    Object.keys(datasetFilters).forEach((filterKey) => {
      const selectedTags = datasetFilters[filterKey];
      let datasetTags = [];

      // retrieves tags of the dataset
      if (dataset.vocabulary[0]) {
        datasetTags = dataset.vocabulary[0] ?
          dataset.vocabulary[0].attributes.tags : [];
      }

      // if the dataset has no tags, there's no point on continue
      if (!datasetTags.length) matches = false;

      if (matches) {
        // loop through selected tags until one of the tags is not found
        const tagNotFound = selectedTags.some((tag) => !datasetTags.includes(tag));

        if (tagNotFound) matches = false;
      }

    });

    return matches;
  });


export default getDatasetsFiltered;
