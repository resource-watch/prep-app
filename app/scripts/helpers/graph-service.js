export const concatenateFilters = (filters = {}) => {
  const { topics, geographies, dataTypes } = filters;

  if (!((topics || []).length) && !((geographies || []).length) && !((dataTypes || []).length)) return null;

  let counter = 0;
  const topicsSt = topics ? topics.map((val, index) => `concepts[${counter}][${index}]=${val}`).join('&') : null;
  if ((topics || []).length) counter++;
  const geographiesSt = geographies ? `${geographies.map((val, index) => `concepts[${counter}][${index}]=${val}`).join('&')}` : null;
  if ((geographies || []).length) counter++;
  const dataTypesSt = dataTypes ? `${dataTypes.map((val, index) => `concepts[${counter}][${index}]=${val}`).join('&')}` : null;

  let querySt = topicsSt;
  if (geographiesSt) {
    if (querySt) {
      querySt += `&${geographiesSt}`;
    } else {
      querySt = geographiesSt;
    }
  }
  if (dataTypesSt) {
    if (querySt) {
      querySt += `&${dataTypesSt}`;
    } else {
      querySt = dataTypesSt;
    }
  }

  return querySt;
};

export default {
  concatenateFilters
};
