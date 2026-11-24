import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProductItem, ProductVariant } from '../data/shopData';
import { formatCurrency } from './ProductDetailModal';
import { ResilientImage } from './ResilientImage';

export interface BagItem {
  product: ProductItem;
  variant: ProductVariant;
  quantity: number;
}

interface InquiryBagDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  currency: 'INR' | 'USD';
  shopName: string;
  onClose: () => void;
  onUpdateQty: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearBag: () => void;
}

export function InquiryBagDrawer({
  isOpen,
  items,
  currency,
  shopName,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: InquiryBagDrawerProps) {
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [confirmedOrderRef, setConfirmedOrderRef] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const totalInr = items.reduce(
    (sum, item) => sum + item.variant.priceInr * item.quantity,
    0
  );
  const totalUsd = items.reduce(
    (sum, item) => sum + item.variant.priceUsd * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your name and phone number to confirm.');
      return;
    }
    if (fulfillment === 'delivery' && !customerAddress.trim()) {
      setFormError('Please provide a delivery address for courier dispatch.');
      return;
    }
    setFormError('');
    const refId = `MM-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderRef(refId);
    onClearBag();
  };

  const handleClose = () => {
    setConfirmedOrderRef(null);
    setFormError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Order and Inquiry Bag"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col border-l border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Order & Inquiry Bag
            </h2>
            <p className="text-xs text-slate-500">
              {items.length === 0
                ? 'No devices selected'
                : `${items.reduce((a, b) => a + b.quantity, 0)} unit(s) ready for order or quote`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrderRef ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Request #{confirmedOrderRef} Confirmed
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Thank you, {customerName}. Our sales counter at {shopName} has
                  logged your selection and will confirm stock & GST invoice on{' '}
                  <span className="font-medium text-slate-900">{customerPhone}</span>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span>Fulfillment</span>
                  <span className="font-medium text-slate-900">
                    {fulfillment === 'pickup' ? 'Showroom Pickup' : 'Insured Courier Dispatch'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Option</span>
                  <span className="font-medium text-slate-900">
                    Pay at Counter / UPI / COD
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-sm font-medium text-slate-900">
                Your inquiry bag is currently empty.
              </p>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                Select any smartphone, wearable, or wholesale lot from the catalog to build an order or request a dealer quote.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex gap-4 p-3.5 rounded-xl border border-slate-200 bg-white"
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <ResilientImage
                      src={item.product.image}
                      alt={item.product.name}
                      fallbackTitle={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem(item.product.id, item.variant.id)
                        }
                        aria-label={`Remove ${item.product.name}`}
                        className="text-slate-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 truncate">
                      {item.variant.label}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.variant.id, -1)
                          }
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold font-mono-tabular">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.variant.id, 1)
                          }
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-slate-900 font-mono-tabular">
                        {formatCurrency(
                          item.variant.priceInr * item.quantity,
                          item.variant.priceUsd * item.quantity,
                          currency
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <form onSubmit={handleCheckout} className="pt-4 border-t border-slate-200 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setFulfillment('pickup')}
                      className={`py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        fulfillment === 'pickup'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Store Pickup
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillment('delivery')}
                      className={`py-2 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        fulfillment === 'delivery'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Courier / COD
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                  />
                  {fulfillment === 'delivery' && (
                    <textarea
                      rows={2}
                      placeholder="Delivery Address & Postal Code *"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none resize-none"
                    />
                  )}
                </div>

                {formError && (
                  <p className="text-xs font-medium text-red-600">{formError}</p>
                )}

                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Estimated Total (Incl. GST)</span>
                    <span className="text-lg font-semibold text-slate-900 font-mono-tabular">
                      {formatCurrency(totalInr, totalUsd, currency)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors"
                  >
                    <span>Confirm Order / Quote Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
