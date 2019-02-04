import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MapPopup } from 'wri-api-components/dist/map';
import { TidalStations, ConusStations } from './templates';

class PopupComponent extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    interaction: PropTypes.object,
    onModal: PropTypes.func
  }

  static defaultProps = {
    interaction: null,
    onModal: (data) => { console.log(data) }
  }

  render() {
    const { map, interaction, onModal } = this.props;
    const { id, data, latlng } = interaction || {};

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

          {id === '3c88ecba-54ce-4add-91d4-7581a1b9ab1a' &&
            <TidalStations onModal={() => onModal(data)} />
          }

          {id === 'dfda6a1f-77d4-4ba6-8514-0b567d049b34' &&
            <ConusStations onModal={() => onModal(data)} />
          }
        </MapPopup>
      </div>
    );
  }
}

export default PopupComponent;
