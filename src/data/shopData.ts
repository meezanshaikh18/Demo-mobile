export type ProductCategory =
  | 'All'
  | 'Flagship Phones'
  | '5G Midrange'
  | 'Audio & Wearables'
  | 'Power & Cables'
  | 'Wholesale Lots';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceInr: number;
  priceUsd: number;
  stockStatus: 'In Stock' | 'Bulk Available' | 'Low Stock';
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: Exclude<ProductCategory, 'All'>;
  shortSpec: string;
  description: string;
  image: string;
  moq: string;
  condition: string;
  warranty: string;
  variants: ProductVariant[];
  specifications: ProductSpec[];
}

export interface ShopProfile {
  brandName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  ownerName: string;
  establishedYear: string;
  gstNumber: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  cityRegion: string;
  businessHours: string;
  currency: 'INR' | 'USD';
}

export const DEFAULT_SHOP_PROFILE: ShopProfile = {
  brandName: 'Meridian Mobile',
  tagline: 'Authorized Multi-Brand Retailer & Wholesale Supplier',
  heroTitle: 'Flagship Smartphones, Verified Devices & Genuine Accessories',
  heroSubtitle:
    'Supplying seal-packed retail handsets, corporate fleet orders, and certified OEM power accessories with transparent GST billing and official warranty coverage.',
  ownerName: 'Aarav Patel',
  establishedYear: '2016',
  gstNumber: '27AABCM4821K1Z9',
  phone: '+91 98204 51290',
  whatsapp: '+91 98204 51290',
  email: 'sales@meridianmobile.example',
  address: 'Shop 14, Ground Floor, Silver Arcade, MG Road',
  cityRegion: 'Nashik, Maharashtra 422001',
  businessHours: 'Mon – Sat: 10:00 AM – 9:00 PM · Sun: 11:00 AM – 6:00 PM',
  currency: 'INR',
};

export const SHOP_ASSURANCES = [
  {
    title: '100% GST Billed',
    detail: 'Official tax invoice on every retail & bulk order',
  },
  {
    title: 'IMEI Seal Verified',
    detail: 'Factory-sealed units with brand warranty activation',
  },
  {
    title: 'Same-Day Dispatch',
    detail: 'Local delivery within 3 hours & insured courier pan-India',
  },
  {
    title: 'Retail & Wholesale',
    detail: 'Single-unit showroom pickup or 10+ unit dealer pricing',
  },
];

export const QUALITY_PILLARS = [
  {
    index: '01.',
    title: 'Direct Distributor Sourcing',
    body: 'Every smartphone, smartwatch, and power adapter is sourced directly through authorized national distribution channels with verifiable serial and IMEI tracking.',
  },
  {
    index: '02.',
    title: 'Transparent Grading & Specs',
    body: 'Each device listing includes complete hardware specifications, battery capacity, box contents, and clear warranty terms before you place a retail or bulk inquiry.',
  },
  {
    index: '03.',
    title: 'Dedicated Dealer & Corporate Desk',
    body: 'Sub-dealers, offices, and institutional buyers receive tiered volume quotes, GST input credit invoices, and prioritized stock allocation.',
  },
  {
    index: '04.',
    title: 'In-Store Setup & After-Sales Care',
    body: 'Complimentary data transfer, tempered glass installation, and direct warranty claim assistance at our showroom counter.',
  },
];

export const PRODUCT_CATALOG: ProductItem[] = [
  {
    id: 'apex-titanium-pro',
    name: 'Apex 16 Pro Titanium',
    brand: 'Apex Mobile',
    category: 'Flagship Phones',
    shortSpec: '6.3" LTPO OLED · Triple 48MP · Grade 5 Titanium',
    description:
      'Flagship pro handset crafted with brushed aerospace-grade titanium, pro-grade triple optical camera array, and all-day thermal efficiency for creators and executives.',
    image: '/src/assets/images/device_flagship_pro_1795525992632.jpg',
    moq: '1 Unit (Retail) / 5+ Units (Dealer)',
    condition: 'Brand New · Factory Sealed',
    warranty: '1 Year Official Manufacturer Warranty',
    variants: [
      { id: '256-nat', label: '256 GB · Natural Titanium', priceInr: 114900, priceUsd: 1099, stockStatus: 'In Stock' },
      { id: '512-nat', label: '512 GB · Natural Titanium', priceInr: 134900, priceUsd: 1299, stockStatus: 'In Stock' },
      { id: '1tb-nat', label: '1 TB · Natural Titanium', priceInr: 154900, priceUsd: 1499, stockStatus: 'Bulk Available' },
    ],
    specifications: [
      { label: 'Display', value: '6.3" Super Retina LTPO OLED, 120Hz ProMotion' },
      { label: 'Processor', value: '3nm Hexa-Core Flagship SoC with 16-Core Neural Engine' },
      { label: 'Rear Camera', value: '48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto' },
      { label: 'Battery & Port', value: 'USB-C 3.2 Gen 2 · 45W Fast Charge & 25W Mag-Wireless' },
      { label: 'Connectivity', value: '5G Dual-SIM (Nano + eSIM), Wi-Fi 7, Bluetooth 5.4' },
      { label: 'In the Box', value: 'Handset, Braided USB-C Cable, Documentation' },
    ],
  },
  {
    id: 'velox-cobalt-ultra',
    name: 'Velox S25 Ultra Blue',
    brand: 'Velox',
    category: 'Flagship Phones',
    shortSpec: '6.8" QHD+ AMOLED · 200MP Sensor · 5000mAh',
    description:
      'High-brightness edge-to-edge workspace display paired with an anodized cobalt aluminum frame, flagship zoom optics, and multi-day battery endurance.',
    image: '/src/assets/images/device_foldable_ultra_1795525993376.jpg',
    moq: '1 Unit (Retail) / 5+ Units (Dealer)',
    condition: 'Brand New · Factory Sealed',
    warranty: '1 Year Official Brand Warranty + 6M Screen Care',
    variants: [
      { id: '256-blu', label: '12GB / 256 GB · Cobalt Blue', priceInr: 99999, priceUsd: 949, stockStatus: 'In Stock' },
      { id: '512-blu', label: '12GB / 512 GB · Cobalt Blue', priceInr: 112999, priceUsd: 1079, stockStatus: 'In Stock' },
    ],
    specifications: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, 1440 x 3120, 2600 nits' },
      { label: 'Processor', value: 'Snapdragon 8 Elite Octa-Core (4.32 GHz)' },
      { label: 'Camera System', value: '200MP OIS Wide + 50MP Periscope + 12MP Ultra-Wide' },
      { label: 'Battery', value: '5000 mAh · 45W Wired + 15W Wireless' },
      { label: 'Build & Rating', value: 'Anodized Aluminum Frame · IP68 Water/Dust Resistant' },
      { label: 'In the Box', value: 'Handset, USB-C Data Cable, SIM Ejector, Warranty Card' },
    ],
  },
  {
    id: 'nova-slate-5g',
    name: 'Nova Nord 5G Slate',
    brand: 'Nova Telecom',
    category: '5G Midrange',
    shortSpec: '6.67" 120Hz AMOLED · 5500mAh · 80W Adapter Included',
    description:
      'Reliable everyday 5G performer built for fast multitasking, sharp daylight photography, and rapid 80W top-ups right out of the box.',
    image: '/src/assets/images/device_everyday_5g_1795525993725.jpg',
    moq: '1 Unit (Retail) / 10+ Units (Wholesale)',
    condition: 'Brand New · Indian Retail Unit',
    warranty: '1 Year Manufacturer Warranty',
    variants: [
      { id: '128-obs', label: '8GB / 128 GB · Matte Obsidian', priceInr: 24999, priceUsd: 299, stockStatus: 'In Stock' },
      { id: '256-obs', label: '8GB / 256 GB · Matte Obsidian', priceInr: 27999, priceUsd: 339, stockStatus: 'In Stock' },
      { id: 'lot-10', label: 'Dealer Lot (10 Units · Mixed)', priceInr: 232000, priceUsd: 2750, stockStatus: 'Bulk Available' },
    ],
    specifications: [
      { label: 'Display', value: '6.67" FHD+ AMOLED, 120Hz Refresh Rate' },
      { label: 'Processor', value: 'Dimensity 7300 Energy 5G (4nm)' },
      { label: 'Camera', value: '50MP Sony LYT-600 OIS + 8MP Ultra-Wide + 16MP Front' },
      { label: 'Battery', value: '5500 mAh · 80W SuperFast Charger Included' },
      { label: 'Memory & Storage', value: 'LPDDR4X RAM · UFS 3.1 Storage' },
      { label: 'In the Box', value: 'Handset, 80W Adapter, USB-C Cable, Protective Case' },
    ],
  },
  {
    id: 'aura-anc-watch-bundle',
    name: 'Aura ANC Pods & Watch S4',
    brand: 'Aura Audio',
    category: 'Audio & Wearables',
    shortSpec: '46dB Active Noise Cancellation · 1.9" AMOLED Watch',
    description:
      'Precision-tuned wireless ANC earbuds paired with an aluminum health and call-ready smartwatch. Available individually or as a retail gift bundle.',
    image: '/src/assets/images/device_audio_watch_1795525993947.jpg',
    moq: '1 Set (Retail) / 20+ Sets (Corporate Gift)',
    condition: 'Brand New · Sealed OEM Box',
    warranty: '1 Year Replacement Warranty',
    variants: [
      { id: 'buds-only', label: 'Aura ANC Pods Only · Matte White', priceInr: 4499, priceUsd: 59, stockStatus: 'In Stock' },
      { id: 'watch-only', label: 'Watch S4 Aluminum Only · 44mm', priceInr: 8999, priceUsd: 109, stockStatus: 'In Stock' },
      { id: 'combo-pack', label: 'Complete Audio + Watch Bundle', priceInr: 12499, priceUsd: 149, stockStatus: 'Bulk Available' },
    ],
    specifications: [
      { label: 'Audio Driver', value: '11mm Dynamic Bio-Diaphragm + Dual-Mic ENC' },
      { label: 'Noise Control', value: '46dB Hybrid ANC + Transparency Mode' },
      { label: 'Playtime', value: '38 Hours Total with USB-C Charging Case' },
      { label: 'Watch Display', value: '1.9" Sapphire-Coated AMOLED, Always-On' },
      { label: 'Health & Sensors', value: 'Optical Heart Rate, SpO2, Sleep & Step Tracking' },
      { label: 'Compatibility', value: 'iOS 15+ and Android 10+ via Bluetooth 5.3' },
    ],
  },
  {
    id: 'volt-gan-power-kit',
    name: 'Volt 65W GaN Power & MagBank Kit',
    brand: 'Volt Gear',
    category: 'Power & Cables',
    shortSpec: 'Dual USB-C PD 3.0 · 100W Braided Cable · 10,000mAh MagSafe',
    description:
      'Complete certified fast-charging ecosystem engineered with Gallium Nitride thermal protection, high-flex nylon cabling, and magnetic wireless power.',
    image: '/src/assets/images/device_power_accessories_1795525994213.jpg',
    moq: '1 Kit (Retail) / 25+ Kits (Wholesale)',
    condition: 'BIS Certified · Brand New',
    warranty: '18 Months Swap Warranty',
    variants: [
      { id: 'gan-65w', label: '65W Dual-Port GaN Adapter Only', priceInr: 2299, priceUsd: 29, stockStatus: 'In Stock' },
      { id: 'mag-10k', label: '10,000mAh Magnetic Power Bank', priceInr: 3199, priceUsd: 39, stockStatus: 'In Stock' },
      { id: 'full-kit', label: 'Full 3-Piece Travel Power Kit', priceInr: 5499, priceUsd: 65, stockStatus: 'Bulk Available' },
    ],
    specifications: [
      { label: 'Charger Output', value: '65W Max PD 3.0 / PPS (Dual USB-C Ports)' },
      { label: 'Cable Spec', value: '1.5m Double-Braided USB-C to C (100W / 5A E-Marker)' },
      { label: 'Power Bank', value: '10,000 mAh Li-Polymer · 15W Mag-Wireless + 22.5W Wired' },
      { label: 'Safety Standard', value: 'BIS Certified · Over-Voltage & Thermal Cutoff' },
      { label: 'Compatibility', value: 'Phones, Tablets & USB-C Ultrabooks' },
      { label: 'Packaging', value: 'Retail Hanging Blister Box / Master Carton (40 pcs)' },
    ],
  },
  {
    id: 'enterprise-fleet-lot',
    name: 'Showroom & Corporate Fleet Package',
    brand: 'Multi-Brand',
    category: 'Wholesale Lots',
    shortSpec: '10x Sealed 5G Smartphones · Custom GST Billing',
    description:
      'Curated wholesale & corporate procurement lot featuring 10 factory-sealed 5G devices with matching fast chargers, ready for immediate business deployment.',
    image: '/src/assets/images/hero_mobile_showcase_1795525991513.jpg',
    moq: '1 Lot (10 Handsets Minimum)',
    condition: 'Factory Sealed Master Carton',
    warranty: '1 Year Pan-India Brand Warranty',
    variants: [
      { id: 'lot-mid-10', label: '10x Midrange 5G (8GB/128GB)', priceInr: 228000, priceUsd: 2690, stockStatus: 'Bulk Available' },
      { id: 'lot-pro-10', label: '10x Executive Flagship (256GB)', priceInr: 945000, priceUsd: 8990, stockStatus: 'Bulk Available' },
    ],
    specifications: [
      { label: 'Lot Quantity', value: '10 Sealed Retail Boxes per Master Pack' },
      { label: 'Billing Type', value: 'Full 18% GST Tax Invoice with Input Credit' },
      { label: 'IMEI Manifest', value: 'Digital CSV / PDF IMEI List Provided on Dispatch' },
      { label: 'Lead Time', value: 'Same-Day Pickup or 24–48 Hr Insured Freight' },
      { label: 'Payment Terms', value: 'NEFT / RTGS / UPI / Showroom Card Swipe' },
      { label: 'Support', value: 'Dedicated Account Coordinator for Repeat Orders' },
    ],
  },
];
