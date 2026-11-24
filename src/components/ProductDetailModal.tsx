import { useState } from 'react';
import { X, Check, ShoppingBag, MessageSquare } from 'lucide-react';
import { ProductItem, ProductVariant } from '../data/shopData';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  currency: 'INR' | 'USD';
  onClose: () => void;
  onAddToBag: (product: ProductItem, variant: ProductVariant) => void;
  onRequestQuote: (product: ProductItem, variant: ProductVariant) => void;
}

export function formatCurrency(priceInr: number, priceUsd: number, currency: 'INR' | 'USD'): string {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(priceInr);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceUsd);
}

export function ProductDetailModal({
  product,
  currency,
  onClose,
  onAddToBag,
  onRequestQuote,
}: ProductDetailModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id ?? ''
  );
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    onAddToBag(product, activeVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <span>{product.brand}</span>
            <span aria-hidden="true">/</span>
            <span>{product.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-slate-100 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-white border border-slate-200">
              <ResilientImage
                src={product.image}
                alt={product.name}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="text-slate-500">Condition</span>
                <span className="font-medium text-slate-900">{product.condition}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-200/80">
                <span className="text-slate-500">Order Quantity</span>
                <span className="font-medium text-slate-900">{product.moq}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Warranty</span>
                <span className="font-medium text-slate-900">{product.warranty}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h2
                  id="product-modal-title"
                  className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight"
                >
                  {product.name}
                </h2>
                <span className="text-2xl font-semibold text-slate-900 font-mono-tabular">
                  {formatCurrency(activeVariant.priceInr, activeVariant.priceUsd, currency)}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-blue-700">{activeVariant.stockStatus}</span>
                <span aria-hidden="true">·</span>
                <span>GST Invoice Included</span>
                <span aria-hidden="true">·</span>
                <span>Same-Day Dispatch</span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Select Configuration / Lot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all text-sm flex items-center justify-between gap-2 focus-visible:outline-2 focus-visible:outline-blue-700 ${
                          isSelected
                            ? 'border-blue-700 bg-blue-50/60 text-slate-900 font-medium'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{variant.label}</span>
                        <span className="font-mono-tabular text-xs text-slate-600 shrink-0">
                          {formatCurrency(variant.priceInr, variant.priceUsd, currency)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Technical Specifications
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {product.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-1 sm:grid-cols-3 px-4 py-2.5 text-sm bg-white"
                    >
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="sm:col-span-2 text-slate-900 mt-0.5 sm:mt-0">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Inquiry Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => onRequestQuote(product, activeVariant)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Bulk / Direct Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
