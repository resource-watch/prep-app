import * as queryString from 'query-string';

// helpers
import { concatenateFilters } from 'helpers/graph-service';

class GraphService {
  static searchDatasetsByConcepts(filters = {}) {
    const filtersString = concatenateFilters(filters);
    const queryParams = queryString.stringify(
      Object.assign({},
        { published: true },
        { env: process.env.DATASET_ENV },
        { application: process.env.APPLICATIONS },
        { 'page[size]': 999999 })
    );

    return new Promise((resolve, reject) => {
      fetch(`${process.env.RW_API_URL}/graph/query/search-datasets?${filtersString}&${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          'Upgrade-Insecure-Requests': 1
        }
      })
        .then((response) => {
          const { status, statusText } = response;
          if (status === 200) return response.json();

          const errorObject = {
            errors: {
              status,
              details: statusText
            }
          };

          throw errorObject;
        })
        .then(data => resolve(data))
        .catch(errors => reject(errors));
    });
  }
}

export default GraphService;
