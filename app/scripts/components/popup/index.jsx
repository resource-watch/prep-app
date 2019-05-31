import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MapPopup } from 'wri-api-components/dist/map';
import { TidalStations, ConusStations, ClimateByLocation } from './templates';

import './styles.scss';

class PopupComponent extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    interaction: PropTypes.object,
    layers: PropTypes.array,
    setModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    layers: [],
    interaction: null
  }

  render() {
    const { map, interaction, layers, setModal } = this.props;
    const { id, data, latlng } = interaction || {};

    if (!data || !latlng) return null;

    const layer = layers.find(l => l.id === id);
    const { interactionConfig } = layer;
    const { output } = interactionConfig;

    return (
      <MapPopup
        map={map}
        latlng={latlng}
        data={{ data }}
      >
        <div className="c-map-popup">
          <table className="map-popup--table">
            <tbody>
              {output.map(o => (
                <tr key={o.column}>
                  <th>
                    {o.label || o.column}
                  </th>
                  <td>
                    {data[o.column]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(id === '3c88ecba-54ce-4add-91d4-7581a1b9ab1a' || id === '8f8e5d8d-a783-434b-b4fe-db4f10ced148') && (
            <TidalStations
              onModal={() =>
                setModal({
                  open: true,
                  config: {
                    id,
                    title: 'High tide flooding',
                    src: `/embeds/high-tide-flooding/?station=${data.id}`
                  }
                })
              }
            />
          )}

          {id === 'dfda6a1f-77d4-4ba6-8514-0b567d049b34' || id === '038ff32e-9002-433b-bfaf-0db3be9294b4' && (
            <ConusStations
              onModal={() =>
                setModal({
                  open: true,
                  config: {
                    id,
                    title: 'Temperature and Precipitation Thresholds',
                    src: `/embeds/timeline-exceedance/?station=${data.id}`
                  }
                })
              }
            />
          )}

          {(id === '0323e372-f9c5-41ca-9d9e-502572634512' || id === 'f559c72b-81b0-466f-9ba5-977332860897') && (
            <ClimateByLocation
              onModal={() =>
                setModal({
                  open: true,
                  config: {
                    id,
                    title: 'Climate by location',
                    src: `/embeds/climate-by-location/?county=${data.geo_id2}`
                  }
                })
              }
            />
          )}
        </div>
      </MapPopup>
    );
  }
}

export default PopupComponent;
