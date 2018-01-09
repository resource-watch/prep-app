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
    datasets: [],
    subgroups: [{
      id: 100,
      title: 'Heating degree days',
      datasets: ['0a9501d7-e2f1-46ef-922d-c8f161cc8153', '648650c1-01d8-44c5-bd36-ed0ce93c0351', '546bf818-0857-474f-892d-25bf7253f2e3', '57670934-4851-47fe-ad85-17e2b97f027f']
    }, {
      id: 101,
      title: 'Cooling degree days',
      datasets: ['4dbebe70-67a0-4bb5-ac63-88f325d8ca40', '0b79aad3-7df6-4e38-be87-998b3d4cf62e', 'ae2b3597-1902-41fc-b0cb-fa1a0629303a', '24a64759-c823-41cd-902d-fcce00f7864d']
    }, {
      id: 102,
      title: 'Average high temperature',
      datasets: ['b61fca59-707c-47f8-875c-9ac19313d193', '3cfc8e33-8778-40f8-a123-36d299dcaaab', 'a507f91c-801b-498b-a087-ab5c3e7498c7', 'e30b788f-08f0-48cd-a254-b26c0c022447']
    }, {
      id: 103,
      title: 'Average temperature',
      datasets: ['a0a6d98f-3cce-4a9c-b07e-ba735d1d985b', '999fc1b8-e7aa-4e53-b291-8da47417acd1', 'f90f8d3d-72dc-4c89-b0b8-77cc89056a44', 'a8aaae69-47ec-4117-bdfb-841c64e62d36']
    }, {
      id: 104,
      title: 'Frost free season',
      datasets: ['bbf2957f-55d2-4ed1-9f9d-d62de88005bb', '5c41493a-9ead-463e-b2b8-9a8bc419229b', '222e109f-5e1a-43b2-89ef-27ebc79931a1', 'f44d707e-7a1b-4dda-ade0-b51c0398f0ea']
    }, {
      id: 105,
      title: 'Average low temperature',
      datasets: ['aaadd6c3-93ea-44bc-ba8b-7af3f40d39e1', 'efee89ae-584a-409f-b35e-7841d1ce9c5d', 'ffdf001f-b86c-4d60-8f2a-66d504d7bf39', 'e156293c-95a9-4f72-96b1-8313cd5d6073']
    }]
  }, {
    id: 11,
    title: 'Precipitation',
    slug: [
      'precipitation'
    ],
    datasets: [],
    subgroups: [{
      id: 110,
      title: 'Cumulative precipitation',
      datasets: ['eadf93a6-58e7-4482-89d6-c9832d270a87', 'c231e5fb-7bbc-4279-a21a-b7ff5679fafe', 'ce774800-be58-4ce9-a81a-e296dfe25ab3', '8fee450f-a625-4e15-8541-f84de6205b4e']
    }, {
      id: 111,
      title: 'Dry spells periods',
      datasets: ['f5152f7b-757b-4e09-98d2-e244f547fec8', '6d3dd62f-d3b8-440a-8cd2-c1087033b416', '659377ad-4014-4415-8e43-63357541c8e8', 'a92b3919-19f2-4431-8c0c-8ddc91ad0168']
    }]
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
      'c36c3108-2581-4b68-852a-c929fc758001',
      'c53a195f-d5f0-4acc-b1be-b773420a6606',
      'ab160fb1-0590-4630-b815-5212ac1065e4',
      'c36c3108-2581-4b68-852a-c929fc758001',
      'ff97b9ed-d3b3-45a0-bb64-2b8b74cad26f',
      '08ff8183-48dc-457a-8924-bb4e7a87b8a8'
    ],
    subgroups: [{
      id: 120,
      title: 'Extreme precipitation days',
      datasets: ['2b89fe50-6795-426d-b357-df952b04294b', '61f5e1e6-22d7-4fac-825b-d1df4d1ea841', '4ede1cfb-4c26-4f0d-8fa0-055a6f07426c', '6b158f1e-0794-465a-95a3-94019b6154ce']
    }, {
      id: 121,
      title: 'Extreme heat days',
      datasets: ['df0aabe8-0ef2-4a81-bdba-c6fc6767fde9', '1f596326-e5e7-484a-9d1f-572d21b9924d', 'c4e7780c-2c47-4828-9c72-82240c9e37e9', '17d07d93-7b2a-4a1e-b285-3af903f6ee2d']
    }]
  }, {
    id: 13,
    title: 'Coastal risk',
    slug: [
      'coastal_erosion',
      'coastal_flooding',
      'sea_level'

    ],
    datasets: [
      'b977ef21-8227-4248-84ca-e670fd8f75df',
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
      '141ef6ab-eed9-4081-8066-7be364a48af0',
      '595bcf6f-0343-4146-ba0d-c54b1c928510',
      '141ef6ab-eed9-4081-8066-7be364a48af0',
      '595bcf6f-0343-4146-ba0d-c54b1c928510'
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
      '68009a7e-b81d-4fcb-bf90-a2cef3b6160a',
      '9cb2c3bc-18af-413c-9f7e-95767b56430d',
      '49e16339-f2ad-4c99-9587-0cc18d70eba3'
    ]
  }, {
    id: 22,
    title: 'Infraestructure',
    slug: [
      'infraestructure'
    ],
    datasets: [
      'e0418eef-d5b0-4093-a56e-7a5711afb65a',
      '011a2a6a-3bd5-4a8a-9dda-57775db4e604',
      '54736d3a-7602-4eab-8b6f-be6250885d65',
      '3c040512-6f29-4ce2-9a22-e996566e6bdb',
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
      '74476bce-0231-49ac-b070-9974d600d173',
      '4fa19d9c-8684-408e-9574-aafa86d1e179',
      'b672af9f-a949-4398-b21f-6786315a5ab6',
      '141ef6ab-eed9-4081-8066-7be364a48af0'
    ]
  }, {
    id: 31,
    title: 'Socioeconomic',
    slug: [
      'economic'
    ],
    datasets: [
      'bb831262-98dd-4015-879e-1a00dbe76e61'
    ]
  }, {
    id: 32,
    title: 'Indices of vulnerability',
    slug: [
      'vulnerability'
    ],
    datasets: [
      'b6a3b58f-9620-45f6-80a2-1ad869ec107c',
      '4fa19d9c-8684-408e-9574-aafa86d1e179'
    ]
  }]
}];

export default { coreDatasets };
