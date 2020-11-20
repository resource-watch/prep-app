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

export const NexLocaGEEDatases = [
  {
    absolute: {
      low: '4396aa9a-1e4d-42b0-958b-9c6df6163dc3',
      high: '7d886817-bd6d-4c87-a4bb-448816a90419',
    },
    change: {
      low: '3bf8351b-b978-4343-9f4d-c13c8e4e85bc',
      high: '5f162901-8d5b-4d3b-b721-5d6b69821fba',
    },
  }
];

export const NexLocaGEEDatasetIds = [
  // NEXGDDP

  // Average Temperature
  '3bf8351b-b978-4343-9f4d-c13c8e4e85bc', // Projected Change in Annual Average Temperature (RCP8.5)
  '5f162901-8d5b-4d3b-b721-5d6b69821fba', // Projected Change in Annual Average Temperature (RCP4.5)
  '4396aa9a-1e4d-42b0-958b-9c6df6163dc3', // Projected Annual Average Temperature (RCP8.5)
  '7d886817-bd6d-4c87-a4bb-448816a90419', // Projected Annual Average Temperature (RCP4.5)
  // Average Low Temperature
  'e3629722-feeb-42a4-a275-26a2e58c7464', // Projected Change in Annual Average Minimum Temperature (RCP8.5)
  '270a05fa-63ae-482b-8bd1-749ba9cc331d', // Projected Change in Annual Average Minimum Temperature (RCP4.5)
  '83cf5736-cc30-4b27-a517-c9017e873121', // Projected Annual Average Minimum Temperature (RCP8.5)
  'c2bf31e6-c857-4649-ac2a-3c5e586ac146', // Projected Annual Average Minimum Temperature (RCP4.5)
  // Average High Temperature
  'e282474f-00b4-4935-8e2e-e036e68de8f7', // Projected Change in Annual Average Maximum Temperature (RCP8.5)
  '75fe0419-b437-47b4-a8b8-527b1672e69d', // Projected Change in Annual Average Maximum Temperature (RCP4.5)
  '302da6c5-8a0a-453c-9cb5-1a8978e153d9', // Projected Annual Average Maximum Temperature (RCP8.5)
  '38417aed-9213-45ef-b5eb-d472c867e8ac', // Projected Annual Average Maximum Temperature (RCP4.5)
  // Heating Degree Days
  'b7c808ee-c0c9-4974-b2e5-ac7baa3c11da', // Projected Change in Heating Degree Day (RCP8.5)
  '99e4931b-1d3c-4196-9b7a-848ad63ede07', // Projected Change in Heating Degree Day (RCP4.5)
  '215c9290-52de-48bf-8155-cd81e15d1de1', // Projected Heating Degree Day (RCP8.5)
  'a6998005-2168-4e7c-8922-73cb3504688c', // Projected Heating Degree Day (RCP4.5)
  // Cooling Degree Days
  '241596f7-e3db-4422-a83e-66f3263112ae', // Projected Change in Cooling Degree Days (RCP8.5)
  '91baf0db-a3f9-4e07-bc0a-ef9c04cfa8d6', // Projected Change in Cooling Degree Days (RCP4.5)
  '58b7f0a2-8fb7-411f-8801-21e82529c019', // Projected Cooling Degree Days (RCP8.5)
  '18de3f0c-dc37-4919-9fc9-4cc8b59ca355', // Projected Cooling Degree Days (RCP4.5)
  // Frost Free Season
  '30ce02c6-0ce8-428c-b08a-15efbbb9e6b1', // Projected Change in Frost Free Season (RCP8.5)
  'e32cf348-e754-4059-8289-e5ca87daf33f', // Projected Change in Frost Free Season (RCP4.5)
  '1b9f3972-1b98-4675-8508-2df79c48dee6', // Projected Frost Free Season (RCP8.5)
  'c02315be-85f1-474e-b181-0ed161bf9ba4', // Projected Frost Free Season (RCP4.5
  // Extreme Heat Days
  '8166ce1d-91ad-4ced-bac7-f2bb47661508', // Projected Change in Extreme Heat Days (RCP8.5)
  'befe74d7-16c6-4d04-97fd-465a0336c53a', // Projected Change in Extreme Heat Days (RCP4.5)
  '1b60471d-a2d3-4114-a601-3cdb58f2cd61', // Projected Extreme Heat Days (RCP8.5)
  '8cb8d8e9-52b0-432a-b5d9-7d5616967ff1', // Projected Extreme Heat Days (RCP4.5)
  // Cumulative Precipitation
  '64e26417-d9fa-4953-ac44-481fecc9a9aa', // Projected Change in Cumulative Precipitation (RCP8.5)
  'd18148c9-e758-4a1a-ab30-b82523a80971', // Projected Change in Cumulative Precipitation (RCP4.5)
  'a642ebe2-5b7b-48d4-932a-0129115c51ed', // Projected Cumulative Precipitation (RCP8.5)
  'd6f46761-6151-4e48-8c04-1a5d59785ae7', // Projected Cumulative Precipitation (RCP4.5)
  // Dry Spells
  '0d8cdbab-b143-4f2f-8c96-d9afdfa6a4f5', // Projected Change in Dry Spells (RCP8.5)
  '77eb681b-8bf3-4e1c-9a49-4b5ed5e54a09', // Projected Change in Dry Spells (RCP4.5)
  '4f6df15e-cd85-4906-a433-ca6f546acc5c', // Projected Dry Spells (RCP8.5)
  '2b65190e-e130-4685-8650-8eeb8bed4154', // Projected Dry Spells (RCP4.5)
  // Extreme Precipitation Days
  '6796ac3f-0e7e-4ae7-b0a9-692047ca427f', // Projected Change in Extreme Precipitation Days (RCP8.5)
  'f1c2270f-1828-4641-aa0c-ca170570b0aa', // Projected Change in Extreme Precipitation Days (RCP4.5)
  'ba62ef44-7c96-40cb-8531-89a0353657f6', // Projected Extreme Precipitation Days (RCP8.5)
  'c9b1c2f0-67f8-4a15-8fad-e5dc60d9a81b', // Projected Extreme Precipitation Days (RCP4.5)

  // LOCA

  // Average Temperature
  '3a1d1d33-e0b2-44b0-9166-59fa14db0bf3', // Projected Change in Annual Average Temperature U.S. (RCP8.5)
  '088da0f4-4b27-4185-b186-7e33adfb7795', // Projected Change in Annual Average Temperature U.S. (RCP4.5)
  '44a8bbaf-b171-4e25-a464-0780ebb1b92e', // Projected Annual Average Temperature U.S. (RCP8.5)
  '8b047aed-5f3f-4ea5-bb2f-188237a84d7b', // Projected Annual Average Temperature U.S. (RCP4.5)
  // Average Low Temperature
  'f608c918-a2af-4366-b844-ea43c2d38429', // Projected Change in Annual Average Minimum Temperature U.S. (RCP8.5)
  'd944062b-ba19-48ce-9af8-b59637d29bfd', // Projected Change in Annual Average Minimum Temperature U.S. (RCP4.5)
  'd3956bfb-8763-4cc8-947e-ff3a443113f0', // Projected Annual Average Minimum Temperature U.S. (RCP8.5)
  'c6fe8270-b4ab-4007-afdd-7876efea0aa6', // Projected Annual Average Minimum Temperature U.S. (RCP4.5)
  // Average High Temperature
  '92fabe8b-7054-48c5-aef7-2c3987b361ad', // Projected Change in Annual Average Maximum Temperature U.S. (RCP8.5)
  '8d038a0a-7540-4fac-9c19-06df4bf97290', // Projected Change in Annual Average Maximum Temperature U.S. (RCP4.5)
  '2ce6f4f1-d216-4d7d-9e5f-13fe9c244691', // Projected Annual Average Maximum Temperature U.S. (RCP8.5)
  '745ab50c-cb2d-4082-b3e8-84df29c8c609', // Projected Annual Average Maximum Temperature U.S. (RCP4.5)
  // Heating Degree Days
  '2cbb4168-f33c-4de9-85b9-0de00312ce70', // Projected Change in Heating Degree Day U.S. (RCP8.5)
  'dc25678b-351a-43cd-88c4-a989f318a056', // Projected Change in Heating Degree Day U.S. (RCP4.5)
  '2c89c4ad-55d6-4752-a0bb-f5cb4c206e08', // Projected Heating Degree Day U.S. (RCP8.5)
  '73de8c6c-1556-4589-a8b3-bee6287140a2', // Projected Heating Degree Day U.S. (RCP4.5)
  // Cooling Degree Days
  '265be75d-c1c6-44ed-bdf8-52f9220d8746', // Projected Change in Cooling Degree Days U.S. (RCP8.5)
  '3e0124e1-00cb-43dc-87cd-beded93d8531', // Projected Change in Cooling Degree Days U.S. (RCP4.5)
  'e1a8a45b-5c78-415f-a667-f54ddce86aab', // Projected Cooling Degree Days U.S. (RCP8.5)
  'd87f4864-3f50-40ad-8eed-ad3e73f04fbc', // Projected Cooling Degree Days U.S. (RCP4.5)
  // Frost Free Season
  '46116f8d-cf6c-4db3-aa36-0a6fa8e7b7d0', // Projected Change in Frost Free Season U.S. (RCP8.5)
  '42b11191-6b7e-4eb4-b608-b5989bd802e3', // Projected Change in Frost Free Season U.S. (RCP4.5)
  '9f6d6ca5-f903-4e97-9f73-71e0ed39a2b6', // Projected Frost Free Season U.S. (RCP8.5)
  '2000cebb-0f15-43c2-89ac-c7a5c699c0db', // Projected Frost Free Season U.S. (RCP4.5)
  // Extreme Heat Days
  '01b0d9a2-75a2-4b1b-bcb8-b395e0a5ef5b', // Projected Change in Extreme Heat Days U.S. (RCP8.5)
  'a8cf68f4-667e-4dd0-bf8b-70b82287e97e', // Projected Change in Extreme Heat Days U.S. (RCP4.5)
  'e9d04862-6126-4e54-b267-5ad7f02ec060', // Projected Extreme Heat Days U.S. (RCP8.5)
  '6de61326-dc21-4c56-824b-4b2037597675', // Projected Extreme Heat Days U.S. (RCP4.5)
  // Cumulative Precipitation
  '1d94a4e3-e40f-45cd-916e-d193ec4d2fa4', // Projected Change in Cumulative Precipitation U.S. (RCP8.5)
  '468f996d-30e0-4f81-809c-96b0358a9638', // Projected Change in Cumulative Precipitation U.S. (RCP4.5)
  '0bc76e06-2808-454d-85b1-3d6e5d1a3247', // Projected Cumulative Precipitation U.S. (RCP8.5)
  '9342b485-02e0-4f47-9684-02622d04b30d', // Projected Cumulative Precipitation U.S. (RCP4.5)
  // Dry Spells
  '7301c265-2be8-4397-bf10-d8aba880b47a', // Projected Change in Dry Spells U.S. (RCP8.5)
  '08c5b825-d050-4f79-b8e9-c2318c42500f', // Projected Change in Dry Spells U.S. (RCP4.5)
  '672a8209-db44-43aa-83ac-898f89cd3aff', // Projected Dry Spells U.S. (RCP8.5)
  '58702bbf-7517-4547-9aa9-bb2ddf9588d0', // Projected Dry Spells U.S. (RCP4.5)
  // Extreme Precipitation Days
  'b28a83ef-d014-415c-9cf5-294a570571b6', // Projected Change in Extreme Precipitation Days U.S. (RCP8.5)
  '3719aab2-1712-490f-bb87-a45acff862ea', // Projected Change in Extreme Precipitation Days U.S. (RCP4.5)
  '74241152-ea8f-4d0b-a7c5-ff123196e813', // Projected Extreme Precipitation Days U.S. (RCP8.5)
  '57742b07-5248-48a3-a0ff-d2de0331a5a3', // Projected Extreme Precipitation Days U.S. (RCP4.5)
];

export default CATEGORIES;
