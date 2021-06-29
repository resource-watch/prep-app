export const setInteractions = (state, { payload }) => {
  const interactions = { ...state.interactions, ...payload };
  return { ...state, interactions };
};

export default { setInteractions };
