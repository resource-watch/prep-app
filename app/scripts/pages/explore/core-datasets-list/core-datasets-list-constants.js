export const CATEGORIES = [{
  id: 1,
  name: 'Climate',
  description: 'How is climate changing?',
  subcategories: [
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Precipitations', value: 'Precipitations' },
    { label: 'Extreme events', value: 'Extreme events'},
    { label: 'Coastal risk', value: 'Coastal risk'},
    { label: 'Water risk', value: 'Water risk'}
  ]
}, {
  id: 2,
  name: 'Exposure',
  description: 'What could be affected?',
  subcategories: [
    { label: 'People', value: 'People' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Infrastructure', value: 'Infrastructure'}
  ]
}, {
  id: 3,
  name: 'Vulnerability',
  description: 'What makes us more or less vulnerable?',
  subcategories: [
    { label: 'Socioeconomic', value: 'Socioeconomic' },
    { label: 'Indices of vulnerability', value: 'Indices of vulnerability' }
  ]
}, {
  id: 4,
  name: 'Physical Features',
  description: 'What physical characteristics can provide context?',
  subcategories: [
    { label: 'Administrative Boundaries', value: 'Administrative Boundaries' },
    { label: 'Land', value: 'Land' },
    { label: 'Water', value: 'Water'}
  ]
}];

export default CATEGORIES;
