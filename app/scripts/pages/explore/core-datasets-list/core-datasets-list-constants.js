export const coreDatasets = [{
  "id": 0,
  "title": "Climate",
  "description": "How is climate changing?",
  "subgroups": [{
      "id": 0,
      "title": "Temperature",
      "slug": ["temperature", "sea_surface_temperature"],
      "datasets": ['308f0bc1-ba4c-480e-ac11-1f261a208e2d', '999fc1b8-e7aa-4e53-b291-8da47417acd1', 'c98806b9-2db0-4a94-90f1-71ef61d71656']
    }, {
      "id": 1,
      "title": "Precipitation",
      "slug": ["precipitation"],
      "datasets": ['d443beca-d199-4872-9d7d-d82c45e43151', 'de274c78-2194-4f7c-83d4-1282c31ca2a9', 'eadf93a6-58e7-4482-89d6-c9832d270a87'],
    }, {
        "id": 2,
        "title": "Extreme events",
        "slug": ["flood", "landslide", "storm_surge"],
        "datasets": ["8c06d11b-0034-4bae-ba45-b037410c9ad5", "a63c0b98-81b7-401a-a9e3-d370aa90660f", "54c89136-6466-4e6e-bfcf-d4fe6a425037"]
      },
      {
        "id": 3,
        "title": "Coastal risk",
        "slug": ["coastal_erosion", "coastal_flooding", "sea_level", "wildfire"],
        "datasets": ["8a1420eb-9c84-4be2-9f2d-559930bbe943", "61c88110-9a94-40bf-891b-f037be4a73fd", "ff97b9ed-d3b3-45a0-bb64-2b8b74cad26f"]
      }]
  },
  {
    "id": 1,
    "title": "Exposure",
    "description": "What could be affected?",
    "subgroups": [{
      "id": 0,
      "title": "People",
      "slug": ["population", "displaced_people"],
      "datasets": ["141ef6ab-eed9-4081-8066-7be364a48af0"]
    }, {
      "id": 1,
      "title": "Built Environment",
      "slug": ["coral_reef", "protected_area", "wetland", "glaciers"],
      "datasets": ["674fefee-a3f1-4749-8573-f6545fbbc631", "53c39c23-d970-4f29-ac9b-0f07803224e1", "7d68717f-a8e9-4bdc-952f-264e181427ca", "304663b2-78e5-4416-a117-86903dfc799f", "d3496d23-f6ee-4716-8b01-7f3860d7a5a8"]
    }, {
      "id": 2,
      "title": "Agriculture",
      "slug": ["food_and_agriculture", "agriculture", "land_cover"],
      "datasets": ["d982d86b-4b66-4443-8941-339cc4a650ca", "28dd2700-6de7-4345-830a-a5ffa0716bb2", "49e16339-f2ad-4c99-9587-0cc18d70eba3", "2034a766-6e8a-416d-b8ab-9b7b3e3abb15", "bc2c749d-49a0-46c0-9582-eb33946a983e"]
    }]
  },
  {
    "id": 2,
    "title": "Vulnerability",
    "description": "What makes us more or less vulnerable?",
    "subgroups": [{
      "id": 0,
      "title": "Socioeconomic",
      "slug": ["economic"],
      "datasets": ["74476bce-0231-49ac-b070-9974d600d173", "4fa19d9c-8684-408e-9574-aafa86d1e179", "b672af9f-a949-4398-b21f-6786315a5ab6", "141ef6ab-eed9-4081-8066-7be364a48af0"]
    }, {
      "id": 1,
      "title": "Infrastructure",
      "slug": ["infrastructure"],
      "datasets": ["54736d3a-7602-4eab-8b6f-be6250885d65", "54736d3a-7602-4eab-8b6f-be6250885d65", "e0418eef-d5b0-4093-a56e-7a5711afb65a", "011a2a6a-3bd5-4a8a-9dda-57775db4e604", "f5f145fb-def9-4500-b1ae-fd44354fdad2", "c9287777-90f1-4563-aabd-44cd3ac3675a", "8c21d4b3-dba7-4935-8e3b-2db8dfa4e6d6", "3c040512-6f29-4ce2-9a22-e996566e6bdb", "098b33df-6871-4e53-a5ff-b56a7d989f9", "674fefee-a3f1-4749-8573-f6545fbbc631", "de452a4c-a55c-464d-9037-8c3e9fe48365"]
    }, {
      "id": 2,
      "title": "Indices of vulnerability",
      "slug": ["vulnerability"],
      "datasets": ["74476bce-0231-49ac-b070-9974d600d173", "4fa19d9c-8684-408e-9574-aafa86d1e179", "b672af9f-a949-4398-b21f-6786315a5ab6", "141ef6ab-eed9-4081-8066-7be364a48af0"]
    }]
  }];

export default { coreDatasets };
