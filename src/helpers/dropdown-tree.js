/**
   * Sets checked values for selector based on previous one chosen.
   *
   * @param {Object} tree used to populate selectors. Contains all options available.
   * @param {Object[]} elements Contains values to be selected in the data tree.
   */
export const selectElementsFromTree = (tree = {}, elements = [], deselect = false) => {
  let found = false;
  for (let i = 0; i < elements.length && !found; i++) {
    if (elements[i] === tree.value) {
      Object.assign(tree, { checked: !deselect });
      found = true;
    }
  }

  if ((tree.children || []).length) {
    tree.children.forEach((child) => {
      selectElementsFromTree(child, elements, deselect);
    });
  }
};

export const getSelectedElements = (tree = {}, filters) => {
  const newTree = Object.assign({}, tree);

  Object.keys(filters).forEach((filterKey) => {
    const filterValues = filters[filterKey];
    const dataTree = newTree[filterKey] || [];

    dataTree.forEach(child => selectElementsFromTree(child, filterValues));
  });

  return newTree;
};

export default {
  selectElementsFromTree,
  getSelectedElements
};

