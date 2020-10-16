export const CATEGORIES = [{
  id: 1,
  name: 'Climate',
  description: 'How is climate changing?',
  subcategories: [
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Precipitation', value: 'Precipitations' },
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

// TO DO - remove last id when the rest of datasets are ready,
// last one is duplicated just to check the feature
export const NEXGDDPDatasetsGeeProvider = [
  '5c938458-d22d-43db-8535-5f19368418a9',
  '9a24910e-3d71-4351-8e82-deb9bfd4522f',
  '937efa0f-fc67-45e2-ac07-cb483034ef25',
  'c000ad3e-dd68-46a5-a0db-623b5588ee5c',
  '36f445e8-b60e-454d-a5b6-addf282a49b3', // nexgddp provider,
  '61305721-40ec-4b26-8177-2b5ee4b69eed',
  '3fe18d61-576a-4a1f-bd5d-58facd361739',
  '6acdb91d-d5e0-4130-9a4e-e38f74147f79',
  '26e19edf-220c-404a-8cfb-365cbc1776a6',
  'bf7f2533-9ca0-428e-99da-d895e1c6ce5d',
  'ea6a5948-c0e1-4312-aada-7e2f4e9b9f23' // this one doesn't belogn to the list, remove when data is ready
];

export default { CATEGORIES, NEXGDDPDatasetsGeeProvider };
