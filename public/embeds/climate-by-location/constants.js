const VARIABLES = [
  { id: 'tmax', name: 'mean daily maximum temperature (°F)'},
  { id: 'tmin', name: 'mean daily minimum temperature (°F)'},
  { id: 'days_tmax_gt_90f', name: 'count of days with maximum temperature over 90°F (days)'},
  { id: 'days_tmax_gt_95f', name: 'count of days with maximum temperature over 95°F (days)'},
  { id: 'days_tmax_gt_100f', name: 'count of days with maximum temperature over 100°F (days)'},
  { id: 'days_tmax_gt_105f', name: 'count of days with maximum temperature over 105°F (days)'},
  { id: 'days_tmax_lt_32f', name: 'count of days with maximum temperature below 32°F (days)'},
  { id: 'days_tmin_lt_32f', name: 'days with minimum temps below 32°F (days)'},
  { id: 'days_tmin_gt_80f', name: 'count of days with minimum temperature above 80°F (days)'},
  { id: 'days_tmin_gt_90f', name: 'count of days with minimum temperature above 90°F (days)'},
  { id: 'hdd_65f', name: 'days * degrees below 65°F (°F-days)'},
  { id: 'cdd_65f', name: 'days * degrees above 65°F (°F-days)'},
  { id: 'gdd', name: 'growing degree days (°F-days)'},
  { id: 'gddmod', name: 'modified growing degree days (°F-days)'},
  { id: 'days_dry_days', name: 'dry days (days)'},
  { id: 'pcpn', name: 'total precipitation (inches)'},
  { id: 'days_pcpn_gt_1in', name: 'days with more than 1 inch of precipitation (days)'},
  { id: 'days_pcpn_gt_2in', name: 'days with more than 2 inch of precipitation (days)'},
  { id: 'days_pcpn_gt_3in', name: 'days with more than 3 inch of precipitation (days)'},
  { id: 'days_pcpn_gt_4in', name: 'days with more than 4 inch of precipitation (days)'}
];


const FREQUENCIES = [
  { id: 'annual', name: 'Annual'},
  { id: 'monthly', name: 'Monthly'},
  { id: 'seasonal', name: 'Seasonal'}
];