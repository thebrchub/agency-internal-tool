import React, { useState, useEffect } from 'react';
import { Server, Mail, Calendar, ShieldCheck, Phone, Trash2, Save, Check, Layers, Link as LinkIcon, FileText, Briefcase } from 'lucide-react';

const CURRENCIES = [
  { code: 'INR', symbol: '₹' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
];

const SERVICE_MENU = [
  {
    category: 'Engineering',
    items: [
      { id: 'website', label: 'Website Dev' },
      { id: 'saas', label: 'SaaS Platform' },
      { id: 'mobile', label: 'Mobile App' },
      { id: 'custom', label: 'Custom Software' }
    ]
  },
  {
    category: 'Growth',
    items: [
      { id: 'seo', label: 'SEO' },
      { id: 'ads', label: 'Performance Ads' },
      { id: 'leads', label: 'Lead Gen' }
    ]
  },
  {
    category: 'Brand & Social',
    items: [
      { id: 'branding', label: 'Branding & Identity' },
      { id: 'social', label: 'Social Media' },
      { id: 'content', label: 'Content Strategy' }
    ]
  }
];

const DRAFT_KEY = 'blazing_client_draft';

export const AddClientForm = ({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) => {
  
  const loadDraft = () => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) return JSON.parse(saved);
    return null;
  };

  const draft = loadDraft();

  const [formData, setFormData] = useState(draft?.formData || {
    name: '',
    email: '',
    phone: '',
    // NEW FIELDS
    projectName: '',
    projectLink: '',
    projectSummary: '',
    services: [] as string[],
    currency: 'INR',
    oneTimeRevenue: '',
    recurringRevenue: '',
  });

  const [hasHosting, setHasHosting] = useState(draft?.hasHosting || false);
  const [hasAMC, setHasAMC] = useState(draft?.hasAMC || false);
  const [dates, setDates] = useState(draft?.dates || {
    hostingExpiry: '',
    domainExpiry: '',
    amcDue: '',
    projectDate: new Date().toISOString().split('T')[0],
  });

  // Auto-Save
  useEffect(() => {
    const dataToSave = { formData, hasHosting, hasAMC, dates };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(dataToSave));
  }, [formData, hasHosting, hasAMC, dates]);

  const getCurrencySymbol = () => CURRENCIES.find(c => c.code === formData.currency)?.symbol || '₹';

  const toggleService = (serviceLabel: string) => {
    setFormData((prev: any) => {
      const currentServices = prev.services || [];
      if (currentServices.includes(serviceLabel)) {
        return { ...prev, services: currentServices.filter((s: string) => s !== serviceLabel) };
      } else {
        return { ...prev, services: [...currentServices, serviceLabel] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fallback: If no project name is given, use the Client Name (e.g. "Urban Cafe Website")
    const finalProjectName = formData.projectName || `${formData.name} Project`;

    const serviceDisplay = formData.services.length > 0 
      ? formData.services.join(' + ') 
      : 'Consultation';

    onSubmit({
      ...formData,
      projectName: finalProjectName,
      service: serviceDisplay,
      serviceList: formData.services,
      ...dates,
      hasHosting,
      hasAMC,
      totalValue: (Number(formData.oneTimeRevenue) || 0) + (Number(formData.recurringRevenue) || 0)
    });
    localStorage.removeItem(DRAFT_KEY);
  };

  const clearForm = () => {
    if (confirm('Are you sure you want to clear this form?')) {
      localStorage.removeItem(DRAFT_KEY);
      setFormData({
        name: '', email: '', phone: '', services: [],
        projectName: '', projectLink: '', projectSummary: '',
        currency: 'INR', oneTimeRevenue: '', recurringRevenue: ''
      });
      setHasHosting(false);
      setHasAMC(false);
      setDates({
        hostingExpiry: '', domainExpiry: '', amcDue: '',
        projectDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-4">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-dark-800">
        <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
          <Save size={12} /> Auto-save active
        </span>
        <button type="button" onClick={clearForm} className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors">
          <Trash2 size={12} /> Clear Form
        </button>
      </div>

      {/* --- SECTION 1: CLIENT IDENTITY --- */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Client Identity</label>
          <input
            type="text"
            required
            className="w-full rounded-xl bg-dark-950 border border-dark-800 px-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 focus:bg-black transition-all duration-200"
            placeholder="Business / Client Name (e.g. Urban Cafe)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <Mail size={18} className="absolute left-3.5 top-3.5 text-dark-700 group-focus-within:text-blazing transition-colors" />
            <input
              type="email"
              required
              className="w-full rounded-xl bg-dark-950 border border-dark-800 pl-11 pr-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 transition-all"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="relative group">
            <Phone size={18} className="absolute left-3.5 top-3.5 text-dark-700 group-focus-within:text-blazing transition-colors" />
            <input
              type="tel"
              className="w-full rounded-xl bg-dark-950 border border-dark-800 pl-11 pr-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 transition-all"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* --- SECTION 2: PROJECT DETAILS (NEW) --- */}
      <div className="space-y-4 pt-2 border-t border-dark-800/50">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
           <Briefcase size={14} /> Project Scope
        </label>

        {/* Project Name & Link */}
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            className="w-full rounded-xl bg-dark-950 border border-dark-800 px-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 transition-all"
            placeholder="Project Name (Optional, e.g. 'Diwali Campaign')"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />
          
          <div className="relative group">
            <LinkIcon size={18} className="absolute left-3.5 top-3.5 text-dark-700 group-focus-within:text-blazing transition-colors" />
            <input
              type="url"
              className="w-full rounded-xl bg-dark-950 border border-dark-800 pl-11 pr-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 transition-all"
              placeholder="Live Link / Website / Social URL (Optional)"
              value={formData.projectLink}
              onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
            />
          </div>
        </div>

        {/* Project Summary */}
        <div className="relative group">
          <FileText size={18} className="absolute left-3.5 top-3.5 text-dark-700 group-focus-within:text-blazing transition-colors" />
          <textarea
            className="w-full rounded-xl bg-dark-950 border border-dark-800 pl-11 pr-4 py-3.5 text-white placeholder-dark-700 shadow-inner focus:border-blazing focus:ring-1 focus:ring-blazing/50 transition-all min-h-[80px] resize-none"
            placeholder="Short Summary (e.g. 'Redesigning the home page for better conversions...')"
            value={formData.projectSummary}
            onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
          />
        </div>
      </div>

      {/* --- SECTION 3: SERVICE SELECTION --- */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
           <Layers size={14} /> Services Rendered
        </label>
        
        <div className="rounded-xl border border-dark-800 bg-dark-950/50 p-4 space-y-6">
          {SERVICE_MENU.map((category) => (
            <div key={category.category}>
              <h4 className="text-[10px] font-bold uppercase text-dark-500 mb-2.5 ml-1">{category.category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => {
                  const isSelected = (formData.services || []).includes(item.label);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleService(item.label)}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 text-left ${
                        isSelected 
                          ? 'border-blazing bg-blazing/10 text-white shadow-[0_0_10px_rgba(255,69,0,0.15)]' 
                          : 'border-dark-800 bg-dark-900 text-gray-400 hover:border-dark-700 hover:text-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-blazing border-blazing' : 'border-gray-600'
                      }`}>
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 italic ml-1 min-h-[1.2em]">
          {(formData.services || []).length > 0 
            ? `Selected: ${(formData.services || []).join(', ')}` 
            : 'Select at least one service'}
        </div>
      </div>

      {/* --- SECTION 4: FINANCIALS --- */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Project Value</label>
        
        <div className="space-y-4">
          <div className="flex h-12 w-full rounded-xl border border-dark-800 bg-dark-950 shadow-inner focus-within:border-blazing focus-within:ring-1 focus-within:ring-blazing/50 overflow-hidden transition-all">
            <select 
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              className="h-full bg-dark-900 text-gray-400 px-3 text-xs font-bold border-r border-dark-800 outline-none cursor-pointer hover:text-white transition-colors w-[70px]"
            >
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
            <div className="flex h-full items-center pl-3 pr-4 w-full">
              <span className="text-gray-600 text-lg mr-2 font-mono">{getCurrencySymbol()}</span>
              <input
                type="number"
                className="w-full bg-transparent text-white font-mono outline-none placeholder-dark-800 text-lg h-full"
                placeholder="0"
                value={formData.oneTimeRevenue}
                onChange={(e) => setFormData({ ...formData, oneTimeRevenue: e.target.value })}
              />
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider whitespace-nowrap">One-Time</span>
            </div>
          </div>

          <div className="flex h-12 w-full rounded-xl border border-dark-800 bg-dark-950 shadow-inner focus-within:border-blazing focus-within:ring-1 focus-within:ring-blazing/50 overflow-hidden transition-all">
            <div className="flex h-full items-center justify-center bg-dark-900 px-3 border-r border-dark-800 w-[70px]">
               <span className="text-xs font-bold text-gray-500">{formData.currency}</span>
            </div>
            <div className="flex h-full items-center pl-3 pr-4 w-full">
              <span className="text-gray-600 text-lg mr-2 font-mono">{getCurrencySymbol()}</span>
              <input
                type="number"
                className="w-full bg-transparent text-white font-mono outline-none placeholder-dark-800 text-lg h-full"
                placeholder="0"
                value={formData.recurringRevenue}
                onChange={(e) => setFormData({ ...formData, recurringRevenue: e.target.value })}
              />
              <span className="text-[10px] text-gray-600 uppercase font-bold tracking-wider whitespace-nowrap">Yearly</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 5: AUTOMATION TRIGGERS --- */}
      <div className="rounded-2xl border border-dark-800 bg-gradient-to-br from-dark-900 to-dark-950 p-5 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blazing/5 rounded-full blur-3xl -z-10 transition-opacity opacity-50 group-hover:opacity-100"></div>

        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-blazing/10 text-blazing">
            <Server size={16} /> 
          </div>
          Automation Hub
        </h3>

        <div className="space-y-4">
          <div className={`transition-all duration-300 ${hasHosting ? 'bg-dark-800/50 p-3 rounded-xl border border-dark-700' : ''}`}>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${hasHosting ? 'bg-blazing border-blazing shadow-lg shadow-blazing/20' : 'border-gray-600 bg-transparent'}`}>
                {hasHosting && <ShieldCheck size={12} className="text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={hasHosting} onChange={() => setHasHosting(!hasHosting)} />
              <span className={`text-sm transition-colors ${hasHosting ? 'text-white font-medium' : 'text-gray-400'}`}>Manage Hosting & Domain</span>
            </label>

            {hasHosting && (
              <div className="grid grid-cols-2 gap-3 mt-3 animate-in fade-in slide-in-from-top-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-500 ml-1">Hosting Expiry</span>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-dark-950 border border-dark-700 px-3 py-2 text-sm text-gray-300 focus:border-blazing focus:ring-1 focus:ring-blazing focus:outline-none"
                    value={dates.hostingExpiry}
                    onChange={(e) => setDates({ ...dates, hostingExpiry: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-500 ml-1">Domain Expiry</span>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-dark-950 border border-dark-700 px-3 py-2 text-sm text-gray-300 focus:border-blazing focus:ring-1 focus:ring-blazing focus:outline-none"
                    value={dates.domainExpiry}
                    onChange={(e) => setDates({ ...dates, domainExpiry: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`transition-all duration-300 ${hasAMC ? 'bg-dark-800/50 p-3 rounded-xl border border-dark-700' : 'pt-2 border-t border-dark-800/50'}`}>
            <label className="flex items-center gap-3 cursor-pointer select-none">
               <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${hasAMC ? 'bg-blazing border-blazing shadow-lg shadow-blazing/20' : 'border-gray-600 bg-transparent'}`}>
                {hasAMC && <Calendar size={12} className="text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={hasAMC} onChange={() => setHasAMC(!hasAMC)} />
              <span className={`text-sm transition-colors ${hasAMC ? 'text-white font-medium' : 'text-gray-400'}`}>Enable Maintenance Reminders</span>
            </label>

            {hasAMC && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-gray-500 ml-1">Next Maintenance Due</span>
                  <input
                    type="date"
                    className="w-full rounded-lg bg-dark-950 border border-dark-700 px-3 py-2 text-sm text-gray-300 focus:border-blazing focus:ring-1 focus:ring-blazing focus:outline-none"
                    value={dates.amcDue}
                    onChange={(e) => setDates({ ...dates, amcDue: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-dark-800 bg-dark-900 py-3.5 font-medium text-gray-400 hover:bg-dark-800 hover:text-white hover:border-dark-700 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-blazing py-3.5 font-bold text-white hover:bg-blazing-light transition-all shadow-lg shadow-blazing/25 hover:shadow-blazing/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          Add Client
        </button>
      </div>
    </form>
  );
};