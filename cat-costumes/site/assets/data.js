/* Catwalk Club — catalogue.
   Every `specs` bullet and every size figure below was read from the supplier listing's
   own title or its product photos (size-chart images). Nothing is invented. Anything only
   the listing page can confirm is under `confirm` — it is never shown to customers.

   `sizes` is present only where the listing sells sizes; the value is what the customer
   picks. `price` is what is charged now (launch-offer prices, set 18 Sep 2026 against UK
   competitor anchors, see ../sourcing.md); `list` is the regular price shown crossed out while
   SALE.active is true, and the figure to move `price` to when the offer ends.
   `source` is the supplier record and is never rendered. Items with `hold: true` are not shown. */

const PRODUCTS = [
  /* ---------- Everyday ---------- */
  {
    id: "bow-tie-collar", name: "Bow Tie Collar", price: 8.99, list: 10.99, alias: "Reginald", cat: "everyday",
    badge: "Bestseller", motif: "bowtie",
    images: ["bow-tie-1.webp","bow-tie-2.webp","bow-tie-3.webp","bow-tie-4.webp","bow-tie-5.webp","bow-tie-6.webp"],
    blurb: "A plaid bow tie on a proper safety collar — breakaway buckle, bell, and an elastic adjustable strap.",
    ticks: ["Breakaway buckle releases under pressure", "Elastic strap adjusts to most adult cats", "Bell and plaid bow — on in seconds"],
    forMeIf: ["Your cat has never worn anything before", "You want something that stays on all day, not just for a photo", "You'd rather adjust a strap than pick a size"],
    fit: "Adjustable elastic strap. Fits most adult cats.",
    sizes: null,
    specs: [
      "Breakaway safety buckle — releases under pressure",
      "Plaid bow tie with bell",
      "Elastic, adjustable neck strap",
      "Available in a range of plaid colourways (red, blue, green, pink, white and more)",
      "Made for cats and small dogs"
    ],
    box: ["1 × collar with bow tie and bell"],
    care: "Spot clean. Wipe the buckle; do not machine wash.",
    confirm: ["Exact adjustable neck range (cm)", "Which plaid colourways to stock"],
    source: { platform: "AliExpress", id: "3256803258255247", cost: 1.09, sold: "5,000+", rating: 4.8, choice: true }
  },
  {
    id: "bandana", name: "Bandana Collar", price: 7.99, list: 9.49, alias: "Roadie", cat: "everyday",
    badge: "UK stock", motif: "bandana", noDeliveryDates: true,
    images: ["bandana-1.webp","bandana-2.webp","bandana-3.webp","bandana-4.webp","bandana-5.webp","bandana-6.webp"],
    blurb: "A paisley bandana mounted on a buckle collar — no tying, just clip it on. Dispatched from UK stock.",
    ticks: ["Clips on with a buckle — no tying", "Dispatched from UK stock", "Machine washable"],
    forMeIf: ["Your cat tolerates a collar but not a hat", "You want a wash-and-wear everyday look", "You'd rather clip on than tie on"],
    fit: "Buckle collar with three sizes. Size S suits most cats.",
    sizes: [
      { label: "S", neck: "24–40cm", note: "Most cats" },
      { label: "M", neck: "29–45cm", note: "Large cats, small dogs" },
      { label: "L", neck: "33–55cm", note: "Small–medium dogs" }
    ],
    specs: [
      "Bandana fixed to an adjustable buckle collar",
      "Paisley print — pink, red, blue or black",
      "Washable",
      "Dispatched from UK stock",
      "Made for cats and small dogs"
    ],
    box: ["1 × bandana collar"],
    care: "Machine wash cool inside a wash bag. Hang dry.",
    confirm: ["Whether the buckle is a breakaway type — listing photos show a standard side-release buckle", "Listing photos are of dogs; consider a cat-specific bandana later"],
    source: { platform: "AliExpress (UK warehouse)", id: "3256809426900401", cost: 2.37, sold: "1,000+", rating: 4.7, choice: true }
  },

  /* ---------- Halloween ---------- */
  {
    id: "lion-mane", name: "Lion Mane", price: 9.99, list: 11.99, alias: "Kingsley", cat: "halloween",
    badge: "Bestseller", motif: "mane",
    images: ["lion-mane-1.webp","lion-mane-2.webp","lion-mane-3.webp","lion-mane-4.webp","lion-mane-5.webp","lion-mane-6.webp"],
    blurb: "The classic. A full faux-fur mane with little round ears that turns any cat into the king of the living room.",
    ticks: ["Full faux-fur mane with round ears", "Velcro under the chin — on in one go", "Face, eyes and mouth stay clear"],
    forMeIf: ["You want the photo that gets the most likes", "Your cat already wears a collar happily", "You've measured the neck (S 28cm · M 32cm · L 38cm)"],
    fit: "Three sizes, fastened with velcro under the chin. Measure the neck.",
    sizes: [
      { label: "S", neck: "28cm / 11in",   note: "Cap 24cm" },
      { label: "M", neck: "32cm / 12.6in", note: "Cap 26cm" },
      { label: "L", neck: "38cm / 15in",   note: "Cap 30cm" }
    ],
    specs: [
      "Full lion mane with round ears",
      "Faux fur (imitation hair) — no real fur",
      "Velcro fastening",
      "Face, eyes and mouth stay completely clear",
      "Made for cats and small dogs; for Halloween, Christmas and parties"
    ],
    box: ["1 × lion mane"],
    care: "Hand wash cold. Air dry flat. Do not tumble dry.",
    confirm: ["Colour options (listing shows a natural tan)"],
    source: { platform: "AliExpress", id: "3256805876802123", cost: 4.20, sold: "700+", rating: 4.6, choice: true }
  },
  {
    id: "bat-cape", name: "Devil Bat Cape", price: 12.99, list: 15.49, alias: "Vlad", cat: "halloween",
    badge: "Halloween", motif: "cape",
    images: ["bat-cape-5.webp","bat-cape-4.webp","bat-cape-3.webp","bat-cape-2.webp","bat-cape-1.webp","bat-cape-6.webp"],
    blurb: "A red-and-black satin cape with bat wings, a bow at the collar, and a little devil-horn hood to match.",
    ticks: ["Double-layer satin, soft against the fur", "Cape plus a matching devil-horn hood", "Adjustable at the neck"],
    forMeIf: ["Your cat wears a collar but not something over the body", "You want two looks — cape alone, or cape and hood", "Halloween photos are the goal"],
    fit: "Three sizes. Adjustable at the neck.",
    sizes: [
      { label: "S", neck: "approx. 29cm", note: "Length approx. 30cm" },
      { label: "M", neck: "approx. 33cm", note: "Length approx. 40cm" },
      { label: "L", neck: "approx. 40cm", note: "Length approx. 42cm" }
    ],
    specs: [
      "Double-layer satin — soft against the skin",
      "Red-winged bat cape with devil-theme trim",
      "Matching devil-horn hood included",
      "Bow tie at the collar",
      "Adjustable neck fastening; wear-resistant fabric"
    ],
    box: ["1 × winged cape", "1 × devil-horn hood"],
    care: "Hand wash cold. Hang dry. Cool iron on the reverse if needed.",
    confirm: ["Size-chart figures were read from a small photo — confirm S/M/L length, width and neck on the listing before printing them"],
    source: { platform: "AliExpress", id: "3256812487071410", cost: 4.54, sold: "1,000+", rating: 4.6, choice: true }
  },
  {
    id: "spider-costume", name: "Spider Costume", price: 12.99, list: 15.49, alias: "Boris", cat: "halloween",
    badge: "Halloween", motif: "bat",
    images: ["spider-1.webp","spider-2.webp","spider-3.webp","spider-4.webp","spider-5.webp","spider-6.webp"],
    blurb: "Eight furry legs on a soft felt body that fastens under the chest. The costume that gets the most double-takes at the door.",
    ticks: ["Eight plush legs — nothing rigid", "Soft felt body, velcro under the chest", "The one that gets double-takes at the door"],
    forMeIf: ["Your cat is relaxed about a harness or jumper", "You've measured neck and chest", "You want the full costume, not just a hat"],
    fit: "Two sizes, velcro fastening. Measure the neck and chest.",
    sizes: [
      { label: "S", neck: "20–32cm", note: "Chest 32–42cm — most cats" },
      { label: "M", neck: "30–40cm", note: "Chest 40–55cm — large cats, small dogs" }
    ],
    specs: [
      "Eight plush spider legs — soft, nothing rigid",
      "3mm felt body",
      "Velcro fastening",
      "Made for cats and small–medium dogs",
      "NONOR brand"
    ],
    box: ["1 × spider costume"],
    care: "Spot clean. Do not machine wash.",
    confirm: [],
    source: { platform: "AliExpress", id: "3256805889809397", cost: 4.93, sold: "500+", rating: 4.6, choice: true }
  },
  {
    id: "pumpkin-set", name: "Pumpkin Hat & Ruffle Collar", price: 11.99, list: 14.49, alias: "Pip", cat: "halloween",
    badge: "Halloween", motif: "pumpkin",
    images: ["pumpkin-1.webp","pumpkin-2.webp","pumpkin-3.webp","pumpkin-4.webp","pumpkin-5.webp","pumpkin-6.webp"],
    blurb: "A witch-style pumpkin hat on a chin strap, with a matching orange tulle ruffle collar. The most-searched cat costume there is, as a two-piece set.",
    ticks: ["Hat plus a matching tulle ruffle collar", "Adjustable chin strap, one-size collar", "Ears stay free"],
    forMeIf: ["You want the pumpkin look everyone searches for", "You'd rather not pick a size", "Your cat will sit for a hat for a minute or two"],
    fit: "One size. Hat on an adjustable chin strap; collar fits necks 25–40cm.",
    sizes: null,
    specs: [
      "Two-piece set — pumpkin hat and tulle ruffle collar",
      "Hat approx. 15cm wide × 12cm tall, with adjustable chin strap",
      "Ruffle collar fits neck 25–40cm; ruffle approx. 10cm deep",
      "Ears stay free",
      "Made for cats and small dogs"
    ],
    box: ["1 × pumpkin hat", "1 × ruffle collar"],
    care: "Spot clean the hat. Hand wash the collar cold; do not wring.",
    confirm: ["The same listing offers a Christmas-tree hat with red/green ruffle — a candidate for the Christmas slot"],
    source: { platform: "AliExpress", id: "3256807081347725", cost: 6.48, sold: "77", rating: 4.6, choice: true }
  },

  /* ---------- Christmas ---------- */
  {
    id: "santa-set", name: "Santa Hat & Scarf Set", price: 17.99, list: 21.49, alias: "Nick", cat: "christmas",
    badge: "Christmas", motif: "santa",
    images: ["santa-1.webp","santa-2.webp","santa-3.webp","santa-4.webp","santa-5.webp","santa-6.webp"],
    blurb: "A proper cat-sized Santa hat with a matching scarf — soft polycotton, white trim, and velcro so it goes on in seconds.",
    ticks: ["Cat-sized Santa hat and matching scarf", "Velcro on both pieces — on in seconds", "Soft polycotton with plush white trim"],
    forMeIf: ["The Christmas card photo is the goal", "You want one size that just fits", "Your cat is fine with a hat for a short while"],
    fit: "Adjustable velcro on both pieces. One size, made for cats and small dogs.",
    sizes: null,
    specs: [
      "Two-piece set — Santa hat and scarf",
      "Soft polycotton fabric with plush white trim",
      "Adjustable velcro fastening on hat and scarf",
      "Made for cats and small dogs",
      "Photographed on cats — sized for a cat's head"
    ],
    box: ["1 × Santa hat", "1 × scarf"],
    care: "Hand wash cold. Reshape and air dry. Do not tumble dry.",
    confirm: ["Hat and scarf dimensions (cm)"],
    source: { platform: "AliExpress", id: "3256809759699003", cost: 10.73, sold: "106", rating: 4.7, choice: true }
  },

  /* ---------- Bundles (draw on component stock) ---------- */
  {
    id: "halloween-pair", name: "Halloween Pair", price: 23.99, list: 28.99, cat: "bundle",
    badge: "Save £1.99", motif: "cape", contains: ["bat-cape", "spider-costume"],
    images: ["bat-cape-5.webp","spider-1.webp","bat-cape-2.webp","spider-2.webp"],
    blurb: "Devil Bat Cape and Spider Costume together — two looks for the one night that matters.",
    ticks: ["Two costumes, one parcel", "Saves £1.99 against buying separately", "Pick one size for both"],
    forMeIf: ["You want a choice of looks on the night", "You're dressing two cats", "You'd rather order once"],
    fit: "Pick one size for both. S suits most cats.",
    sizes: [ { label: "S", neck: "cape ~29cm · spider 20–32cm", note: "Most cats" }, { label: "M", neck: "cape ~33cm · spider 30–40cm", note: "Large cats" } ],
    specs: ["Devil Bat Cape (£12.99)", "Spider Costume (£12.99)", "Ships as one parcel"],
    box: ["1 × Devil Bat Cape with hood", "1 × Spider Costume"],
    care: "See each product.", confirm: [], source: null
  },
  {
    id: "pumpkin-patch", name: "Pumpkin Patch", price: 18.99, list: 23.49, cat: "bundle",
    badge: "Save £1.99", motif: "pumpkin", contains: ["pumpkin-set", "bow-tie-collar"],
    images: ["pumpkin-1.webp","bow-tie-1.webp","pumpkin-6.webp","bow-tie-4.webp"],
    blurb: "The #1 searched cat costume plus the bestselling collar.",
    ticks: ["Pumpkin set plus the bestselling collar", "Saves £1.99 against buying separately", "Nothing to size"],
    forMeIf: ["You want a Halloween look and an everyday one", "It's a first costume and a first collar", "You'd rather not pick a size"],
    fit: "Both one size / adjustable.", sizes: null,
    specs: ["Pumpkin Hat & Ruffle Collar (£11.99)", "Bow Tie Collar (£8.99)", "Ships as one parcel"],
    box: ["1 × Pumpkin Hat & Ruffle Collar", "1 × Bow Tie Collar"],
    care: "See each product.", confirm: [], source: null
  },
  {
    id: "first-costume-kit", name: "First Costume Kit", price: 14.99, list: 18.49, cat: "bundle",
    badge: "Save £1.99", motif: "bowtie", contains: ["bow-tie-collar", "bandana"],
    images: ["bow-tie-1.webp","bandana-2.webp","bow-tie-3.webp","bandana-1.webp"],
    blurb: "The easiest place to start: a bow tie collar and a bandana collar — nothing goes over the head.",
    ticks: ["Two collars — nothing goes over the head", "Saves £1.99 against buying separately", "Bow tie adjusts; pick the bandana size"],
    forMeIf: ["Your cat has never worn anything", "You want the gentlest possible start", "You're buying for a kitten"],
    fit: "Bow tie adjusts; pick the bandana size. S suits most cats.",
    sizes: [ { label: "S", neck: "24–40cm", note: "Most cats" }, { label: "M", neck: "29–45cm", note: "Large cats" }, { label: "L", neck: "33–55cm", note: "Small dogs" } ],
    specs: ["Bow Tie Collar (£8.99)", "Bandana Collar (£7.99)", "Ships as one parcel"],
    box: ["1 × Bow Tie Collar", "1 × Bandana Collar"],
    care: "See each product.", confirm: [], source: null
  },
  {
    id: "festive-pair", name: "Festive Pair", price: 24.99, list: 30.49, cat: "bundle",
    badge: "Save £1.99", motif: "santa", contains: ["santa-set", "bow-tie-collar"],
    images: ["santa-1.webp","bow-tie-1.webp","santa-3.webp","bow-tie-6.webp"],
    blurb: "Santa hat and scarf with a plaid bow tie collar — the Christmas card, sorted.",
    ticks: ["Santa set plus the bestselling collar", "Saves £1.99 against buying separately", "Both adjustable — no sizing"],
    forMeIf: ["The Christmas card plus an everyday collar", "It's a gift for a cat owner", "You'd rather order once"],
    fit: "Both adjustable. No sizing needed.", sizes: null,
    specs: ["Santa Hat & Scarf Set (£17.99)", "Bow Tie Collar (£8.99)", "Ships as one parcel"],
    box: ["1 × Santa Hat & Scarf Set", "1 × Bow Tie Collar"],
    care: "See each product.", confirm: [], source: null
  }
];

const CATEGORIES = [
  { id: "everyday",  label: "Everyday",  note: "Collars and bandanas, year-round", emoji: "🎀", tint: "#E4F5F0", image: "bow-tie-2.webp" },
  { id: "halloween", label: "Halloween", note: "Lion, bat, spider, pumpkin",        emoji: "🎃", tint: "#FFE3EA", image: "lion-mane-3.webp" },
  { id: "christmas", label: "Christmas", note: "Santa hat and scarf set",                       emoji: "🎄", tint: "#EDE7FF", image: "santa-2.webp" },
  { id: "bundle",    label: "Bundles",   note: "Cheaper together, genuinely",       emoji: "🎁", tint: "#FFF3D6", image: "bat-cape-5.webp" }
];

/* Fit guidance for a range where most things are collars, hats and short capes. */
const FIT_GUIDE = {
  neck: "Wrap a soft tape around the neck where a collar sits and add two fingers of slack. That number is the neck size — it's what every size on this site is based on.",
  chest: "For the Spider Costume only: measure around the widest part of the chest, just behind the front legs.",
  between: "Between two sizes? Take the larger. A slightly loose costume gets worn; a tight one comes straight off.",
  rule: "If you can slide two fingers under a collar, it's right. Tighter than that is too tight."
};

const FREE_SHIPPING_AT = 30;

/* Launch offer — fully manual. `active: true` shows the crossed-out `list` price, the saving,
   the "until" line and the LED ticker; `active: false` removes all of it. Nothing switches by
   itself: when the offer ends, set `active` to false and raise each `price` to its `list`
   figure in the same edit. The ticker counts to `ends` and then sits at zero until you do. */
const SALE = { active: true, label: "Launch offer", ends: "2026-09-22T23:59:59+01:00", ticker: "Sale ends in" };

/* Contact details shown on the Contact page, the chat button and in structured data.
   Placeholders until the domain and a WhatsApp Business number exist. */
const CONTACT = {
  email: "hello@catwalkclub.co.uk",
  whatsapp: "",                       /* e.g. "447700900123" — international format, no + */
  hours: "Mon–Fri, 9am–6pm UK time",
  reply: "within one working day"
};

const DELIVERY = { min: 2, max: 4, cost: 3.95 };  /* working days, UK standard tracked */

/* Homepage "Picture it on your cat" row: five phone frames. Add { src: "assets/video/x.mp4",
   product: "lion-mane", caption: "Kingsley, Leeds" } once clips exist; empty entries show a
   placeholder frame. */
const HOME_VIDEOS = [];

/* Optional nicknames (`alias`) show as a small tag under the title; the searchable product
   name stays the title. Change or blank them freely. */

/* Halloween timing — real dates, shown until they pass, then gone. */
const HALLOWEEN = { cutoff: "2026-10-14", day: "2026-10-31" };

/* Typical adult neck ranges by breed, in cm. Starting points only — every page still says
   to measure. `mid` drives the size suggestions on the breeds page and in the quiz. */
const BREEDS = [
  { id: "kitten",     name: "Kitten (4–8 months)",       range: "18–24cm", mid: 21 },
  { id: "siamese",    name: "Siamese / Oriental",        range: "22–28cm", mid: 25 },
  { id: "domestic",   name: "Domestic shorthair (average cat)", range: "25–30cm", mid: 27 },
  { id: "sphynx",     name: "Sphynx",                    range: "24–30cm", mid: 27 },
  { id: "bengal",     name: "Bengal",                    range: "26–32cm", mid: 29 },
  { id: "persian",    name: "Persian",                   range: "26–32cm", mid: 29 },
  { id: "british",    name: "British Shorthair",         range: "28–34cm", mid: 31 },
  { id: "ragdoll",    name: "Ragdoll",                   range: "28–35cm", mid: 31 },
  { id: "norwegian",  name: "Norwegian Forest",          range: "30–36cm", mid: 33 },
  { id: "mainecoon",  name: "Maine Coon",                range: "30–38cm", mid: 34 }
];

/* Quiz: what a cat will put up with, from least to most. Each product's `wear` level. */
const WEAR = { "bow-tie-collar": 1, "bandana": 1, "lion-mane": 2, "pumpkin-set": 2, "santa-set": 2, "bat-cape": 3, "spider-costume": 3 };
const WEAR_LABELS = [null, "A collar, and that's it", "A collar and a hat", "Anything, honestly"];

/* Cat of the Month — a judged photo competition, free to enter (no purchase necessary).
   Winners are added here only when real. Never invent one. */
const DRAW = {
  name: "Cat of the Month",
  prize: "£25 Catwalk Club credit and a feature on the site",
  closes: "last day of every month, midnight UK time",
  firstCloses: "31 October 2026",
  handle: "@catwalkclub",
  entryEmail: "hello@catwalkclub.co.uk",
  winners: []   /* { month: "October 2026", name: "Mabel (Leeds)", image: "ugc/mabel.webp", product: "lion-mane" } */
};
