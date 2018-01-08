export const coreDatasets = [{
  id: 0,
  title: 'Climate',
  description: 'How is climate changing?',
  subgroups: [
    {
      id: 0,
      title: 'Temperature',
      slug: [
        'temperature',
        'sea_surface_temperature'
      ],
      datasets: [
        '308f0bc1-ba4c-480e-ac11-1f261a208e2d',
        'c98806b9-2db0-4a94-90f1-71ef61d71656'
      ],
      subgroups: [{ id: 0, title: 'Heating degree days', slug: ['temperature', 'sea_surface_temperature'], datasets: ['0a9501d7-e2f1-46ef-922d-c8f161cc8153', '648650c1-01d8-44c5-bd36-ed0ce93c0351', '546bf818-0857-474f-892d-25bf7253f2e3', '57670934-4851-47fe-ad85-17e2b97f027f'] }, { id: 1, title: 'Cooling degree days', slug: ['temperature', 'sea_surface_temperature'], datasets: ['4dbebe70-67a0-4bb5-ac63-88f325d8ca40', '0b79aad3-7df6-4e38-be87-998b3d4cf62e', 'ae2b3597-1902-41fc-b0cb-fa1a0629303a', '24a64759-c823-41cd-902d-fcce00f7864d'] }, { id: 2, title: 'Average high temperature', slug: ['temperature', 'sea_surface_temperature'], datasets: ['b61fca59-707c-47f8-875c-9ac19313d193', '3cfc8e33-8778-40f8-a123-36d299dcaaab', 'a507f91c-801b-498b-a087-ab5c3e7498c7', 'e30b788f-08f0-48cd-a254-b26c0c022447'] }, { id: 3, title: 'Average temperature', slug: ['temperature', 'sea_surface_temperature'], datasets: ['a0a6d98f-3cce-4a9c-b07e-ba735d1d985b', '999fc1b8-e7aa-4e53-b291-8da47417acd1', 'f90f8d3d-72dc-4c89-b0b8-77cc89056a44', 'a8aaae69-47ec-4117-bdfb-841c64e62d36'] }, { id: 4, title: 'extreme heat days', slug: ['temperature', 'sea_surface_temperature'], datasets: ['df0aabe8-0ef2-4a81-bdba-c6fc6767fde9', '1f596326-e5e7-484a-9d1f-572d21b9924d', 'c4e7780c-2c47-4828-9c72-82240c9e37e9', '17d07d93-7b2a-4a1e-b285-3af903f6ee2d'] }, { id: 5, title: 'Frost free season', slug: ['temperature', 'sea_surface_temperature'], datasets: ['bbf2957f-55d2-4ed1-9f9d-d62de88005bb', '5c41493a-9ead-463e-b2b8-9a8bc419229b', '222e109f-5e1a-43b2-89ef-27ebc79931a1', 'f44d707e-7a1b-4dda-ade0-b51c0398f0ea'] }, { id: 6, title: 'Average low temperature', slug: ['temperature', 'sea_surface_temperature'], datasets: ['aaadd6c3-93ea-44bc-ba8b-7af3f40d39e1', 'efee89ae-584a-409f-b35e-7841d1ce9c5d', 'ffdf001f-b86c-4d60-8f2a-66d504d7bf39', 'e156293c-95a9-4f72-96b1-8313cd5d6073'] }]
    },
    {
      id: 1,
      title: 'Precipitation',
      slug: [
        'precipitation'
      ],
      datasets: [
        'd443beca-d199-4872-9d7d-d82c45e43151',
        'de274c78-2194-4f7c-83d4-1282c31ca2a9'
      ],
      subgroups: [{ id: 0, title: 'Cumulative precipitation', slug: ['precipitation'], datasets: ['eadf93a6-58e7-4482-89d6-c9832d270a87', 'c231e5fb-7bbc-4279-a21a-b7ff5679fafe', 'ce774800-be58-4ce9-a81a-e296dfe25ab3', '8fee450f-a625-4e15-8541-f84de6205b4e'] }, { id: 1, title: 'Dry spells periods', slug: ['precipitation'], datasets: ['f5152f7b-757b-4e09-98d2-e244f547fec8', '6d3dd62f-d3b8-440a-8cd2-c1087033b416', '659377ad-4014-4415-8e43-63357541c8e8', 'a92b3919-19f2-4431-8c0c-8ddc91ad0168'] }, { id: 2, title: 'Extreme precipitation days', slug: ['precipitation'], datasets: ['2b89fe50-6795-426d-b357-df952b04294b', '61f5e1e6-22d7-4fac-825b-d1df4d1ea841', '4ede1cfb-4c26-4f0d-8fa0-055a6f07426c', '6b158f1e-0794-465a-95a3-94019b6154ce'] }]
    },
    {
      id: 2,
      title: 'Extreme events',
      slug: [
        'flood',
        'landslide',
        'storm_surge'
      ],
      datasets: [
        '8c06d11b-0034-4bae-ba45-b037410c9ad5',
        'a63c0b98-81b7-401a-a9e3-d370aa90660f',
        '54c89136-6466-4e6e-bfcf-d4fe6a425037'
      ]
    },
    {
      id: 3,
      title: 'Coastal risk',
      slug: [
        'coastal_erosion',
        'coastal_flooding',
        'sea_level',
        'wildfire'
      ],
      datasets: [
        '8a1420eb-9c84-4be2-9f2d-559930bbe943',
        '61c88110-9a94-40bf-891b-f037be4a73fd',
        'ff97b9ed-d3b3-45a0-bb64-2b8b74cad26f'
      ]
    }
  ]
},
{
  id: 1,
  title: 'Exposure',
  description: 'What could be affected?',
  subgroups: [
    {
      id: 0,
      title: 'People',
      slug: [
        'population',
        'displaced_people'
      ],
      datasets: [
        '141ef6ab-eed9-4081-8066-7be364a48af0'
      ]
    },
    {
      id: 1,
      title: 'Built Environment',
      slug: [
        'coral_reef',
        'protected_area',
        'wetland',
        'glaciers'
      ],
      datasets: [
        '674fefee-a3f1-4749-8573-f6545fbbc631',
        '53c39c23-d970-4f29-ac9b-0f07803224e1',
        '7d68717f-a8e9-4bdc-952f-264e181427ca',
        '304663b2-78e5-4416-a117-86903dfc799f',
        'd3496d23-f6ee-4716-8b01-7f3860d7a5a8'
      ]
    },
    {
      id: 2,
      title: 'Agriculture',
      slug: [
        'food_and_agriculture',
        'agriculture',
        'land_cover'
      ],
      datasets: [
        'd982d86b-4b66-4443-8941-339cc4a650ca',
        '28dd2700-6de7-4345-830a-a5ffa0716bb2',
        '49e16339-f2ad-4c99-9587-0cc18d70eba3',
        '2034a766-6e8a-416d-b8ab-9b7b3e3abb15',
        'bc2c749d-49a0-46c0-9582-eb33946a983e'
      ]
    }
  ]
},
{
  id: 2,
  title: 'Vulnerability',
  description: 'What makes us more or less vulnerable?',
  subgroups: [
    {
      id: 0,
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
    },
    {
      id: 1,
      title: 'Infrastructure',
      slug: [
        'infrastructure'
      ],
      datasets: [
        '54736d3a-7602-4eab-8b6f-be6250885d65',
        '54736d3a-7602-4eab-8b6f-be6250885d65',
        'e0418eef-d5b0-4093-a56e-7a5711afb65a',
        '011a2a6a-3bd5-4a8a-9dda-57775db4e604',
        'f5f145fb-def9-4500-b1ae-fd44354fdad2',
        'c9287777-90f1-4563-aabd-44cd3ac3675a',
        '8c21d4b3-dba7-4935-8e3b-2db8dfa4e6d6',
        '3c040512-6f29-4ce2-9a22-e996566e6bdb',
        '098b33df-6871-4e53-a5ff-b56a7d989f9',
        '674fefee-a3f1-4749-8573-f6545fbbc631',
        'de452a4c-a55c-464d-9037-8c3e9fe48365'
      ]
    },
    {
      id: 2,
      title: 'Indices of vulnerability',
      slug: [
        'vulnerability'
      ],
      datasets: [
        '74476bce-0231-49ac-b070-9974d600d173',
        '4fa19d9c-8684-408e-9574-aafa86d1e179',
        'b672af9f-a949-4398-b21f-6786315a5ab6',
        '141ef6ab-eed9-4081-8066-7be364a48af0'
      ]
    }
  ]
}
];

export default { coreDatasets };
