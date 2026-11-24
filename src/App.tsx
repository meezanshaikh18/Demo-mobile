import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Copy,
  Edit3,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import {
  DEFAULT_SHOP_PROFILE,
  PRODUCT_CATALOG,
  ProductCategory,
  ProductItem,
  ProductVariant,
  QUALITY_PILLARS,
  SHOP_ASSURANCES,
  ShopProfile,
} from './data/shopData';
import { ResilientImage } from './components/ResilientImage';
import { ProductDetailModal, formatCurrency } from './components/ProductDetailModal';
import { BagItem, InquiryBagDrawer } from './components/InquiryBagDrawer';
import { EditShopModal } from './components/EditShopModal';

const STORAGE_KEY_PROFILE = 'meridian_mobile_shop_profile_v1';
const CATEGORIES: ProductCategory[] = [
  'All',
  'Flagship Phones',
  '5G Midrange',
  'Audio & Wearables',
  'Power & Cables',
  'Wholesale Lots',
];

export default function App() {
  const [shopProfile, setShopProfile] = useState<ShopProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return { ...DEFAULT_SHOP_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_SHOP_PROFILE;
  });

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Contact / Bulk Inquiry Form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Retail Purchase');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySubmittedRef, setInquirySubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${shopProfile.brandName} — Smartphones, Accessories & Wholesale Catalog`;
  }, [shopProfile.brandName]);

  const handleSaveProfile = (updated: ShopProfile) => {
    setShopProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch {
      // Ignore storage write errors
    }
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCT_CATALOG.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.shortSpec.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalBagCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + item.quantity, 0),
    [bagItems]
  );

  const handleAddToBag = (product: ProductItem, variant: ProductVariant) => {
    setBagItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.variant.id === variant.id
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variant.id === variant.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
  };

  const handleUpdateBagQty = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.variant.id === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromBag = (productId: string, variantId: string) => {
    setBagItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const handleRequestProductQuote = (
    product: ProductItem,
    variant: ProductVariant
  ) => {
    setActiveProduct(null);
    setInquiryType('Bulk / Wholesale Quote');
    setInquiryMessage(
      `Requesting pricing and availability for: ${product.name} (${variant.label}).`
    );
    setInquirySubmittedRef(null);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyText = (key: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim() || !inquiryMessage.trim()) {
      setInquiryError(
        'Please provide your name, phone number, and inquiry details.'
      );
      return;
    }
    setInquiryError('');
    const refCode = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setInquirySubmittedRef(refCode);
    setInquiryMessage('');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display focus-visible:outline-2 focus-visible:outline-blue-700 rounded"
          >
            {shopProfile.brandName}
          </a>

          {/* Zone 2: 4 Single-line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#catalog"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Catalog
            </a>
            <a
              href="#categories"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Categories
            </a>
            <a
              href="#about"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About Shop
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Inquiry Bag</span>
              <span className="font-mono-tabular text-slate-300">
                ({totalBagCount})
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1"
          >
            <a
              href="#catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Catalog
            </a>
            <a
              href="#categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Categories
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              About Shop
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* Section 1: Storefront Hero */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-xs sm:text-sm font-medium text-blue-700 tracking-wide">
                  {shopProfile.tagline} · Est. {shopProfile.establishedYear}
                </p>

                <h1 className="mt-3 text-[clamp(2.15rem,3.6vw,3.25rem)] font-bold text-slate-900 tracking-tight leading-[1.1] [text-wrap:balance]">
                  {shopProfile.heroTitle}
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {shopProfile.heroSubtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#catalog"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    <span>Browse Catalog</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    Send Bulk Inquiry
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src="/src/assets/images/hero_mobile_showcase_1795525991513.jpg"
                    alt={`${shopProfile.brandName} flagship showroom display table`}
                    fallbackTitle={shopProfile.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* 4-Column Shop Assurances Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-10 border-t border-slate-200">
              {SHOP_ASSURANCES.map((item) => (
                <div key={item.title}>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Product Catalog & Technical Specifications */}
        <section
          id="catalog"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20"
        >
          <div id="categories" className="scroll-mt-24">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                  Product Catalog & Specifications
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                  Inspect detailed hardware specifications, storage configurations,
                  and retail or bulk pricing. Click any product to view its full
                  spec sheet.
                </p>
              </div>

              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search models, brands, specs..."
                  aria-label="Search mobile catalog"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="mt-8 overflow-x-auto pb-1">
              <div
                role="tablist"
                aria-label="Product categories"
                className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl"
              >
                {CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3-Column Uniform Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-base font-medium text-slate-900">
                No products match your current filter.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try clearing your search term or switching back to all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product) => {
                const defaultVariant = product.variants[0];
                return (
                  <article
                    key={product.id}
                    className="group rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProduct(product)}
                      className="aspect-[4/3] w-full bg-slate-100 overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-blue-700"
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.name}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </button>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                          <span className="uppercase tracking-wider font-medium">
                            {product.brand} / {product.category}
                          </span>
                          <span className="text-blue-700 font-medium whitespace-nowrap">
                            {defaultVariant.stockStatus}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="mt-1.5 text-left block w-full focus-visible:outline-2 focus-visible:outline-blue-700 rounded"
                        >
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {product.name}
                          </h3>
                        </button>

                        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {product.shortSpec}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div>
                          <span className="block text-[11px] text-slate-500">
                            Starting from
                          </span>
                          <span className="text-base sm:text-lg font-semibold text-slate-900 font-mono-tabular">
                            {formatCurrency(
                              defaultVariant.priceInr,
                              defaultVariant.priceUsd,
                              shopProfile.currency
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveProduct(product)}
                            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                          >
                            View Specs
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleAddToBag(product, defaultVariant);
                              setIsBagOpen(true);
                            }}
                            className="px-3.5 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 3: About Shop, Quality Standards & Editable Store Profile */}
        <section
          id="about"
          className="bg-white border-y border-slate-200 py-14 lg:py-20 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Quality Standards & Sourcing Commitment
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                Built on transparent pricing, sealed factory sourcing, and
                dependable after-sales support for everyday buyers and trade
                partners alike.
              </p>

              <div className="mt-8 divide-y divide-slate-200 border-t border-b border-slate-200">
                {QUALITY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4"
                  >
                    <div className="sm:col-span-5">
                      <h3 className="text-base font-semibold text-slate-900">
                        <span className="font-mono-tabular text-blue-700 mr-2">
                          {pillar.index}
                        </span>
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="sm:col-span-7 text-sm text-slate-600 leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editable Store Profile Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Shop Profile & Trade Credentials
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Update any shop detail below to match your business.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditShopOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Info</span>
                  </button>
                </div>

                <dl className="mt-5 space-y-3.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Store Name</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {shopProfile.brandName}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Proprietor / Lead</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {shopProfile.ownerName}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Established</dt>
                    <dd className="font-medium text-slate-900 font-mono-tabular text-right">
                      {shopProfile.establishedYear}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">GST / Trade ID</dt>
                    <dd className="font-medium text-slate-900 font-mono-tabular text-right">
                      {shopProfile.gstNumber}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0">Showroom</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {shopProfile.address}, {shopProfile.cityRegion}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500 shrink-0">Hours</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {shopProfile.businessHours}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Contact & Direct Trade Inquiry */}
        <section
          id="contact"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 scroll-mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                  Contact & Bulk Quote Desk
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Reach out for retail reservations, multi-unit corporate quotes,
                  or showroom walk-in availability.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-slate-500">
                        Phone & WhatsApp Desk
                      </span>
                      <span className="text-sm font-semibold text-slate-900 font-mono-tabular">
                        {shopProfile.phone}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText('phone', shopProfile.phone)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-start gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-blue-700 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <span className="block text-xs font-medium text-slate-500">
                        Sales & Wholesale Email
                      </span>
                      <span className="text-sm font-semibold text-slate-900 break-all">
                        {shopProfile.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText('email', shopProfile.email)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-slate-500">
                        Showroom Address
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        {shopProfile.address}, {shopProfile.cityRegion}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                    <Clock className="w-4 h-4 text-blue-700 mt-1 shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-slate-500">
                        Business Hours
                      </span>
                      <span className="text-sm text-slate-700">
                        {shopProfile.businessHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                {inquirySubmittedRef ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        Inquiry #{inquirySubmittedRef} Received
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you, {inquiryName}. Our counter team will call or
                        message you at{' '}
                        <span className="font-medium text-slate-900">
                          {inquiryPhone}
                        </span>{' '}
                        shortly with stock confirmation and pricing.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInquirySubmittedRef(null)}
                      className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-100">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Request a Quote or Callback
                      </h3>
                      <span className="text-xs text-slate-500">
                        Same-day response
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inq-name"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Full Name *
                        </label>
                        <input
                          id="inq-name"
                          type="text"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Rohan Sharma"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="inq-phone"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="inq-phone"
                          type="tel"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inq-email"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Email (Optional)
                        </label>
                        <input
                          id="inq-email"
                          type="email"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="inq-type"
                          className="block text-xs font-medium text-slate-700 mb-1"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id="inq-type"
                          value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-700 focus:outline-none"
                        >
                          <option value="Retail Purchase">Retail Purchase</option>
                          <option value="Bulk / Wholesale Quote">
                            Bulk / Wholesale Quote
                          </option>
                          <option value="Corporate Fleet Order">
                            Corporate Fleet Order
                          </option>
                          <option value="Accessory / Service Inquiry">
                            Accessory / Service Inquiry
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="inq-msg"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Device Model, Storage & Quantity *
                      </label>
                      <textarea
                        id="inq-msg"
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Mention the phone model, storage variant, quantity, or trade-in question..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none resize-none"
                      />
                    </div>

                    {inquiryError && (
                      <p className="text-xs font-medium text-red-600">
                        {inquiryError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <div>
            <span className="font-semibold text-slate-900">
              {shopProfile.brandName}
            </span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span>{shopProfile.cityRegion}</span>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <span>© 2026 All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#catalog" className="hover:text-slate-900 transition-colors">
              Catalog
            </a>
            <a href="#about" className="hover:text-slate-900 transition-colors">
              Quality Standards
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {activeProduct && (
        <ProductDetailModal
          key={`product-${activeProduct.id}`}
          product={activeProduct}
          currency={shopProfile.currency}
          onClose={() => setActiveProduct(null)}
          onAddToBag={handleAddToBag}
          onRequestQuote={handleRequestProductQuote}
        />
      )}

      <InquiryBagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        currency={shopProfile.currency}
        shopName={shopProfile.brandName}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateBagQty}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={() => setBagItems([])}
      />

      {isEditShopOpen && (
        <EditShopModal
          key="edit-shop-modal"
          isOpen={isEditShopOpen}
          profile={shopProfile}
          onClose={() => setIsEditShopOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
}
