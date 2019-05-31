const VARIABLES = [
  { id: 'tmax', name: 'Average Daily Maximum Temperature (°F)'},
  { id: 'tmin', name: 'Average Daily Minimum Temperature (°F)'},
  { id: 'days_tmax_gt_90f', name: 'Days per year with Maximum Temperature Above 90°F'},
  { id: 'days_tmax_gt_95f', name: 'Days per year with Maximum Temperature Above 95°F'},
  { id: 'days_tmax_gt_100f', name: 'Days per year with Maximum Temperature Above 100°F'},
  { id: 'days_tmax_gt_105f', name: 'Days per year with Maximum Temperature Above 105°F'},
  { id: 'days_tmax_lt_32f', name: 'Days per year with Maximum Temperature below 32°F'},
  { id: 'days_tmin_lt_32f', name: 'Days per year with Minimum Temperature below 32°F'},
  { id: 'days_tmin_gt_80f', name: 'Days With Minimum Temperature above 80°F'},
  { id: 'days_tmin_gt_90f', name: 'Days With Minimum Temperature above 90°F'},
  { id: 'pcpn', name: 'Total Precipitation'},
  { id: 'days_pcpn_gt_1in', name: 'Days with Precipitation Above 1 inch'},
  { id: 'days_pcpn_gt_2in', name: 'Days with Precipitation Above 2 inches'},
  { id: 'days_pcpn_gt_3in', name: 'Days with Precipitation Above 3 inches'},
  { id: 'days_pcpn_gt_4in', name: 'Days with Precipitation Above 4 inches'},
  { id: 'days_dry_days', name: 'Dry Days'},
  { id: 'hdd_65f', name: 'Heating Degree Days'},
  { id: 'cdd_65f', name: 'Cooling Degree Days'},
  { id: 'gdd', name: 'Growing Degree Days'},
  { id: 'gddmod', name: 'Modified Growing Degree Days'},
];


const FREQUENCIES = [
  { id: 'annual', name: 'Annual'},
  { id: 'monthly', name: 'Monthly'},
  { id: 'seasonal', name: 'Seasonal'}
];