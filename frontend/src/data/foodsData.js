// NutriScan AI - 27 Sample Food Dataset
// Reliable demo data based on USDA FoodData Central approximations.
// Educational demo prototype - Not for medical use.

export const SAMPLE_FOODS = [
  // --- FRUITS ---
  {
    id: 1,
    name: "Apple",
    category: "Fruit",
    emoji: "🍎",
    serving: "1 medium (182g)",
    calories: 95,
    protein: 0.5,
    carbohydrates: 25.0,
    fat: 0.3,
    fiber: 4.4,
    sugar: 19.0,
    sodium: 2,
    vitamins: {
      "Vitamin A": "98 IU (2% DV)",
      "Vitamin C": "8.4 mg (9% DV)",
      "Vitamin E": "0.3 mg (2% DV)",
      "Vitamin K": "4.0 mcg (3% DV)",
      "Vitamin B6": "0.1 mg (5% DV)"
    },
    minerals: {
      "Calcium": "11 mg (1% DV)",
      "Iron": "0.2 mg (1% DV)",
      "Magnesium": "9 mg (2% DV)",
      "Potassium": "195 mg (4% DV)",
      "Zinc": "0.1 mg (1% DV)"
    },
    benefits: [
      "Good source of soluble dietary fiber (pectin)",
      "Contains quercetin and antioxidants supporting heart health",
      "Supports normal digestive health and regular bowel movements",
      "Low glycemic impact when consumed with skin"
    ],
    drawbacks: [
      "Naturally sweet; portion control recommended for strict glycemic tracking",
      "Apples contain fructose which may cause mild bloating in sensitive individuals"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Slice into thin wedges to prevent choking in toddlers." },
      adult: { status: "Generally Suitable", note: "Nutritious daily whole fruit snack." },
      pregnancy: { status: "Generally Suitable", note: "Wash thoroughly. Provides gentle fiber and hydration." },
      elderly: { status: "Generally Suitable", note: "Soft or stewed apple may be preferred if chewing is difficult." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 94,
      visualSigns: "Smooth firm skin, vibrant red/green coloration, no bruising or dark depression spots.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Raw Apple", status: "Detected", emoji: "🍎", nutrients: "Fiber, Vitamin C, Antioxidants" }
    ]
  },
  {
    id: 2,
    name: "Banana",
    category: "Fruit",
    emoji: "🍌",
    serving: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbohydrates: 27.0,
    fat: 0.3,
    fiber: 3.1,
    sugar: 14.4,
    sodium: 1,
    vitamins: {
      "Vitamin B6": "0.4 mg (25% DV)",
      "Vitamin C": "10.3 mg (11% DV)",
      "Vitamin A": "76 IU (1% DV)",
      "Folate (B9)": "24 mcg (6% DV)"
    },
    minerals: {
      "Potassium": "422 mg (9% DV)",
      "Magnesium": "32 mg (8% DV)",
      "Iron": "0.3 mg (2% DV)",
      "Calcium": "6 mg (1% DV)"
    },
    benefits: [
      "Excellent source of Vitamin B6 and potassium for muscle function",
      "Easily digestible carbohydrates provide sustained natural energy",
      "Contains prebiotics that nourish beneficial gut bacteria",
      "Gentle on the stomach during occasional digestive upset"
    ],
    drawbacks: [
      "Moderate glycemic index as it ripens due to starch converting to simple sugars",
      "Those with potassium-restricted renal diets should monitor intake"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Ideal soft starter fruit and snack for active children." },
      adult: { status: "Generally Suitable", note: "Great pre- or post-workout energy booster." },
      pregnancy: { status: "Generally Suitable", note: "Vitamin B6 can help ease mild pregnancy morning nausea." },
      elderly: { status: "Generally Suitable", note: "Soft texture, easy to chew and digest." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 91,
      visualSigns: "Even yellow peel with slight green tip, firm peel structure, minimal brown sugar freckles.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Banana Pulp", status: "Detected", emoji: "🍌", nutrients: "Potassium, Vitamin B6, Fiber" }
    ]
  },
  {
    id: 3,
    name: "Papaya",
    category: "Fruit",
    emoji: "🧡",
    serving: "1 cup cubed (145g)",
    calories: 62,
    protein: 0.7,
    carbohydrates: 15.7,
    fat: 0.4,
    fiber: 2.5,
    sugar: 11.3,
    sodium: 12,
    vitamins: {
      "Vitamin C": "88.3 mg (98% DV)",
      "Vitamin A": "1370 IU (27% DV)",
      "Folate (B9)": "54 mcg (14% DV)",
      "Vitamin E": "1.0 mg (7% DV)"
    },
    minerals: {
      "Potassium": "264 mg (6% DV)",
      "Magnesium": "30 mg (7% DV)",
      "Calcium": "29 mg (2% DV)"
    },
    benefits: [
      "High concentration of Vitamin C and beta-carotene (provitamin A)",
      "Contains the natural digestive enzyme papain",
      "Supports skin health and normal immune function",
      "Hydrating fruit with over 88% water content"
    ],
    drawbacks: [
      "Unripe/semi-ripe papaya contains concentrated latex and papain",
      "Excessive consumption may cause mild laxative effects"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Ensure fully ripe and deseeded before serving." },
      adult: { status: "Generally Suitable", note: "Excellent for digestion and daily Vitamin C." },
      pregnancy: { 
        status: "Caution", 
        note: "Ripe papaya in moderation is generally fine, but UNRIPE or SEMI-RIPE papaya must be AVOIDED due to high latex content which may trigger uterine spasms. Consult healthcare professional." 
      },
      elderly: { status: "Generally Suitable", note: "Soft flesh, natural papain aids gentle digestion." }
    },
    freshness: {
      applicable: true,
      status: "Ripening",
      confidence: 88,
      visualSigns: "Golden orange exterior blush, yielding slightly to gentle pressure.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Ripe Papaya", status: "Detected", emoji: "🧡", nutrients: "Papain, Vitamin C, Beta-Carotene" }
    ]
  },
  {
    id: 4,
    name: "Mango",
    category: "Fruit",
    emoji: "🥭",
    serving: "1 cup sliced (165g)",
    calories: 99,
    protein: 1.4,
    carbohydrates: 24.7,
    fat: 0.6,
    fiber: 2.6,
    sugar: 22.5,
    sodium: 2,
    vitamins: {
      "Vitamin C": "60 mg (67% DV)",
      "Vitamin A": "1780 IU (36% DV)",
      "Vitamin B6": "0.2 mg (10% DV)",
      "Folate": "71 mcg (18% DV)"
    },
    minerals: {
      "Potassium": "277 mg (6% DV)",
      "Magnesium": "18 mg (4% DV)",
      "Copper": "0.2 mg (20% DV)"
    },
    benefits: [
      "Rich source of polyphenols including mangiferin antioxidant",
      "Provides over 60% daily Vitamin C requirement",
      "Contains amylase enzymes that help break down carbohydrates",
      "Supports eye health through lutein and zeaxanthin"
    ],
    drawbacks: [
      "Higher natural sugar content; enjoy in moderation if managing blood glucose",
      "Mango skin contains urushiol traces which may irritate sensitive individuals"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Kid-favorite sweet fruit; serve peeled and sliced." },
      adult: { status: "Generally Suitable", note: "Nutritious seasonal fruit." },
      pregnancy: { status: "Generally Suitable", note: "Provides natural folate and Vitamin C. Enjoy in moderate portions." },
      elderly: { status: "Generally Suitable", note: "Soft, flavorful, and easy to eat." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 90,
      visualSigns: "Rich coloration, sweet floral aroma, slight give to touch.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Mango", status: "Detected", emoji: "🥭", nutrients: "Vitamin A, Vitamin C, Mangiferin" }
    ]
  },
  {
    id: 5,
    name: "Orange",
    category: "Fruit",
    emoji: "🍊",
    serving: "1 medium (131g)",
    calories: 62,
    protein: 1.2,
    carbohydrates: 15.4,
    fat: 0.2,
    fiber: 3.1,
    sugar: 12.2,
    sodium: 0,
    vitamins: {
      "Vitamin C": "69.7 mg (78% DV)",
      "Folate (B9)": "40 mcg (10% DV)",
      "Thiamine (B1)": "0.1 mg (9% DV)",
      "Vitamin A": "295 IU (6% DV)"
    },
    minerals: {
      "Potassium": "237 mg (5% DV)",
      "Calcium": "52 mg (4% DV)",
      "Magnesium": "13 mg (3% DV)"
    },
    benefits: [
      "Well-known powerhouse of bioavailable Vitamin C",
      "Hesperidin flavonoid supports vascular endothelial function",
      "Citric acid aids dietary non-heme iron absorption",
      "Whole orange provides satisfying natural dietary fiber"
    ],
    drawbacks: [
      "Natural acidity may trigger acid reflux or heartburn in prone individuals",
      "Frequent citrus exposure can impact dental enamel if teeth are not rinsed"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Great natural source of Vitamin C. Peel into segments." },
      adult: { status: "Generally Suitable", note: "Excellent daily immune support snack." },
      pregnancy: { status: "Generally Suitable", note: "Helps iron absorption from prenatal meals; watch for heartburn." },
      elderly: { status: "Generally Suitable", note: "Juicy hydration; segment membranes can be removed if needed." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 95,
      visualSigns: "Firm taut rind, vibrant orange hue, heavy for size indicating juice content.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Orange", status: "Detected", emoji: "🍊", nutrients: "Vitamin C, Hesperidin, Fiber" }
    ]
  },
  {
    id: 6,
    name: "Grapes",
    category: "Fruit",
    emoji: "🍇",
    serving: "1 cup (151g)",
    calories: 104,
    protein: 1.1,
    carbohydrates: 27.3,
    fat: 0.2,
    fiber: 1.4,
    sugar: 23.4,
    sodium: 3,
    vitamins: {
      "Vitamin K": "22 mcg (18% DV)",
      "Vitamin C": "4.8 mg (5% DV)",
      "Vitamin B6": "0.1 mg (6% DV)"
    },
    minerals: {
      "Potassium": "288 mg (6% DV)",
      "Copper": "0.2 mg (19% DV)",
      "Manganese": "0.1 mg (5% DV)"
    },
    benefits: [
      "Contains resveratrol in dark skins, an extensively studied antioxidant",
      "Provides Vitamin K supporting normal blood coagulation and bone health",
      "High water content provides refreshing hydration",
      "Contains anthocyanins and catechins"
    ],
    drawbacks: [
      "Easy to overconsume due to bite-size nature; moderately high sugar",
      "Choking hazard for young children if served whole"
    ],
    suitability: {
      kids: { status: "Caution", note: "ALWAYS cut grapes lengthwise into quarters for children under 5." },
      adult: { status: "Generally Suitable", note: "Refreshing polyphenol-rich snack." },
      pregnancy: { status: "Generally Suitable", note: "Wash thoroughly. Provides gentle hydration and micronutrients." },
      elderly: { status: "Generally Suitable", note: "Seedless varieties recommended for ease." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 92,
      visualSigns: "Plump berries firmly attached to green pliable stems; natural whitish bloom visible.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Grapes", status: "Detected", emoji: "🍇", nutrients: "Resveratrol, Vitamin K, Potassium" }
    ]
  },
  {
    id: 7,
    name: "Watermelon",
    category: "Fruit",
    emoji: "🍉",
    serving: "1 cup diced (152g)",
    calories: 46,
    protein: 0.9,
    carbohydrates: 11.5,
    fat: 0.2,
    fiber: 0.6,
    sugar: 9.4,
    sodium: 2,
    vitamins: {
      "Vitamin C": "12.3 mg (14% DV)",
      "Vitamin A": "865 IU (17% DV)",
      "Vitamin B6": "0.1 mg (4% DV)"
    },
    minerals: {
      "Potassium": "170 mg (4% DV)",
      "Magnesium": "15 mg (4% DV)"
    },
    benefits: [
      "Consists of 92% water, making it exceptionally hydrating",
      "One of the richest dietary sources of the antioxidant lycopene",
      "Contains L-citrulline amino acid which supports nitric oxide production",
      "Very low calorie density per serving"
    ],
    drawbacks: [
      "Higher glycemic index, though glycemic load is low due to high water",
      "Low in dietary fiber compared to denser fruits"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Fun hydrating snack; remove seeds for toddlers." },
      adult: { status: "Generally Suitable", note: "Superb summer hydration." },
      pregnancy: { status: "Generally Suitable", note: "Helps counter pregnancy dehydration and muscle tightness." },
      elderly: { status: "Generally Suitable", note: "Soft, gentle on teeth, great for hydration." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 93,
      visualSigns: "Crisp red flesh, creamy yellow field spot, hollow thud sound upon tap.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Watermelon", status: "Detected", emoji: "🍉", nutrients: "Lycopene, Citrulline, Water" }
    ]
  },

  // --- VEGETABLES ---
  {
    id: 8,
    name: "Tomato",
    category: "Vegetable",
    emoji: "🍅",
    serving: "1 medium (123g)",
    calories: 22,
    protein: 1.1,
    carbohydrates: 4.8,
    fat: 0.2,
    fiber: 1.5,
    sugar: 3.2,
    sodium: 6,
    vitamins: {
      "Vitamin C": "17 mg (19% DV)",
      "Vitamin A": "1025 IU (20% DV)",
      "Vitamin K": "9.7 mcg (8% DV)",
      "Folate": "18 mcg (5% DV)"
    },
    minerals: {
      "Potassium": "292 mg (6% DV)",
      "Manganese": "0.1 mg (4% DV)"
    },
    benefits: [
      "Outstanding source of bioavailable lycopene, enhanced when cooked",
      "Supports cardiovascular wellness and cellular protection",
      "Provides both Vitamin C and potassium with very low calories",
      "Versatile culinary staple across world cuisines"
    ],
    drawbacks: [
      "Nightshade vegetable; may trigger mild sensitivity in select arthritis patients",
      "Acidic; can aggravate gastroesophageal reflux (GERD)"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Great cooked or raw in salads and gravies." },
      adult: { status: "Generally Suitable", note: "Nutritional staple for cardiovascular support." },
      pregnancy: { status: "Generally Suitable", note: "Provides gentle folate and Vitamin C. Moderate if experiencing reflux." },
      elderly: { status: "Generally Suitable", note: "Cooked tomato sauces offer easier digestion and higher lycopene." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 96,
      visualSigns: "Taut glossy skin, deep uniform red hue, firm stem connection, no soft fissures.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Tomato", status: "Detected", emoji: "🍅", nutrients: "Lycopene, Potassium, Vitamin C" }
    ]
  },
  {
    id: 9,
    name: "Onion",
    category: "Vegetable",
    emoji: "🧅",
    serving: "1 medium (110g)",
    calories: 44,
    protein: 1.2,
    carbohydrates: 10.3,
    fat: 0.1,
    fiber: 1.9,
    sugar: 4.7,
    sodium: 4,
    vitamins: {
      "Vitamin C": "8.1 mg (9% DV)",
      "Vitamin B6": "0.1 mg (7% DV)",
      "Folate": "21 mcg (5% DV)"
    },
    minerals: {
      "Potassium": "161 mg (3% DV)",
      "Manganese": "0.1 mg (6% DV)"
    },
    benefits: [
      "Rich in quercetin, a potent flavonoid with anti-inflammatory properties",
      "Contains organic sulfur compounds supporting cellular detoxification",
      "Contains inulin and fructooligosaccharides prebiotic fiber",
      "Enhances culinary flavor naturally without requiring heavy salt"
    ],
    drawbacks: [
      "High in FODMAPs (fructans); may trigger bloating in IBS patients",
      "Raw onion can irritate sensitive stomach linings or cause reflux"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Cooked onions are sweeter and gentler on small tummies." },
      adult: { status: "Generally Suitable", note: "Core flavor and antioxidant booster." },
      pregnancy: { status: "Generally Suitable", note: "Safe and beneficial; cook thoroughly if raw onion causes nausea." },
      elderly: { status: "Generally Suitable", note: "Cooked onions support gut microbiome gently." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 92,
      visualSigns: "Dry papery outer skin, firm bulb neck, absence of green shoots or moisture.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Onion Bulb", status: "Detected", emoji: "🧅", nutrients: "Quercetin, Inulin, Sulfur Compounds" }
    ]
  },
  {
    id: 10,
    name: "Carrot",
    category: "Vegetable",
    emoji: "🥕",
    serving: "1 medium (61g)",
    calories: 25,
    protein: 0.6,
    carbohydrates: 5.8,
    fat: 0.1,
    fiber: 1.7,
    sugar: 2.9,
    sodium: 42,
    vitamins: {
      "Vitamin A": "10190 IU (204% DV)",
      "Vitamin K": "8 mcg (7% DV)",
      "Vitamin C": "3.6 mg (4% DV)",
      "Vitamin B6": "0.1 mg (5% DV)"
    },
    minerals: {
      "Potassium": "195 mg (4% DV)",
      "Calcium": "20 mg (2% DV)"
    },
    benefits: [
      "Unrivaled source of beta-carotene, converting to Vitamin A in the body",
      "Supports normal night vision and retinal health",
      "Contains lutein, zeaxanthin, and soluble fiber",
      "Promotes dental gum stimulation and saliva production when eaten raw"
    ],
    drawbacks: [
      "Consuming extreme amounts daily may cause benign carotenemia (skin tint)",
      "Raw hard baby carrots pose a choking hazard to toddlers unless steamed/grated"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Grate or steam for toddlers to eliminate choking risk." },
      adult: { status: "Generally Suitable", note: "Staple vegetable for eye and skin wellness." },
      pregnancy: { status: "Generally Suitable", note: "Natural plant beta-carotene is the safest form of Vitamin A during pregnancy." },
      elderly: { status: "Generally Suitable", note: "Steamed or mashed carrots are easily enjoyed." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 95,
      visualSigns: "Firm snap when broken, vibrant orange hue, no rubbery bending or white blush.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Carrot", status: "Detected", emoji: "🥕", nutrients: "Beta-Carotene, Fiber, Lutein" }
    ]
  },
  {
    id: 11,
    name: "Potato",
    category: "Vegetable",
    emoji: "🥔",
    serving: "1 medium baked with skin (173g)",
    calories: 161,
    protein: 4.3,
    carbohydrates: 36.6,
    fat: 0.2,
    fiber: 3.8,
    sugar: 1.5,
    sodium: 17,
    vitamins: {
      "Vitamin C": "16.6 mg (18% DV)",
      "Vitamin B6": "0.5 mg (29% DV)",
      "Folate": "48 mcg (12% DV)",
      "Thiamine": "0.1 mg (9% DV)"
    },
    minerals: {
      "Potassium": "926 mg (20% DV)",
      "Magnesium": "48 mg (12% DV)",
      "Iron": "1.9 mg (10% DV)",
      "Phosphorus": "121 mg (12% DV)"
    },
    benefits: [
      "More potassium than a standard banana when skin is retained",
      "Cooling cooked potatoes generates resistant starch, feeding beneficial gut flora",
      "Naturally gluten-free complex carbohydrate source",
      "Provides substantial satiety per calorie compared to refined grains"
    ],
    drawbacks: [
      "High glycemic impact when mashed or deep-fried; pairing with fiber/protein helps",
      "Never eat green potatoes or sprouts due to toxic solanine glycoalkaloid"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Boiled or baked potato is an easy, comforting staple." },
      adult: { status: "Generally Suitable", note: "Healthy whole food carb; favor baking/steaming over deep frying." },
      pregnancy: { status: "Generally Suitable", note: "Helps nausea, provides potassium. Avoid green-tinted skins." },
      elderly: { status: "Generally Suitable", note: "Soft, satisfying, high potassium supports blood pressure." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 90,
      visualSigns: "Firm unblemished surface, absence of green skin pigmentation or sprouting eyes.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Potato Tuber", status: "Detected", emoji: "🥔", nutrients: "Potassium, Resistant Starch, Vitamin B6" }
    ]
  },
  {
    id: 12,
    name: "Cucumber",
    category: "Vegetable",
    emoji: "🥒",
    serving: "1 cup sliced (104g)",
    calories: 16,
    protein: 0.7,
    carbohydrates: 3.8,
    fat: 0.1,
    fiber: 0.5,
    sugar: 1.7,
    sodium: 2,
    vitamins: {
      "Vitamin K": "17.1 mcg (14% DV)",
      "Vitamin C": "2.9 mg (3% DV)"
    },
    minerals: {
      "Potassium": "153 mg (3% DV)",
      "Magnesium": "13 mg (3% DV)"
    },
    benefits: [
      "Contains roughly 95% water for effortless daily hydration",
      "Contains cucurbitacins and lignans showing anti-inflammatory promise",
      "Very low calorie content; wonderful for weight balance and freshness",
      "Cooling soothing effect on digestion"
    ],
    drawbacks: [
      "Low caloric density means it should be paired with nutrient-dense foods",
      "Cucumbers can occasionally cause mild burping in sensitive individuals"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Crisp finger food; peel skin if bitter." },
      adult: { status: "Generally Suitable", note: "Perfect low-calorie hydrator." },
      pregnancy: { status: "Generally Suitable", note: "Hydrating, mild flavor helps counter morning dehydration." },
      elderly: { status: "Generally Suitable", note: "Easy to digest; thinly slice or grate." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 96,
      visualSigns: "Deep uniform green skin, firm structure without rubbery flexibility.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Cucumber", status: "Detected", emoji: "🥒", nutrients: "Water, Vitamin K, Cucurbitacins" }
    ]
  },
  {
    id: 13,
    name: "Capsicum",
    category: "Vegetable",
    emoji: "🫑",
    serving: "1 medium bell pepper (119g)",
    calories: 31,
    protein: 1.2,
    carbohydrates: 7.2,
    fat: 0.3,
    fiber: 2.5,
    sugar: 5.0,
    sodium: 4,
    vitamins: {
      "Vitamin C": "152 mg (169% DV)",
      "Vitamin A": "3720 IU (74% DV)",
      "Vitamin B6": "0.3 mg (18% DV)",
      "Folate": "55 mcg (14% DV)"
    },
    minerals: {
      "Potassium": "251 mg (5% DV)",
      "Magnesium": "14 mg (4% DV)"
    },
    benefits: [
      "Outstanding Vitamin C concentration, far exceeding most citrus fruits",
      "Rich in capsanthin (red varieties) and violaxanthin carotenoids",
      "Supports collagen synthesis, iron absorption, and capillary resilience",
      "Crisp satisfying crunch with negligible calories"
    ],
    drawbacks: [
      "Member of the Solanaceae family; some individuals note mild sensitivity",
      "Green bell peppers can taste slightly bitter compared to mature red ones"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Sweet red/yellow peppers are usually well-received." },
      adult: { status: "Generally Suitable", note: "Supercharged source of Vitamin C and antioxidants." },
      pregnancy: { status: "Generally Suitable", note: "Excellent natural Vitamin C to boost iron uptake." },
      elderly: { status: "Generally Suitable", note: "Cook lightly to soften texture while retaining nutrients." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 94,
      visualSigns: "Taut glossy skin, firm walls, fresh green stem without shriveling.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Bell Pepper / Capsicum", status: "Detected", emoji: "🫑", nutrients: "Vitamin C, Carotenoids, Folate" }
    ]
  },
  {
    id: 14,
    name: "Green Peas",
    category: "Vegetable",
    emoji: "🟢",
    serving: "1 cup cooked (160g)",
    calories: 134,
    protein: 8.6,
    carbohydrates: 25.0,
    fat: 0.4,
    fiber: 8.8,
    sugar: 9.5,
    sodium: 5,
    vitamins: {
      "Vitamin K": "41.4 mcg (35% DV)",
      "Vitamin C": "22.7 mg (25% DV)",
      "Thiamine (B1)": "0.4 mg (35% DV)",
      "Folate": "101 mcg (25% DV)"
    },
    minerals: {
      "Manganese": "0.8 mg (36% DV)",
      "Iron": "2.5 mg (14% DV)",
      "Phosphorus": "187 mg (19% DV)",
      "Zinc": "1.9 mg (17% DV)"
    },
    benefits: [
      "Remarkable plant-based protein content (almost 9g per cup)",
      "High dietary fiber promotes smooth intestinal transit and satiety",
      "Contains saponins, phenolic acids, and flavanols",
      "Rich in B-vitamins crucial for cellular energy pathways"
    ],
    drawbacks: [
      "Contains purines; those with gout or elevated uric acid should moderate intake",
      "Contains oligosaccharides which can cause gas in unaccustomed guts"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Naturally sweet and colorful; toddlers love finger-picking peas." },
      adult: { status: "Generally Suitable", note: "Excellent vegetarian protein and fiber addition." },
      pregnancy: { status: "Generally Suitable", note: "Rich in plant folate, protein, and non-heme iron." },
      elderly: { status: "Generally Suitable", note: "Soft when cooked, rich in plant nutrients." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 89,
      visualSigns: "Bright plump green pods or spheres, tender skin, sweet aroma.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Green Peas", status: "Detected", emoji: "🟢", nutrients: "Plant Protein, Fiber, Thiamine" }
    ]
  },

  // --- NUTS & DRY FRUITS ---
  {
    id: 15,
    name: "Almond",
    category: "Nut",
    emoji: "🌰",
    serving: "1 oz (28g / ~23 kernels)",
    calories: 164,
    protein: 6.0,
    carbohydrates: 6.1,
    fat: 14.2,
    fiber: 3.5,
    sugar: 1.2,
    sodium: 1,
    vitamins: {
      "Vitamin E": "7.3 mg (49% DV)",
      "Riboflavin (B2)": "0.3 mg (25% DV)",
      "Niacin": "1.0 mg (6% DV)"
    },
    minerals: {
      "Magnesium": "76 mg (18% DV)",
      "Calcium": "76 mg (6% DV)",
      "Copper": "0.3 mg (32% DV)",
      "Manganese": "0.6 mg (27% DV)"
    },
    benefits: [
      "Outstanding source of alpha-tocopherol Vitamin E protecting lipids from oxidation",
      "Rich in heart-friendly monounsaturated oleic fatty acids",
      "High magnesium content aids muscle relaxation and metabolic regulation",
      "Low net carbs with satisfying protein and fiber density"
    ],
    drawbacks: [
      "Major tree nut allergen; strictly avoid if nut allergy is present",
      "Calorically dense; modest portion sizes recommended for calorie balance"
    ],
    suitability: {
      kids: { status: "Caution", note: "Whole nuts are severe choking hazards under 5; serve smooth almond butter instead." },
      adult: { status: "Generally Suitable", note: "One of the best daily nutrient-dense snacks." },
      pregnancy: { status: "Generally Suitable", note: "Magnesium, calcium, and Vitamin E provide excellent maternal support." },
      elderly: { status: "Generally Suitable", note: "Soaked and peeled or sliced almonds are easiest to chew." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 93,
      visualSigns: "Uniform golden-brown skin, crisp clean snap without rancid oil scent.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Almond Kernels", status: "Detected", emoji: "🌰", nutrients: "Vitamin E, Magnesium, Monounsaturated Fats" }
    ]
  },
  {
    id: 16,
    name: "Cashew",
    category: "Nut",
    emoji: "🥜",
    serving: "1 oz (28g / ~18 kernels)",
    calories: 157,
    protein: 5.2,
    carbohydrates: 8.6,
    fat: 12.4,
    fiber: 0.9,
    sugar: 1.7,
    sodium: 3,
    vitamins: {
      "Vitamin K": "9.7 mcg (8% DV)",
      "Vitamin B6": "0.1 mg (7% DV)",
      "Thiamine": "0.1 mg (9% DV)"
    },
    minerals: {
      "Copper": "0.6 mg (69% DV)",
      "Magnesium": "83 mg (20% DV)",
      "Iron": "1.9 mg (11% DV)",
      "Zinc": "1.6 mg (15% DV)"
    },
    benefits: [
      "Exceptional source of copper, vital for iron metabolism and collagen",
      "Rich in bioavailable zinc for immune defense and tissue repair",
      "Creamy texture with predominantly oleic and stearic beneficial fats",
      "Naturally lower in fat than many other culinary tree nuts"
    ],
    drawbacks: [
      "Tree nut allergen with potential for acute reactions in sensitized individuals",
      "Contains phytic acid; soaking helps enhance mineral bioavailability"
    ],
    suitability: {
      kids: { status: "Caution", note: "Choking hazard under 5; use smooth cashew paste." },
      adult: { status: "Generally Suitable", note: "Rich creamy snack and dairy-alternative base." },
      pregnancy: { status: "Generally Suitable", note: "Great source of dietary zinc, copper, and iron." },
      elderly: { status: "Generally Suitable", note: "Softer bite than almonds; easily ground into porridge." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 91,
      visualSigns: "Ivory crescent shape, firm bite, clean sweet aroma without rancidity.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Cashew Kernels", status: "Detected", emoji: "🥜", nutrients: "Copper, Zinc, Magnesium" }
    ]
  },
  {
    id: 17,
    name: "Dates",
    category: "Dry Fruit",
    emoji: "🌴",
    serving: "2 Medjool dates (48g)",
    calories: 133,
    protein: 0.9,
    carbohydrates: 36.0,
    fat: 0.2,
    fiber: 3.2,
    sugar: 32.0,
    sodium: 1,
    vitamins: {
      "Vitamin B6": "0.1 mg (7% DV)",
      "Niacin": "0.8 mg (5% DV)",
      "Pantothenic Acid": "0.4 mg (8% DV)"
    },
    minerals: {
      "Potassium": "334 mg (7% DV)",
      "Copper": "0.2 mg (18% DV)",
      "Magnesium": "26 mg (6% DV)",
      "Iron": "0.5 mg (3% DV)"
    },
    benefits: [
      "Nature's caramel; concentrated wholesome energy source",
      "Rich in soluble fiber that buffers glucose absorption",
      "Studies suggest consuming dates in late pregnancy may support cervical ripening",
      "Contains phenolic antioxidants like flavonoids and carotenoids"
    ],
    drawbacks: [
      "High natural fructose content; consume mindfully if managing diabetes",
      "Sticky texture adheres to teeth; oral rinsing recommended"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Deseed and chop before serving to toddlers." },
      adult: { status: "Generally Suitable", note: "Superior alternative to refined white sugar in recipes." },
      pregnancy: { 
        status: "Generally Suitable", 
        note: "Traditionally favored in late pregnancy (36+ weeks) to support natural labor preparation." 
      },
      elderly: { status: "Generally Suitable", note: "Natural remedy for gentle regularity; chop finely." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 94,
      visualSigns: "Plump glossy wrinkling, slight amber sheen, no sugar crystallization or mold.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Dried Dates", status: "Detected", emoji: "🌴", nutrients: "Natural Sugar, Potassium, Fiber" }
    ]
  },
  {
    id: 18,
    name: "Raisins",
    category: "Dry Fruit",
    emoji: "🍇",
    serving: "1/4 cup (40g)",
    calories: 120,
    protein: 1.3,
    carbohydrates: 32.0,
    fat: 0.2,
    fiber: 1.6,
    sugar: 26.0,
    sodium: 11,
    vitamins: {
      "Vitamin B6": "0.1 mg (5% DV)",
      "Vitamin C": "0.9 mg (1% DV)"
    },
    minerals: {
      "Potassium": "298 mg (6% DV)",
      "Iron": "1.0 mg (6% DV)",
      "Copper": "0.1 mg (14% DV)",
      "Boron": "0.8 mg (bone cofactor)"
    },
    benefits: [
      "Dense source of potassium and dietary boron for bone matrix support",
      "Provides natural prebiotic tartaric acid supporting gut motility",
      "Oleanolic acid in raisins exhibits protective properties against oral bacteria",
      "Quick athletic carb reload for endurance running or cycling"
    ],
    drawbacks: [
      "Concentrated natural sugars; easy to overconsume by the handful",
      "Sticky residue requires standard dental hygiene"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Classic lunchbox snack for children with full chewing teeth." },
      adult: { status: "Generally Suitable", note: "Portable, shelf-stable energy boost." },
      pregnancy: { status: "Generally Suitable", note: "Provides plant iron and fiber to help counter constipation." },
      elderly: { status: "Generally Suitable", note: "Soak in warm water for softer texture and gentle digestion." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 92,
      visualSigns: "Flexible wrinkly texture without excessive dryness or insect damage.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Sun-dried Raisins", status: "Detected", emoji: "🍇", nutrients: "Boron, Potassium, Tartaric Acid" }
    ]
  },
  {
    id: 19,
    name: "Walnut",
    category: "Nut",
    emoji: "🌰",
    serving: "1 oz (28g / ~14 halves)",
    calories: 185,
    protein: 4.3,
    carbohydrates: 3.9,
    fat: 18.5,
    fiber: 1.9,
    sugar: 0.7,
    sodium: 1,
    vitamins: {
      "Vitamin B6": "0.2 mg (9% DV)",
      "Folate": "28 mcg (7% DV)",
      "Thiamine": "0.1 mg (8% DV)"
    },
    minerals: {
      "Copper": "0.5 mg (50% DV)",
      "Manganese": "1.0 mg (43% DV)",
      "Magnesium": "45 mg (11% DV)",
      "Phosphorus": "98 mg (10% DV)"
    },
    benefits: [
      "Significantly higher in plant Omega-3 (ALA) than any other dietary nut (2.5g/oz)",
      "Known as brain food due to polyphenols, ALA, and neuroprotective profile",
      "Supports endothelial vascular flexibility and healthy lipid ratios",
      "Contains ellagitannins converted by gut microbes into anti-inflammatory urolithins"
    ],
    drawbacks: [
      "Potent tree nut allergen; contraindicated for nut-allergic persons",
      "Polyunsaturated fats are prone to rancidity if stored in warm environments"
    ],
    suitability: {
      kids: { status: "Caution", note: "Choking hazard under 5; serve finely ground or in butter form." },
      adult: { status: "Generally Suitable", note: "Premier daily nut for cardiovascular and cognitive wellness." },
      pregnancy: { status: "Generally Suitable", note: "Plant-based Omega-3 ALA supports fetal neural development." },
      elderly: { status: "Generally Suitable", note: "Crush over breakfast porridge to support brain aging." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 93,
      visualSigns: "Light golden butterfly halves, crisp crunch, rich nutty aroma without paint-like smell.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Walnut Halves", status: "Detected", emoji: "🌰", nutrients: "Alpha-Linolenic Acid (Omega-3), Ellagitannins" }
    ]
  },

  // --- COMMON & PREPARED FOODS ---
  {
    id: 20,
    name: "Rice",
    category: "Grain",
    emoji: "🍚",
    serving: "1 cup cooked white rice (158g)",
    calories: 205,
    protein: 4.2,
    carbohydrates: 44.5,
    fat: 0.4,
    fiber: 0.6,
    sugar: 0.1,
    sodium: 0,
    vitamins: {
      "Thiamine (B1)": "0.3 mg (21% DV)",
      "Niacin (B3)": "2.3 mg (15% DV)",
      "Folate (B9)": "92 mcg (23% DV)"
    },
    minerals: {
      "Manganese": "0.7 mg (31% DV)",
      "Selenium": "11.9 mcg (22% DV)",
      "Iron": "1.9 mg (11% DV)"
    },
    benefits: [
      "Universal dietary staple providing clean, easily accessible energy",
      "Naturally hypoallergenic and gentle on compromised digestive systems",
      "Enriched varieties provide essential B-vitamins and iron",
      "Pairs seamlessly with legumes to form a complete dietary amino acid profile"
    ],
    drawbacks: [
      "High glycemic index; spikes blood glucose rapidly if eaten without protein or fiber",
      "Low in dietary fiber compared to brown or wild whole grain alternatives"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Easy first food; gentle on toddler stomachs." },
      adult: { status: "Generally Suitable", note: "Pair with dal, vegetables, or lean protein to balance glycemic impact." },
      pregnancy: { status: "Generally Suitable", note: "Bland staple comforting during nausea; enriched with folate." },
      elderly: { status: "Generally Suitable", note: "Soft, digestible, comforting staple." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 95,
      visualSigns: "Fluffy individual grains, clean white appearance, freshly steamed aroma.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "White Rice Grains", status: "Detected", emoji: "🍚", nutrients: "Complex Carbs, B-Vitamins" },
      { name: "Water", status: "Detected", emoji: "💧", nutrients: "Hydration" }
    ]
  },
  {
    id: 21,
    name: "Idli",
    category: "Prepared Food",
    emoji: "🫓",
    serving: "2 medium idlis (100g)",
    calories: 140,
    protein: 4.8,
    carbohydrates: 28.0,
    fat: 0.6,
    fiber: 1.8,
    sugar: 0.3,
    sodium: 180,
    vitamins: {
      "Thiamine": "0.1 mg (8% DV)",
      "Riboflavin": "0.1 mg (6% DV)",
      "Niacin": "0.8 mg (5% DV)"
    },
    minerals: {
      "Calcium": "24 mg (2% DV)",
      "Iron": "1.1 mg (6% DV)",
      "Potassium": "110 mg (2% DV)"
    },
    benefits: [
      "Traditional fermentation enhances bioavailability of B-vitamins and minerals",
      "Steamed without added oil, making it naturally low in dietary fat",
      "Fermentation breaks down anti-nutrients and phytic acid",
      "Combination of rice and black gram (urad dal) creates complete amino acids"
    ],
    drawbacks: [
      "Moderate glycemic response; pair with vegetable sambar for fiber",
      "Commercial batters may contain elevated added sodium"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Soft, mild, highly digestible toddler food." },
      adult: { status: "Generally Suitable", note: "Healthy traditional steamed breakfast." },
      pregnancy: { status: "Generally Suitable", note: "Gentle on sensitive stomach; fermented nutrients absorb well." },
      elderly: { status: "Generally Suitable", note: "Exceptional soft diet food; requires minimal chewing." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 93,
      visualSigns: "Porous spongy texture, clean ivory color, mild fermented fragrance.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fermented Rice Batter", status: "Detected", emoji: "🍚", nutrients: "Carbohydrates, Fermented Enzymes" },
      { name: "Black Gram (Urad Dal)", status: "Detected", emoji: "🫘", nutrients: "Plant Protein, Iron, B-Vitamins" },
      { name: "Fenugreek Seeds", status: "Possibly Detected", emoji: "🌱", nutrients: "Fermentation Catalyst" },
      { name: "Salt", status: "Unable to Determine", emoji: "🧂", nutrients: "Sodium (cannot be estimated from image)" }
    ]
  },
  {
    id: 22,
    name: "Dosa",
    category: "Prepared Food",
    emoji: "🫔",
    serving: "1 plain dosa (85g)",
    calories: 168,
    protein: 4.0,
    carbohydrates: 29.0,
    fat: 3.8,
    fiber: 1.5,
    sugar: 0.4,
    sodium: 195,
    vitamins: {
      "Thiamine": "0.1 mg (8% DV)",
      "Niacin": "0.9 mg (6% DV)"
    },
    minerals: {
      "Iron": "1.2 mg (7% DV)",
      "Calcium": "18 mg (2% DV)",
      "Phosphorus": "64 mg (6% DV)"
    },
    benefits: [
      "Naturally fermented batter provides gut-friendly prebiotic qualities",
      "Combines rice and lentils to provide complementary amino acids",
      "Crisp, savory, and widely versatile with chutney and sambar",
      "Can be prepared with minimal oil on non-stick cast iron surfaces"
    ],
    drawbacks: [
      "Restaurant preparations can be high in saturated ghee or cooking oil",
      "Refined white rice dominance raises glycemic index"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Crispy texture is popular with kids. Moderate the oil." },
      adult: { status: "Generally Suitable", note: "Healthy breakfast when made with light cooking spray." },
      pregnancy: { status: "Generally Suitable", note: "Safe, satisfying meal; pair with nutrient-dense lentil sambar." },
      elderly: { status: "Generally Suitable", note: "Soft dosa or appam may be easier than ultra-crispy varieties." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 92,
      visualSigns: "Golden-brown crisp surface, subtle fermented aroma, freshly made.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Rice & Urad Dal Batter", status: "Detected", emoji: "🍚", nutrients: "Complex Carbs, Plant Protein" },
      { name: "Cooking Oil / Ghee", status: "Possibly Detected", emoji: "🫙", nutrients: "Fats for griddle roasting" },
      { name: "Fenugreek Traces", status: "Possibly Detected", emoji: "🌱", nutrients: "Aroma & Fermentation" },
      { name: "Salt", status: "Unable to Determine", emoji: "🧂", nutrients: "Quantity cannot be reliably estimated" }
    ]
  },
  {
    id: 23,
    name: "Chapati",
    category: "Prepared Food",
    emoji: "🫓",
    serving: "1 medium roti without oil (40g)",
    calories: 104,
    protein: 3.1,
    carbohydrates: 20.0,
    fat: 0.8,
    fiber: 3.2,
    sugar: 0.2,
    sodium: 110,
    vitamins: {
      "Thiamine (B1)": "0.1 mg (8% DV)",
      "Niacin (B3)": "1.2 mg (8% DV)",
      "Folate": "14 mcg (4% DV)"
    },
    minerals: {
      "Iron": "1.1 mg (6% DV)",
      "Magnesium": "34 mg (8% DV)",
      "Phosphorus": "88 mg (9% DV)",
      "Zinc": "0.8 mg (7% DV)"
    },
    benefits: [
      "Made from 100% whole wheat flour retaining the bran and germ",
      "Significantly higher in fiber than refined flour flatbreads (naan)",
      "Provides sustained slow-release complex carbohydrates",
      "Naturally low in fat when dry-toasted without heavy ghee"
    ],
    drawbacks: [
      "Contains gluten; strictly contraindicated for individuals with celiac disease",
      "Phytates in unfermented whole wheat slightly limit mineral absorption"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Soft warm chapati paired with dal is a classic nutritious meal." },
      adult: { status: "Generally Suitable", note: "Staple complex carbohydrate for daily healthy diets." },
      pregnancy: { status: "Generally Suitable", note: "Whole wheat fiber helps maintain bowel regularity." },
      elderly: { status: "Generally Suitable", note: "Soft puffed phulkas are easy to chew." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 95,
      visualSigns: "Puffed ballooned layers, light brown specks, soft pliable texture.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Whole Wheat Atta Flour", status: "Detected", emoji: "🌾", nutrients: "Complex Carbs, Fiber, B-Vitamins" },
      { name: "Water", status: "Detected", emoji: "💧", nutrients: "Dough Hydration" },
      { name: "Ghee / Oil (optional)", status: "Unable to Determine", emoji: "🫙", nutrients: "Cannot verify oil level from image" }
    ]
  },
  {
    id: 24,
    name: "Fried Rice",
    category: "Prepared Food",
    emoji: "🍛",
    serving: "1 plate (200g)",
    calories: 320,
    protein: 6.5,
    carbohydrates: 48.0,
    fat: 11.2,
    fiber: 3.4,
    sugar: 2.8,
    sodium: 540,
    vitamins: {
      "Vitamin A": "1250 IU (25% DV)",
      "Vitamin C": "18 mg (20% DV)",
      "Vitamin B6": "0.2 mg (12% DV)"
    },
    minerals: {
      "Sodium": "540 mg (23% DV)",
      "Potassium": "210 mg (4% DV)",
      "Iron": "1.4 mg (8% DV)"
    },
    benefits: [
      "Convenient delivery of mixed colorful garden vegetables in one meal",
      "Provides sustained carbohydrate energy for physically active days",
      "Can incorporate high-protein additions like tofu, eggs, or paneer",
      "Vegetables add carotenoids, Vitamin C, and dietary fiber"
    ],
    drawbacks: [
      "Commercial versions often contain high sodium and added soy sauce",
      "Wok stir-frying can absorb notable cooking oil; choose light preparations"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Fun way for children to consume diverse vegetables." },
      adult: { status: "Generally Suitable", note: "Balanced if prepared with plenty of vegetables and moderate oil." },
      pregnancy: { status: "Generally Suitable", note: "Ensure cooked piping hot. Ask for low sodium and no raw egg." },
      elderly: { status: "Generally Suitable", note: "Easy to consume; ensure vegetables are finely diced and tender." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 91,
      visualSigns: "Steaming hot, clearly delineated grains, vibrant colored vegetables without dullness.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Steamed Rice", status: "Detected", emoji: "🍚", nutrients: "Carbohydrates, Energy" },
      { name: "Carrot Cubes", status: "Detected", emoji: "🥕", nutrients: "Beta-Carotene, Vitamin A" },
      { name: "Capsicum (Bell Pepper)", status: "Detected", emoji: "🫑", nutrients: "Vitamin C, Antioxidants" },
      { name: "Green Peas", status: "Detected", emoji: "🟢", nutrients: "Plant Protein, Fiber" },
      { name: "Onion / Spring Onion", status: "Possibly Detected", emoji: "🧅", nutrients: "Quercetin, Flavor" },
      { name: "Tomato Traces", status: "Possibly Detected", emoji: "🍅", nutrients: "Lycopene" },
      { name: "Cooking Oil", status: "Unable to Determine", emoji: "🫙", nutrients: "Quantity cannot be reliably estimated from image" },
      { name: "Soy Sauce / Salt / MSG", status: "Unable to Determine", emoji: "🧂", nutrients: "Sodium levels cannot be detected visually" }
    ]
  },
  {
    id: 25,
    name: "Vegetable Curry",
    category: "Prepared Food",
    emoji: "🍲",
    serving: "1 bowl (220g)",
    calories: 185,
    protein: 4.8,
    carbohydrates: 22.0,
    fat: 8.5,
    fiber: 5.2,
    sugar: 4.5,
    sodium: 480,
    vitamins: {
      "Vitamin A": "2100 IU (42% DV)",
      "Vitamin C": "28 mg (31% DV)",
      "Folate": "45 mcg (11% DV)"
    },
    minerals: {
      "Potassium": "420 mg (9% DV)",
      "Iron": "1.8 mg (10% DV)",
      "Magnesium": "38 mg (9% DV)"
    },
    benefits: [
      "Turmeric, cumin, and coriander spices provide potent curcumin and polyphenols",
      "Fiber-rich medley of legumes and root vegetables supports gut health",
      "Nutrient synergy: healthy spices aid digestion and fat absorption",
      "Satisfying warmth and variety of micronutrients in a single dish"
    ],
    drawbacks: [
      "Heavy cream, coconut milk, or excess oil can significantly increase calories",
      "Spicy gravies may aggravate heartburn or acid reflux"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Keep spice heat mild; mash vegetables for younger eaters." },
      adult: { status: "Generally Suitable", note: "Nutrient powerhouse when made homestyle with moderate oil." },
      pregnancy: { status: "Generally Suitable", note: "Rich in vegetables and antioxidants; dial down spicy chili." },
      elderly: { status: "Generally Suitable", note: "Soft cooked vegetables in warm spiced gravy aid appetite." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 90,
      visualSigns: "Rich aromatic gravy, tender vegetable pieces, freshly prepared appearance.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Potato Chunks", status: "Detected", emoji: "🥔", nutrients: "Potassium, Starch" },
      { name: "Carrot Slices", status: "Detected", emoji: "🥕", nutrients: "Vitamin A, Fiber" },
      { name: "Tomato Gravy Base", status: "Detected", emoji: "🍅", nutrients: "Lycopene, Vitamin C" },
      { name: "Onion Masala", status: "Detected", emoji: "🧅", nutrients: "Quercetin, Prebiotics" },
      { name: "Green Peas", status: "Possibly Detected", emoji: "🟢", nutrients: "Plant Protein" },
      { name: "Turmeric & Spices", status: "Unable to Determine", emoji: "🌶️", nutrients: "Curcumin (cannot estimate quantity from image)" },
      { name: "Oil / Ghee Base", status: "Unable to Determine", emoji: "🫙", nutrients: "Cannot measure oil depth visually" }
    ]
  },
  {
    id: 26,
    name: "Salad",
    category: "Prepared Food",
    emoji: "🥗",
    serving: "1 large bowl (180g)",
    calories: 85,
    protein: 2.4,
    carbohydrates: 12.0,
    fat: 3.2,
    fiber: 3.8,
    sugar: 5.2,
    sodium: 120,
    vitamins: {
      "Vitamin A": "2400 IU (48% DV)",
      "Vitamin C": "45 mg (50% DV)",
      "Vitamin K": "65 mcg (54% DV)",
      "Folate": "62 mcg (16% DV)"
    },
    minerals: {
      "Potassium": "380 mg (8% DV)",
      "Calcium": "48 mg (4% DV)",
      "Iron": "1.3 mg (7% DV)"
    },
    benefits: [
      "Maximum retention of heat-sensitive Vitamin C and active enzymes",
      "Abundant water and fiber content create gentle stomach fullness",
      "Colorful raw pigments provide diverse antioxidant protection",
      "Naturally very low calorie density supporting weight management"
    ],
    drawbacks: [
      "Raw produce must be washed scrupulously to prevent surface bacterial contamination",
      "Heavy commercial dressings can silently add 200+ calories of seed oils/sugar"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Chop cucumbers and tomatoes into bite-sized pieces." },
      adult: { status: "Generally Suitable", note: "Gold standard for daily micronutrient and raw fiber intake." },
      pregnancy: { 
        status: "Caution", 
        note: "Crucial safety note: Raw salads MUST be thoroughly washed to eliminate risk of toxoplasmosis and listeria. Avoid pre-packaged buffets." 
      },
      elderly: { status: "Generally Suitable", note: "Finely shred or dice if raw vegetables are difficult to chew." }
    },
    freshness: {
      applicable: true,
      status: "Fresh",
      confidence: 95,
      visualSigns: "Crisp non-wilted greens, glossy firm cucumber and tomato slices, no waterlogging.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Fresh Cucumber", status: "Detected", emoji: "🥒", nutrients: "Hydration, Vitamin K" },
      { name: "Sliced Tomato", status: "Detected", emoji: "🍅", nutrients: "Lycopene, Vitamin C" },
      { name: "Capsicum Strips", status: "Detected", emoji: "🫑", nutrients: "Vitamin C, Carotenoids" },
      { name: "Red Onion Rings", status: "Possibly Detected", emoji: "🧅", nutrients: "Antioxidants" },
      { name: "Grated Carrot", status: "Possibly Detected", emoji: "🥕", nutrients: "Beta-Carotene" },
      { name: "Salad Dressing / Salt", status: "Unable to Determine", emoji: "🫙", nutrients: "Dressing type and sodium cannot be verified from image" }
    ]
  },
  {
    id: 27,
    name: "Sandwich",
    category: "Prepared Food",
    emoji: "🥪",
    serving: "1 veggie sandwich (170g)",
    calories: 250,
    protein: 7.2,
    carbohydrates: 38.0,
    fat: 7.5,
    fiber: 4.2,
    sugar: 4.0,
    sodium: 420,
    vitamins: {
      "Vitamin C": "14 mg (16% DV)",
      "Vitamin A": "450 IU (9% DV)",
      "Thiamine": "0.2 mg (15% DV)",
      "Folate": "55 mcg (14% DV)"
    },
    minerals: {
      "Calcium": "85 mg (7% DV)",
      "Iron": "2.1 mg (12% DV)",
      "Sodium": "420 mg (18% DV)"
    },
    benefits: [
      "Convenient portable balanced meal combining grains and crisp vegetables",
      "Whole wheat options deliver sustained energy and gut-healthy fiber",
      "Easily enriched with protein sources like cheese, hummus, or egg",
      "Encourages raw vegetable intake in an appetizing format"
    ],
    drawbacks: [
      "Store-bought sandwiches often contain elevated sodium and preservatives",
      "Mayonnaise or creamy spreads add substantial hidden saturated fat"
    ],
    suitability: {
      kids: { status: "Generally Suitable", note: "Classic school lunch favorite; cut into triangles." },
      adult: { status: "Generally Suitable", note: "Nutritious quick meal when whole grain bread is selected." },
      pregnancy: { status: "Generally Suitable", note: "Ensure fresh clean vegetables. Avoid unpasteurized soft cheeses or deli meats." },
      elderly: { status: "Generally Suitable", note: "Soft bread with crusts removed is easiest to manage." }
    },
    freshness: {
      applicable: false,
      status: "Fresh",
      confidence: 92,
      visualSigns: "Fresh bread texture, crisp un-wilted vegetable fillings, cleanly assembled.",
      disclaimer: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat."
    },
    ingredients: [
      { name: "Bread Slices", status: "Detected", emoji: "🍞", nutrients: "Carbohydrates, Fiber, B-Vitamins" },
      { name: "Tomato Slices", status: "Detected", emoji: "🍅", nutrients: "Lycopene, Vitamin C" },
      { name: "Cucumber Slices", status: "Possibly Detected", emoji: "🥒", nutrients: "Hydration" },
      { name: "Capsicum / Greens", status: "Possibly Detected", emoji: "🫑", nutrients: "Vitamin C, Crunch" },
      { name: "Butter / Spread", status: "Unable to Determine", emoji: "🧈", nutrients: "Fats cannot be measured beneath bread" },
      { name: "Seasoning / Salt", status: "Unable to Determine", emoji: "🧂", nutrients: "Quantity cannot be estimated from image" }
    ]
  }
];

// Helper to look up food by ID or Name
export function getFoodByIdOrName(query) {
  if (!query) return SAMPLE_FOODS[0];
  const num = parseInt(query, 10);
  if (!isNaN(num)) {
    const found = SAMPLE_FOODS.find(f => f.id === num);
    if (found) return found;
  }
  const str = String(query).toLowerCase();
  return SAMPLE_FOODS.find(f => f.name.toLowerCase() === str || f.name.toLowerCase().includes(str)) || SAMPLE_FOODS[0];
}
