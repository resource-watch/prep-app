import { createSelector } from 'reselect';

const range1Selection = ({ nexgddptool }) => nexgddptool.range1.selection;
const range2Selection = ({ nexgddptool }) => nexgddptool.range2.selection;

// eslint-disable-next-line import/prefer-default-export
export const getLayers = createSelector(
  range1Selection,
  range2Selection,
  (range1Selection, range2Selection) => { // eslint-disable-line no-shadow
    if (!range1Selection && !range2Selection) return [];

    const result = [];

    if (range1Selection) {
      const range1Date = `${range1Selection.value}-01-01T00:00:00`;
      result.push({
        url: `${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="${range1Date}"`,
        date: range1Date
      });
    }

    if (range2Selection) {
      const range2Date = `${range2Selection.value}-01-01T00:00:00`;
      result.push({
        url: `${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="${range2Date}"`,
        date: range2Date
      });
    }

    return result;
  }
);
