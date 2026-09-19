// Packaged Food OCR Sample Data
// Prioritizes extracted ingredient lists, explicit percentages where available,
// allergen warnings, preservatives, and date freshness verification.

export const SAMPLE_PACKAGED_OCR = [
  {
    id: "ocr-1",
    productName: "Organic Rolled Oats & Flax Cereal",
    brand: "Nature Harvest Co.",
    detectedDateType: "Best Before",
    manufacturingDate: "2024-03-15",
    expiryDate: "2025-03-14",
    dateStatus: "Valid", // Valid / Near Expiry / Expired / Date Not Detected
    dateStatusEmoji: "🟢",
    dateExplanation: "Product is well within its recommended shelf life. (Expires in > 6 months)",
    servingSize: "40g",
    nutritionFacts: {
      calories: 150,
      protein: 5.0,
      carbohydrates: 27.0,
      fat: 2.5,
      fiber: 4.0,
      sugar: 1.0,
      sodium: 5
    },
    ingredientsList: [
      { name: "Whole Grain Rolled Oats", percentage: "85%", note: "Explicit percentage listed on label" },
      { name: "Golden Flaxseeds", percentage: "10%", note: "Explicit percentage listed on label" },
      { name: "Chia Seeds", percentage: "5%", note: "Explicit percentage listed on label" },
      { name: "Sea Salt", percentage: "Percentage not available from the label", note: "< 0.5% declared" }
    ],
    allergens: ["Processed in a facility that also handles Wheat, Tree Nuts, and Soy."],
    preservatives: ["None declared (Free from artificial preservatives)."],
    labelDisclaimers: [
      "Percentages displayed only where explicitly printed on the physical label.",
      "OCR text extraction is an AI-assisted estimate. Always inspect the physical package."
    ]
  },
  {
    id: "ocr-2",
    productName: "Classic Multigrain Energy Bar",
    brand: "VitalBite",
    detectedDateType: "Expiry Date",
    manufacturingDate: "2024-01-10",
    expiryDate: "2024-10-30",
    dateStatus: "Near Expiry",
    dateStatusEmoji: "🟡",
    dateExplanation: "Best before date approaching within 30-45 days. Consume soon.",
    servingSize: "1 bar (45g)",
    nutritionFacts: {
      calories: 195,
      protein: 6.5,
      carbohydrates: 24.0,
      fat: 8.0,
      fiber: 3.5,
      sugar: 11.0,
      sodium: 95
    },
    ingredientsList: [
      { name: "Rolled Oats", percentage: "Percentage not available from the label", note: "Order of predominance" },
      { name: "Almonds", percentage: "15%", note: "Explicit percentage listed on front panel" },
      { name: "Honey", percentage: "Percentage not available from the label", note: "Natural sweetener" },
      { name: "Sunflower Oil", percentage: "Percentage not available from the label", note: "Binding agent" },
      { name: "Soy Lecithin (INS 322)", percentage: "Percentage not available from the label", note: "Emulsifier" },
      { name: "Mixed Tocopherols (INS 307b)", percentage: "Percentage not available from the label", note: "Natural antioxidant preservative" }
    ],
    allergens: ["Contains Almonds and Soy. May contain Peanut traces."],
    preservatives: ["Mixed Tocopherols (Vitamin E) added to preserve freshness."],
    labelDisclaimers: [
      "Percentage not available from the label for ingredients without explicit figures.",
      "Percentages are not estimated or invented."
    ]
  },
  {
    id: "ocr-3",
    productName: "Tomato Herb Pasta Sauce",
    brand: "Bella Cucina",
    detectedDateType: "Use By",
    manufacturingDate: "2023-08-01",
    expiryDate: "2024-08-01",
    dateStatus: "Expired",
    dateStatusEmoji: "🔴",
    dateExplanation: "Passed the printed expiry date. Do not consume.",
    servingSize: "100g",
    nutritionFacts: {
      calories: 55,
      protein: 1.8,
      carbohydrates: 9.0,
      fat: 1.2,
      fiber: 2.1,
      sugar: 6.5,
      sodium: 480
    },
    ingredientsList: [
      { name: "Crushed Tomatoes", percentage: "78%", note: "Printed on front label" },
      { name: "Tomato Paste", percentage: "Percentage not available from the label", note: "Thickening base" },
      { name: "Onions", percentage: "Percentage not available from the label", note: "Aromatic" },
      { name: "Extra Virgin Olive Oil", percentage: "4%", note: "Explicit label percentage" },
      { name: "Garlic & Basil", percentage: "Percentage not available from the label", note: "Natural herbs" },
      { name: "Potassium Sorbate (INS 202)", percentage: "Percentage not available from the label", note: "Preservative" }
    ],
    allergens: ["Produced in a nut-free facility."],
    preservatives: ["Potassium Sorbate (Class II preservative) to inhibit mold growth."],
    labelDisclaimers: [
      "Always verify seal integrity before opening.",
      "OCR date detection is for assistance; confirm manually."
    ]
  }
];
