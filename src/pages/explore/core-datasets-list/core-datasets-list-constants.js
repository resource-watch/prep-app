export const CATEGORIES = [{
  id: 1,
  name: 'Climate',
  description: 'How is climate changing?',
  subcategories: [
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Precipitation', value: 'Precipitations' },
    { label: 'Extreme events', value: 'Extreme events' },
    { label: 'Coastal risk', value: 'Coastal risk' },
    { label: 'Water risk', value: 'Water risk' }
  ]
}, {
  id: 2,
  name: 'Exposure',
  description: 'What could be affected?',
  subcategories: [
    { label: 'People', value: 'People' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Infrastructure', value: 'Infrastructure' }
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
    { label: 'Water', value: 'Water' }
  ]
}];

export const NexLocaGEEIndicators = [
  {
    "id": "088da0f4-4b27-4185-b186-7e33adfb7795",
    "type": "dataset",
    "name": "Annual Average Temperature",
    "slug": "Annual-Average-Temperature",
    "subtitle": null,
    "application": ["prep"],
    "dataPath": null,
    "attributesPath": null,
    "connectorType": "rest",
    "provider": "gee",
    "userId": "5dc97303c1fef200109a149a",
    "connectorUrl": "",
    "sources": [],
    "tableName": "projects/resource-watch-gee/loca/loca_tavg-tasmin_tasmax",
    "status": "saved",
    "published": true,
    "overwrite": false,
    "mainDateField": null, "env": "production", "geoInfo": false, "protected": false,
    "datasets": {
      absolute: {
        low: '4396aa9a-1e4d-42b0-958b-9c6df6163dc3',
        high: '7d886817-bd6d-4c87-a4bb-448816a90419',
      },
      change: {
        low: '3bf8351b-b978-4343-9f4d-c13c8e4e85bc',
        high: '5f162901-8d5b-4d3b-b721-5d6b69821fba',
      }
    }
  }
];

export default CATEGORIES;
