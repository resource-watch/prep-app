/**
   * Sets checked values for selector based on previous one chosen.
   *
   * @param {Object} tree used to populate selectors. Contains all options available.
   * @param {Object[]} elements Contains values to be selected in the data tree.
   */
const selectElementsFromTree = (tree = {}, elements = [], deselect = false)  => {
  let found = false; // We're using this loop because indexOf was finding elements
  // that were substrings, e.g. "co" and "economic" when only "economic" should have been found
  for (let i = 0; i < elements.length && !found; i++) {
    if (elements[i] === tree.value) {
      tree.checked = !deselect; // eslint-disable-line no-param-reassign
      found = true;
    }
  }

  (tree.children || []).forEach((child) => {
    selectElementsFromTree(child, elements, deselect);
  });
}

export default selectElementsFromTree;


