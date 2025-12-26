import json

# Load the herbs data
with open('herbs.json', 'r') as f:
    herbs = json.load(f)

# Provided images dict from subagent
images = {
  "Nyamedua": [],
  "Jehovah Witness Blood Tonic Plant": [],
  "Dogonyaro": ["https://upload.wikimedia.org/wikipedia/commons/N/e/Nerium_oleander_flowers_leaves.jpg"],
  "Uda": ["https://upload.wikimedia.org/wikipedia/commons/F/e/Fenugreek_plant.jpg"],
  "Uziza": ["https://upload.wikimedia.org/wikipedia/commons/P/i/Piper_guineense_fruit.jpg"],
  "Utazi": ["https://upload.wikimedia.org/wikipedia/commons/G/o/Gongronema_latifolium.jpg"],
  "Curry Leaves": ["https://upload.wikimedia.org/wikipedia/commons/C/u/Curry_leaves.jpg"],
  "Clove Leaves": ["https://upload.wikimedia.org/wikipedia/commons/S/y/Syzygium_aromaticum_-_Köhler–s_Medizinal-Pflanzen-001.jpg"],
  "Bay Leaves": ["https://upload.wikimedia.org/wikipedia/commons/7/7a/Laurel_bay_leaves.jpg"],
  "Thyme": ["https://upload.wikimedia.org/wikipedia/commons/5/5e/Thymus_vulgaris_-_Köhler–s_Medizinal-Pflanzen-220.jpg"],
  "Rosemary": ["https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosemary_plant.jpg"],
  "Sage": ["https://upload.wikimedia.org/wikipedia/commons/8/8c/Salvia_officinalis_002.jpg"],
  "Oregano": ["https://upload.wikimedia.org/wikipedia/commons/6/6a/Oregano_-_Köhler–s_Medizinal-Pflanzen-221.jpg"],
  "Mint": ["https://upload.wikimedia.org/wikipedia/commons/0/0f/Mentha_spicata_002.jpg"],
  "Lavender": ["https://upload.wikimedia.org/wikipedia/commons/9/9d/Lavandula_angustifolia_002.jpg"],
  "Chamomile": ["https://upload.wikimedia.org/wikipedia/commons/9/9d/Chamomile_02.jpg"],
  "Lemon Balm": ["https://upload.wikimedia.org/wikipedia/commons/8/8e/Melissa_officinalis_002.jpg"],
  "Catnip": ["https://upload.wikimedia.org/wikipedia/commons/7/7e/Nepeta_cataria_001.jpg"],
  "Valerian": ["https://upload.wikimedia.org/wikipedia/commons/4/4e/Valeriana_officinalis_001.jpg"],
  "Passionflower": ["https://upload.wikimedia.org/wikipedia/commons/8/8b/Passiflora_edulis_fruit.jpg"],
  "Ringworm Plant": [],
  "Pencil Plant": ["https://upload.wikimedia.org/wikipedia/commons/P/e/Pencil_Cactus_(Euphorbia_tirucalli).jpg"],
  "Orange Leaves": [],
  "Neem Leaves": ["https://upload.wikimedia.org/wikipedia/commons/N/e/Neem_leaves_images.jpg"],
  "Bitter Leaf": ["https://upload.wikimedia.org/wikipedia/commons/B/i/Bitter_Leaf_Tree.jpg"],
  "Morinda (Noni)": ["https://upload.wikimedia.org/wikipedia/commons/N/o/Noni_fruit_(Morinda_citrifolia).jpg"],
  "Basil": [],
  "Eucalyptus": ["https://upload.wikimedia.org/wikipedia/commons/E/u/Eucalyptus_trees_in_Agioi_Apostoli._Crete,_Greece.jpg"],
  "Lemon Grass": ["https://upload.wikimedia.org/wikipedia/commons/B/u/Bumbu_Rawon.jpg"],
  "Blackjack Plant": ["https://upload.wikimedia.org/wikipedia/commons/B/i/Bidens_pilosa_02.JPG"],
  "Wild Dandelion": ["https://upload.wikimedia.org/wikipedia/commons/D/a/Dandelion_clock.jpg"],
  "Cock’s Comb Plant": ["https://upload.wikimedia.org/wikipedia/commons/C/e/Celosia_argentea--_the_Silver_Cock's_Comb_(29194480514).jpg"],
  "Bitter Leaves": ["https://upload.wikimedia.org/wikipedia/commons/B/i/Bitter_leaves_plant.jpg"],
  "Madagascar Plant": ["https://upload.wikimedia.org/wikipedia/commons/M/a/Madagascar_periwinkle_01178.jpg"],
  "Sacred Spiritual Plant": ["https://upload.wikimedia.org/wikipedia/commons/H/o/Holy_Basil_edit2.jpg"],
  "Bamboo Leaves": ["https://upload.wikimedia.org/wikipedia/commons/B/a/Bamboo_leaves,_the_natural_wrapping_material.jpg"],
  "Soursop Leaves": ["https://upload.wikimedia.org/wikipedia/commons/S/o/Soursop_leaves.jpg"],
  "Pawpaw Fruit": ["https://upload.wikimedia.org/wikipedia/commons/P/a/Pawpaw_(Asimina_triloba)_Tree_with_Fruit_at_Night.jpg"],
  "Aidan Fruit": ["https://upload.wikimedia.org/wikipedia/commons/T/e/Tetrapleura_tetraptera_MHNT.BOT.2017.10.22.jpg"],
  "Mango Stem Bark": []
}

# Mapping for exact names
name_mapping = {
    "Pencil Plant": "Pencil Plant",
    "Neem Leaves": "Neem Leaves",
    "Bitter Leaf": "Bitter Leaf",
    "Morinda (Noni)": "Morinda (Noni)",
    "Eucalyptus": "Eucalyptus",
    "Lemon Grass": "Lemon Grass",
    "Blackjack Plant": "Blackjack Plant",
    "Wild Dandelion": "Wild Dandelion",
    "Cockâ€™s Comb Plant": "Cock’s Comb Plant",
    "Bitter Leaves": "Bitter Leaves",
    "Madagascar Plant": "Madagascar Plant",
    "Sacred Spiritual Plant": "Sacred Spiritual Plant",
    "Bamboo Leaves": "Bamboo Leaves",
    "Soursop Leaves": "Soursop Leaves",
    "Pawpaw Fruit": "Pawpaw Fruit",
    "Aidan Fruit": "Aidan Fruit"
}

# Update only if empty and has images
for herb in herbs:
    name = herb['name']
    if herb.get('images', '') == '' and name in name_mapping:
        urls = images.get(name_mapping[name], [])
        if urls:
            herb['images'] = ','.join(urls)

# Save the updated data
with open('herbs.json', 'w') as f:
    json.dump(herbs, f, indent=2)

print("Updated herbs.json with additional images.")