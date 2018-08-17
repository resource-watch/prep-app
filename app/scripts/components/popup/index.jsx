import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MapPopup } from 'wri-api-components/dist/map';

class PopupComponent extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    interaction: PropTypes.object
  }

  static defaultProps = { interaction: null }

  render() {
    const { map, interaction } = this.props;
    const { data, latlng } = interaction || {};

    if (!data || !latlng) return null;

    return (
      <div className="c-map-popup">
        <MapPopup
          map={map}
          latlng={latlng}
          data={{ data }}
        >
          <table>
            <tbody>
              {Object.keys(data || {}).map(k => (
                <tr key={k}>
                  <th>
                    {k}
                  </th>
                  <td>
                    {data[k]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MapPopup>
      </div>
    );
  }
}

export default PopupComponent;
