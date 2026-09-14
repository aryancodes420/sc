/* Catwalk Club — catalogue.
   Prices in GBP. Placeholder pricing: replace with landed cost + margin before trading. */

const SIZE_SETS = {
  full:       ["XS", "S", "M", "L"],
  twoWay:     ["S/M", "L"],
  oneSize:    ["One size"],
  adjustable: ["Adjustable"]
};

const PRODUCTS = [
  /* ---------- Holiday & seasonal ---------- */
  {
    id: "pumpkin-hat", name: "Pumpkin Hat", price: 9.99, cat: "holiday",
    motif: "pumpkin", sizes: SIZE_SETS.oneSize, badge: "Halloween",
    blurb: "A soft little pumpkin that sits between the ears on a chin strap.",
    fit: "Sits on top of the head. Adjustable strap.", care: "Spot clean only. Do not machine wash.", materials: "Brushed polyester felt, cotton lining",
    details: [
      "Elasticated chin strap with a breakaway clasp",
      "Brushed felt outer, cotton lining",
      "Ears stay completely free"
    ]
  },
  {
    id: "bat-wings", name: "Bat Wings Harness", price: 12.99, cat: "holiday",
    motif: "bat", sizes: SIZE_SETS.full, badge: "Halloween",
    blurb: "Wings on an adjustable harness, so nothing pulls on the neck.",
    fit: "Loose fit over the shoulders. No stretch.", care: "Machine wash 30°C. Hang dry.", materials: "Polyester wing panels, nylon webbing straps",
    details: [
      "Adjustable chest and belly straps",
      "Wings are stitched flat — no wire",
      "Legs and shoulders unrestricted"
    ]
  },
  {
    id: "santa-set", name: "Santa Hat & Cape Set", price: 14.99, cat: "holiday",
    motif: "santa", sizes: SIZE_SETS.full, badge: "Christmas",
    blurb: "The full Father Christmas, in two pieces you can use separately.",
    fit: "Relaxed fit. Slight stretch in the cape.", care: "Machine wash 30°C. Hang dry. Do not bleach.", materials: "Polyester plush, cotton-blend trim",
    details: [
      "Hat and cape sold together, wearable apart",
      "Velcro cape fastening that pulls free under pressure",
      "Machine washable at 30°C"
    ]
  },
  {
    id: "antlers", name: "Reindeer Antlers", price: 9.99, cat: "holiday",
    motif: "antlers", sizes: SIZE_SETS.oneSize, badge: "Christmas",
    blurb: "Squashy fabric antlers. No hard plastic anywhere near the head.",
    fit: "Sits between the ears. Adjustable strap.", care: "Spot clean only.", materials: "Foam-filled polyester",
    details: [
      "Foam-filled fabric antlers",
      "Elasticated strap, breakaway clasp",
      "Weighs under 30g"
    ]
  },
  {
    id: "birthday-set", name: "Birthday Hat + Bandana Set", price: 8.99, cat: "holiday",
    motif: "party", sizes: SIZE_SETS.oneSize, badge: "Gift",
    blurb: "A cone hat and matching bandana for the annual photo nobody regrets.",
    fit: "Hat adjusts; bandana ties to fit.", care: "Bandana: machine wash 30°C. Hat: spot clean.", materials: "Cotton bandana, card-free fabric cone",
    details: [
      "Two pieces, one price",
      "Bandana ties — no collar needed",
      "Reusable, not paper"
    ]
  },

  /* ---------- Cute & everyday ---------- */
  {
    id: "knit-jumper", name: "Knitted Jumper", price: 16.99, cat: "everyday",
    motif: "jumper", sizes: SIZE_SETS.full, badge: "Bestseller",
    blurb: "A proper little jumper for cats who feel the cold.",
    fit: "Close fit with stretch. Size up if between sizes.", care: "Machine wash 30°C. Hang dry. Do not tumble dry.", materials: "60% acrylic, 40% cotton knit",
    details: [
      "Soft acrylic-cotton knit, no itch",
      "Wide neck opening, stretchy ribbed cuffs",
      "Cut short at the belly to keep litter trips easy"
    ]
  },
  {
    id: "bandana-2pack", name: "Reversible Bandana (2-pack)", price: 11.99, cat: "everyday",
    motif: "bandana", sizes: SIZE_SETS.twoWay,
    blurb: "Four looks in two bandanas — each one is a different print per side.",
    fit: "Ties to fit — no sizing needed.", care: "Machine wash 40°C. Tumble dry low.", materials: "100% cotton, double-sided print",
    details: [
      "100% cotton, double-sided prints",
      "Ties to fit, so no sizing guesswork",
      "Washes without fading"
    ]
  },
  {
    id: "bow-tie", name: "Bow Tie Collar", price: 8.99, cat: "everyday",
    motif: "bowtie", sizes: SIZE_SETS.adjustable,
    blurb: "A smart bow on a safety collar that releases under pressure.",
    fit: "Adjustable 20–30cm. Breakaway buckle.", care: "Spot clean. Bow detaches for washing.", materials: "Polyester bow, nylon collar webbing",
    details: [
      "Breakaway safety buckle",
      "Bow detaches from the collar",
      "Adjustable 20–30cm"
    ]
  },
  {
    id: "tiny-hoodie", name: "Tiny Hoodie", price: 18.99, cat: "everyday",
    motif: "hoodie", sizes: SIZE_SETS.full,
    blurb: "A hoodie that actually fits a cat's shape, hood optional.",
    fit: "Relaxed fit with stretch. Harness slot at the back.", care: "Machine wash 30°C. Hang dry.", materials: "Brushed cotton-blend fleece",
    details: [
      "Brushed fleece inner",
      "Hood sits back off the ears when down",
      "Harness slot at the back"
    ]
  },
  {
    id: "flower-collar", name: "Flower Collar", price: 9.99, cat: "everyday",
    motif: "flower", sizes: SIZE_SETS.adjustable,
    blurb: "A ring of soft fabric petals. Deeply undignified. Very photogenic.",
    fit: "Adjustable 20–30cm. Breakaway buckle.", care: "Hand wash cold. Reshape petals damp.", materials: "Polyester petals, nylon webbing",
    details: [
      "Fabric petals, no wire or plastic",
      "Breakaway safety buckle",
      "Adjustable 20–30cm"
    ]
  },

  /* ---------- Novelty & funny ---------- */
  {
    id: "lion-mane", name: "Lion Mane", price: 11.99, cat: "novelty",
    motif: "mane", sizes: SIZE_SETS.twoWay, badge: "Bestseller",
    blurb: "The classic. Slips over the head in one motion and comes off just as fast.",
    fit: "Stretch ring, pulls on. Very forgiving fit.", care: "Hand wash cold. Air dry flat.", materials: "Polyester faux fur on elastic band",
    details: [
      "Stretch fabric ring, pulls on and off",
      "Ears and eyes stay clear",
      "Two sizes, both adjustable"
    ]
  },
  {
    id: "dino-hoodie", name: "Dinosaur Hoodie", price: 16.99, cat: "novelty",
    motif: "dino", sizes: SIZE_SETS.full,
    blurb: "Soft spines down the back, hood with little dinosaur eyes.",
    fit: "Relaxed fit. Hood folds back.", care: "Machine wash 30°C. Hang dry.", materials: "Polyester fleece, stitched fabric spines",
    details: [
      "Fleece body with stitched fabric spines",
      "Hood pushes back without removing the costume",
      "Machine washable at 30°C"
    ]
  },
  {
    id: "shark", name: "Shark Costume", price: 15.99, cat: "novelty",
    motif: "shark", sizes: SIZE_SETS.full,
    blurb: "Your cat, but a shark. The fin stands up on its own.",
    fit: "Loose fit, open belly. Adjustable side straps.", care: "Machine wash 30°C. Hang dry. Fin holds shape.", materials: "Polyester fleece, padded fin",
    details: [
      "Padded fin holds its shape",
      "Open belly, adjustable side straps",
      "Face completely uncovered"
    ]
  },
  {
    id: "cape", name: "Superhero Cape", price: 10.99, cat: "novelty",
    motif: "cape", sizes: SIZE_SETS.oneSize,
    blurb: "One cape, endless nonsense. Fastens at the chest, not the throat.",
    fit: "One size. Chest fastening, not neck.", care: "Machine wash 30°C. Cool iron if needed.", materials: "Lightweight polyester satin",
    details: [
      "Chest fastening with breakaway velcro",
      "Lightweight satin, 22cm drop",
      "Comes off in one pull"
    ]
  },

  /* ---------- Bundles ---------- */
  {
    id: "halloween-kit", name: "Halloween Kit", price: 27.99, was: 34.97,
    cat: "bundle", motif: "pumpkin", sizes: SIZE_SETS.full, badge: "Save £6.98",
    blurb: "Pumpkin hat, bat wings and a reversible bandana — the whole night sorted.",
    fit: "Mixed — see each item. Sized by the harness.", care: "Wash per item. Hat is spot clean only.", materials: "See individual products",
    details: [
      "Pumpkin Hat (£9.99)",
      "Bat Wings Harness (£12.99)",
      "Reversible Bandana 2-pack (£11.99)",
      "Ships as one parcel"
    ],
    contains: ["pumpkin-hat", "bat-wings", "bandana-2pack"]
  },
  {
    id: "first-costume-kit", name: "First Costume Kit", price: 17.99, was: 20.98,
    cat: "bundle", motif: "bowtie", sizes: SIZE_SETS.twoWay, badge: "Save £2.99",
    blurb: "The gentle way in: two bandanas and a bow tie, nothing that goes over the head.",
    fit: "Both pieces tie or adjust. No sizing needed.", care: "Machine wash 30°C.", materials: "Cotton bandanas, polyester bow",
    details: [
      "Reversible Bandana 2-pack (£11.99)",
      "Bow Tie Collar (£8.99)",
      "Best starting point for a cat that's never worn anything"
    ],
    contains: ["bandana-2pack", "bow-tie"]
  }
];

const CATEGORIES = [
  { id: "holiday",  label: "Holiday & seasonal", note: "Halloween, Christmas, birthdays" },
  { id: "everyday", label: "Cute & everyday",    note: "Bandanas, collars, knitwear" },
  { id: "novelty",  label: "Novelty & funny",    note: "Manes, dinos, capes" },
  { id: "bundle",   label: "Bundles",            note: "Cheaper together, genuinely" }
];

/* Fit data — chest girth is the measurement that decides fit. */
/* Four measurements in cm and inches. Competitors publish neck/chest/waist/back in both
   units; anything less pushes the sizing guesswork back onto the customer. */
const SIZE_CHART = [
  { size: "XS", neck: [18,22], chest: [28,33], waist: [26,31], back: 20, who: "Kittens, small adults (2–3kg)",  min: 28, max: 33 },
  { size: "S",  neck: [22,26], chest: [33,38], waist: [31,36], back: 25, who: "Average adult (3–4kg)",          min: 33, max: 38 },
  { size: "M",  neck: [26,30], chest: [38,43], waist: [36,41], back: 30, who: "Large adult (4–5.5kg)",          min: 38, max: 43 },
  { size: "L",  neck: [30,34], chest: [43,50], waist: [41,48], back: 35, who: "Maine Coon, Ragdoll (5.5–7kg)",  min: 43, max: 50 }
];

/* Breed shortcuts — a faster path than finding a tape measure. Ranges are typical
   adult chest girth; they are a starting point, not a substitute for measuring. */
const BREED_PRESETS = [
  { name: "Kitten (4–6 months)", chest: 30 },
  { name: "Average moggy",       chest: 36 },
  { name: "British Shorthair",   chest: 41 },
  { name: "Ragdoll",             chest: 45 },
  { name: "Maine Coon",          chest: 47 },
  { name: "Sphynx",              chest: 34 },
  { name: "Siamese / Bengal",    chest: 35 }
];

const FREE_SHIPPING_AT = 30;
