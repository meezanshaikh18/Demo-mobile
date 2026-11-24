import React, { useState } from 'react';
import { X, RotateCcw, Save } from 'lucide-react';
import { DEFAULT_SHOP_PROFILE, ShopProfile } from '../data/shopData';

interface EditShopModalProps {
  isOpen: boolean;
  profile: ShopProfile;
  onClose: () => void;
  onSave: (updated: ShopProfile) => void;
}

export function EditShopModal({
  isOpen,
  profile,
  onClose,
  onSave,
}: EditShopModalProps) {
  const [draft, setDraft] = useState<ShopProfile>(profile);

  if (!isOpen) return null;

  const handleChange = (field: keyof ShopProfile, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft(DEFAULT_SHOP_PROFILE);
    onSave(DEFAULT_SHOP_PROFILE);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-shop-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 id="edit-shop-title" className="text-lg font-semibold text-slate-900">
              Edit Your Mobile Shop Details
            </h2>
            <p className="text-xs text-slate-500">
              Customize your shop name, contact details, address, and currency directly in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Shop / Brand Name
              </label>
              <input
                type="text"
                value={draft.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Owner / Proprietor Name
              </label>
              <input
                type="text"
                value={draft.ownerName}
                onChange={(e) => handleChange('ownerName', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Established Year
              </label>
              <input
                type="text"
                value={draft.establishedYear}
                onChange={(e) => handleChange('establishedYear', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                GST / Trade Registration
              </label>
              <input
                type="text"
                value={draft.gstNumber}
                onChange={(e) => handleChange('gstNumber', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Display Currency
              </label>
              <select
                value={draft.currency}
                onChange={(e) =>
                  handleChange('currency', e.target.value as 'INR' | 'USD')
                }
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:border-blue-700 focus:outline-none"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Tagline / Positioning Line
            </label>
            <input
              type="text"
              value={draft.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={draft.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Hero Description
            </label>
            <textarea
              rows={2}
              value={draft.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={draft.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={draft.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={draft.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={draft.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                City, State & Postal Code
              </label>
              <input
                type="text"
                value={draft.cityRegion}
                onChange={(e) => handleChange('cityRegion', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Opening Hours
            </label>
            <input
              type="text"
              value={draft.businessHours}
              onChange={(e) => handleChange('businessHours', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-blue-700 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
