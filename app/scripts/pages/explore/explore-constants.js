export const BASEMAPS = {
  default: {
    id: 'default',
    value: config.basemapTileUrl || 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    label: 'Default',
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  dark: {
    id: 'dark',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj0mhglox00a92slahe3obtpq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg',
    label: 'Dark',
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  light: {
    id: 'light',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj0mhlipx00aa2slaxd738db2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg',
    label: 'Light',
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  satellite: {
    id: 'satellite',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj0cl6k8h00bu2sobqze86bcm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg',
    label: 'Satellite',
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj8emql45a7g92suc538h2shw/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg',
    label: 'Terrain',
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'
    }
  }
};

export const LABELS = {
  light: {
    id: 'light',
    label: 'Labels light',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj8lr4oo566da2rqrmuu9btmz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg'
  },
  dark: {
    id: 'dark',
    label: 'Labels light',
    value: 'https://api.mapbox.com/styles/v1/jcawri/cj8lr4oo566da2rqrmuu9btmz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamNhd3JpIiwiYSI6ImNqMDd6N2NybzAwMHcyd29iZWlsems0enEifQ.eIqQeyQn5oCLkyivGtiVLg'
  }
};

export const BOUNDARIES = {
  dark: {
    id: 'dark',
    label: 'Boundaries',
    value: 'https://api.mapbox.com/styles/v1/prepdata/cjbfcn5o51al72so1u5avqcur/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJlcGRhdGEiLCJhIjoiY2piZmNrcTRjMXRsdzJxbm9uNm1nOXJtNSJ9.Jm14P-FBGvNxiaB-3mzSPw'
  }
};

export const TABS_OPTIONS = [
  {
    label: 'Core datasets',
    value: 'core_datasets'
  },
  {
    label: 'All datasets',
    value: 'all_datasets'
  }
];

export const SET_TAB = 'explore_page/SET_TAB';
export const SET_BASEMAP = 'explore_page/SET_BASEMAP';
export const SET_LABELS = 'explore_page/SET_LABELS';
export const SET_BOUNDARIES = 'explore_page/SET_BOUNDARIES';
