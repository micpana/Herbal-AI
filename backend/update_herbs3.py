import json

# Load the herbs data
with open('herbs.json', 'r') as f:
    herbs = json.load(f)

# Provided images dict
images = {
  "Nyamedua (Godâ€™s tree)": [],
  "Wiregrass (Paragis)": [],
  "Mango Leaves": [
    "https://pixabay.com/get/g30b19bc5f414befb8e4f086252214b930e9d81d796a7869e8b89157ba812c6945813280a7a672791a8e122859100891c_1920.jpg",
    "https://pixabay.com/get/ge361bee061de52144d24bc7737336808484c8877355639285d0c3302a40d1592b2583c57bcb0ab5af5dda8e5fde9d732_1920.jpg",
    "https://pixabay.com/get/g0abf87d8c1f8a522659b8168528e9dc9e27b9a3bdde5701e3e292af0f846f5fe97bab38bdf220651867ef792c0f7f2ea_1920.jpg"
  ],
  "Mast Tree": [],
  "Pawpaw Leaves": [
    "https://pixabay.com/get/g08c42e32ab2772721ee3de9d8ff5c83d1fb27e9c4f8275886cfcf84b0cbe26386223ad15f9df56801f46c965abbf3688_1920.jpg",
    "https://pixabay.com/get/gd0408c799572a1841122d7b0dd6492948f255d148afd8e17a7b43b882e4c84cd2b8a7bcfea7e054f999dc3898dbb0ed1_1920.jpg",
    "https://pixabay.com/get/g6afa2d69ad5a78135b6ae424b5e6647f2d7c677f570e8830cec1921907ce97119e8ec68d639129c1cacbac4b802033e4_1920.jpg"
  ],
  "Scent Leaves": [
    "https://pixabay.com/get/g2fbd5ddf58232b1813693478f7d7db64fca8576572985bcbd3e4c4d15d7f528b38c6ee1300fdab0b6361dd70d66db02a_1920.jpg",
    "https://pixabay.com/get/gb0bda4a120b963e4823248b9ea386e19215925acea493dcd7fec255704cc792d0c5d59d48f93d09e021419f74e8f57fe_1920.jpg",
    "https://pixabay.com/get/gc1d606e1bec08e4f57735b0521c1540b46a4bafa88bc752bf5bbe364826c78166852ca6609a9e02929a4d5ba1454e11e_1920.jpg"
  ],
  "Avocado Seeds": [
    "https://pixabay.com/get/gffa21d42d106d0ee70b024c9992bf86bfd187692cbca892c16e424f470d3784b233d499a792ab70207f7d7be0eeda820_1920.png",
    "https://pixabay.com/get/g5c8f05b46eba499facf291b86f87dbe03a173ec2770ac3865167f749cef6cf50abbb53821f06bc5d1666aae877e6deae_1920.png"
  ],
  "Moringa Seeds": [
    "https://pixabay.com/get/g5249ab1525394fb78d6250adfdbc31f4aaadd3953869ed8595c801150adca1486009ab62673a27b7f3c374beb38a9688_1920.jpg",
    "https://pixabay.com/get/gd6ccf7fd44d5a1790ffe6f61a77fffddd566c78f1189c28e849f21f215c1a5cc9095c39eb42f9bede8e62c5e566d47fa_1920.jpg"
  ],
  "Touch-Me-Not Herb": [
    "https://pixabay.com/get/ged85bebe6351242a7bee8aaaaf2a5c99bf7cddc4c089e97028ae57765811d7fe654451e5da37664e9728d6d46ba431c2_1920.jpg",
    "https://pixabay.com/get/gb79dbb1d1f2bcaf72fe9ac4ab5e1253e5cd3d5d343e2cda21d6704101c1d3bd16153189dc14347e12957ef79093e3aa4_1920.jpg"
  ],
  "Apple of Sodom": [],
  "Dandelion Leaves": [
    "https://pixabay.com/get/g3c4711d6ec0cbe3a3154088571ccf788df18acc8563740efe74ac7647a40c6313743cb61ec8801d84288fe6e8155870b_1920.jpg",
    "https://pixabay.com/get/gb0ecbe51071bc2e710901e73e0888aae70bf07d14a484249296c5acc821f50d22e6a0bf84533fdc9d08a0cd816d7f021_1920.jpg"
  ],
  "Baobab Fruit": [
    "https://pixabay.com/get/ge065b33f72df709e3b948d8560f97eaba05427f66a0856c70eb1345277503e3d636a6034c7966001067ee320d3ffcec1_1920.jpg",
    "https://pixabay.com/get/gd843bda4c7a767b80106b8f0425f5e6523ad9a3238414731cf2074c91e37c18c9909a0a2de47645d1d60cd41813d2e26_1920.png"
  ],
  "Crown of Thorns": [
    "https://pixabay.com/get/g213d7730cda4b0c674f52a0479bd44371ea2ea3eeaf5ab250381fa40fb9bf6575402a1d65a1cf7f3c1e94680f312b90e_1920.jpg",
    "https://pixabay.com/get/gd46e783acd7fdf44e42432be6a2991e34e68811bbcfc18d41d86e0aa5d402c42646dabd585cdad1d9753a8815170aad2_1920.jpg"
  ],
  "Indian Almond Plant": [
    "https://pixabay.com/get/gdaf595ad9d9e7e865893fd6a0f148b8b437930f5753ea9b9babf6abf2fe34637a3a18f12d3990d36161a214b31d8d525_1920.jpg",
    "https://pixabay.com/get/gd8b113f13d9d8d749e0f82dccd9b40836d3da451762463612c87acfea384eecd18478d8bc86088e8c9f17dabbdd2b83d_1920.jpg"
  ],
  "Snake Plant": [
    "https://pixabay.com/get/g037482f918e3c05a0a60147bbaa8515e1a773d493936b49edb26e560264ed2b4b75843dab8229672143c4378b4f3e3c6_1920.jpg",
    "https://pixabay.com/get/g9af4c321dd2c7f4e3bd1d9a0edda6273dffad1b8b1c3dd0ea1e843253bd0dbf16ee8bdd697576a2e2e990e1d869070f26_1920.jpg",
    "https://pixabay.com/get/gf3cd86946fa962e8e9ed0ffffd2c2aa36c6eeb9e9c17be87f4156e777d2c4bb1ff1a68e9444d1bfc1f8cd7dfdef0a77b_1920.jpg"
  ],
  "Jehovah Witness Blood Tonic Plant": [],
  "Castor Plant": [
    "https://pixabay.com/get/g95e9a8b22e9e98390e6c73f9c38a84c560999056ee857048f832b9c84c78ee89bbfbf8e52791bdbba5786a92a2f7ea45_1920.jpg",
    "https://pixabay.com/get/g0366bf79e733cea9165fab2c7d7652d16655115efee48e1c2d77de3ee10a8e717c024afe91d6027f55657316cb88c6ab_1920.jpg",
    "https://pixabay.com/get/g0681c6893ae55988ee0507aca0adf970e15250c341dc64a7978c57d9fbbd35017b8eb09da72ef8ee699c4adf8fd3bc5b_1920.jpg"
  ],
  "Guava Leaves": [],
  "Worm Grass": [],
  "Jungle Flame": [
    "https://pixabay.com/get/gf7699b341320ce49f23b34a706030b7c85b16ba7fba815484e25a9aeff40741a592707107e3bf2e31eb6fd69e2631e28_1920.jpg",
    "https://pixabay.com/get/g35dc8ffafb71dd38931c83079806c931bf9cdbb05f23b75be56bfcc0ec2bd3d2740ea4295217c85b169e21b3bc1b5d25_1920.jpg"
  ],
  "Ringworm Plant (Asunwon oyinbo / Osempe)": [],
  "Orange Leaves": [
    "https://pixabay.com/get/g457d19d41fbdfe0fce28585b1fd777fd3429542c892382dfd7c5b714e289e8dfe43f73a2cc0c905438c1cebacea685be_1920.jpg",
    "https://pixabay.com/get/gfcab9d1bf2fbf7d892d34d751a851364702d8e6f6aebbd69e2c98289fe956a12679f7e06950b8ed8410ca275b487fd86_1920.jpg",
    "https://pixabay.com/get/gc90c66817bad9f77998c7a30363ae37c766ec274f6e7f4339ccdb49cba2706493fea2ffcf5288826dfee78889529429c_1920.jpg"
  ],
  "Basil (Scent Leaf variant)": [
    "https://pixabay.com/get/g763cb0e7df8511233d979cdcbac4db6a526e53dacbd12080ef445aa564b18232af469487c2bdbabefa42cff8bec80a92_1920.jpg",
    "https://pixabay.com/get/g91af798d0280ad9c9e240988e467fab6c82373760d18b06a4ed8198ab9f6003080903d41212b9fc038f41a0fa4a9c5da_1920.jpg",
    "https://pixabay.com/get/g7dd4092d084ef4ffd24525899b5029f8f4459ae4a744387c6fa153a9d44178964cba8918d55abe651e54857bed11aa2f_1920.png"
  ],
  "Mango Stem Bark": [
    "https://pixabay.com/get/g66d51c8c227bc87a1b67163eefa448f1e2aba50a3c57d9cb030232c5e6b6740099340d91632fc80f8ecbebf42a458d15_1920.jpg",
    "https://pixabay.com/get/g7d0295666b2302471851024c81bd8c1b493654cf77a80c5a69aa4303b47a977cdac8413bb18c6b1402e269f876d6692b_1920.jpg",
    "https://pixabay.com/get/g0f42df4e53a9524953bccbd1d0b5c42a7147f8051b8145ce9e77324cfdbfce7c442c25129574d67e4a5f5882f020af00_1920.jpg"
  ]
}

# Update only if empty and has images
for herb in herbs:
    name = herb['name']
    if herb.get('images', '') == '' and name in images and images[name]:
        herb['images'] = ','.join(images[name])

# Save the updated data
with open('herbs.json', 'w') as f:
    json.dump(herbs, f, indent=2)

print("Updated herbs.json with additional images.")