export const coreDatasets = [{
  id: 0,
  title: 'Climate',
  description: 'How is climate changing?',
  subgroups: [{
    id: 10,
    title: 'Temperature',
    slug: [
      'temperature',
      'sea_surface_temperature'
    ],
    datasets: ['4b54dc0a-ed24-453f-8cd9-c35b5d57c2ce','38bd1ce3-a756-4e03-bae5-e1a48e1a8419','b1929cc4-2da0-4ea6-a5f3-5e14ae64dcae','ab400650-fb37-41ef-a74c-c865c9853ec9','9aa7d8bf-5319-4d40-8370-edf85f240a65','b61fca59-707c-47f8-875c-9ac19313d193', 'a37b7ce6-8d14-4e3d-a57b-963557ee9ef5', 'aaadd6c3-93ea-44bc-ba8b-7af3f40d39e1', '0a9501d7-e2f1-46ef-922d-c8f161cc8153', '4dbebe70-67a0-4bb5-ac63-88f325d8ca40']
  }, {
    id: 11,
    title: 'Precipitation',
    slug: [
      'precipitation'
    ],
    datasets: [
      '5addc140-14cb-4e42-a232-88cbafebd00f',
      'd491077d-4be9-48ed-8ba9-93e0b0d75d46',
      'eadf93a6-58e7-4482-89d6-c9832d270a87',
      'f5152f7b-757b-4e09-98d2-e244f547fec8'
    ]
  }, {
    id: 12,
    title: 'Extreme events',
    slug: [
      'flood',
      'landslide',
      'storm_surge',
      'wildfire',
      'heat_wave'
    ],
    datasets: [
      '9123b556-0020-42b4-93c2-a045dae1eff5',
      'c61a1792-3530-4204-a7d6-0a4aea961810',
      '2b89fe50-6795-426d-b357-df952b04294b',
      'df0aabe8-0ef2-4a81-bdba-c6fc6767fde9',
      'c36c3108-2581-4b68-852a-c929fc758001',
      'c53a195f-d5f0-4acc-b1be-b773420a6606',
      'ab160fb1-0590-4630-b815-5212ac1065e4',
      'ff97b9ed-d3b3-45a0-bb64-2b8b74cad26f',
      '08ff8183-48dc-457a-8924-bb4e7a87b8a8'
    ]
  }, {
    id: 13,
    title: 'Coastal risk',
    slug: [
      'coastal_erosion',
      'coastal_flooding',
      'sea_level'

    ],
    datasets: [
      'd1fd9ac1-b99f-4f5f-b9d8-d3f1f818321a',
      'b977ef21-8227-4248-84ca-e670fd8f75df',
      '8a1420eb-9c84-4be2-9f2d-559930bbe943',
      'b672af9f-a949-4398-b21f-6786315a5ab6',
      '61c88110-9a94-40bf-891b-f037be4a73fd',
      'a63c0b98-81b7-401a-a9e3-d370aa90660f'
    ]
  }]
}, {
  id: 1,
  title: 'Exposure',
  description: 'What could be affected?',
  subgroups: [{
    id: 20,
    title: 'People',
    slug: [
      'population',
      'displaced_people'
    ],
    datasets: [
      '048b2140-9d4b-433e-a2dd-8d4122eb157b',
      '141ef6ab-eed9-4081-8066-7be364a48af0',
      '595bcf6f-0343-4146-ba0d-c54b1c928510',
      'ba760eda-7ab8-46cd-89c1-70d22da7413d'
    ]
  }, {
    id: 21,
    title: 'Agriculture',
    slug: [
      'food_and_agriculture',
      'agriculture',
      'land_cover'
    ],
    datasets: [
      '7b144d42-dd27-4585-8dff-662942100a0b',
      'bbf2957f-55d2-4ed1-9f9d-d62de88005bb',
      '68009a7e-b81d-4fcb-bf90-a2cef3b6160a',
      'ddf88c85-3e2f-41fa-8ceb-a3633ffb0bfb',
      '9cb2c3bc-18af-413c-9f7e-95767b56430d',
      '49e16339-f2ad-4c99-9587-0cc18d70eba3'
    ]
  }, {
    id: 22,
    title: 'Infrastructure',
    slug: [
      'infrastructure'
    ],
    datasets: [
      'e0418eef-d5b0-4093-a56e-7a5711afb65a',
      '011a2a6a-3bd5-4a8a-9dda-57775db4e604',
      '54736d3a-7602-4eab-8b6f-be6250885d65',
      'a5f7b8a5-4506-4e73-8d82-527cb4e483de',
      '8c21d4b3-dba7-4935-8e3b-2db8dfa4e6d6',
      'c188cfb1-9156-41f1-a163-b05354ca9138'
    ]
  }]
}, {
  id: 2,
  title: 'Vulnerability',
  description: 'What makes us more or less vulnerable?',
  subgroups: [{
    id: 30,
    title: 'Socioeconomic',
    slug: [
      'economic'
    ],
    datasets: [
      'bb831262-98dd-4015-879e-1a00dbe76e61'
    ]
  }, {
    id: 31,
    title: 'Indices of vulnerability',
    slug: [
      'vulnerability'
    ],
    datasets: [
      'fa6443ff-eb95-4d0f-84d2-f0c91682efdf',
      'b6a3b58f-9620-45f6-80a2-1ad869ec107c',
      '4fa19d9c-8684-408e-9574-aafa86d1e179'
    ]
  }]
}];

export default {
  coreDatasets
};
