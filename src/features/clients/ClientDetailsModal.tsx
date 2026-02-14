import { useState, useEffect } from 'react';
import { X, Calendar, Globe, Mail, Phone, DollarSign, ShieldCheck, Server, Save, RotateCcw, Briefcase, Link as LinkIcon, FileText} from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';

interface ClientDetailsModalProps {
  client: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedClient: any) => void;
}

// Helper: Convert YYYY-MM-DD to DD/MM/YYYY for display
const formatDisplayDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; 
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const ClientDetailsModal = ({ client, isOpen, onClose, onUpdate }: ClientDetailsModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (isOpen && client) {
      // Ensure arrays exist for new fields to prevent crashes
      setFormData({
        ...client,
        serviceList: client.serviceList || (client.service ? [client.service] : []),
        projectName: client.projectName || '',
        projectLink: client.projectLink || '',
        projectSummary: client.projectSummary || ''
      });
      setIsEditing(false);
    }
  }, [isOpen, client]);

  if (!isOpen || !client || !formData) return null;

  const handleSave = () => {
    if (onUpdate) onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(client); 
    setIsEditing(false);
  };

  // Reusable Input Component
  const EditableInput = ({ icon: Icon, value, field, type = "text", placeholder = "" }: any) => {
    if (!isEditing) {
      return (
        <div className="flex items-center gap-3 text-gray-300">
          <Icon size={16} className="text-blazing shrink-0" />
          {type === 'url' && value ? (
             <a href={value} target="_blank" rel="noreferrer" className="truncate hover:text-white hover:underline decoration-blazing underline-offset-4 transition-all">
               {value}
             </a>
          ) : (
             <span className="truncate">{value || <span className="text-gray-600 italic">Not set</span>}</span>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 w-full">
        <Icon size={16} className="text-gray-500 shrink-0" />
        <input
          type={type}
          value={value || ''}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          className="w-full bg-dark-950 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl border border-dark-800 bg-dark-900 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-dark-950 to-dark-900 border-b border-dark-800 shrink-0">
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="rounded-full bg-black/20 p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="absolute -bottom-10 left-8 flex items-end gap-4 w-[calc(100%-4rem)]">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border-4 border-dark-900 bg-dark-800 text-3xl font-bold text-blazing shadow-lg shrink-0">
              {formData.name.charAt(0)}
            </div>
            <div className="mb-3 w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-2xl font-bold text-white font-display bg-dark-950 border border-dark-700 rounded px-2 py-1 w-full focus:border-blazing focus:outline-none mb-1"
                />
              ) : (
                <h2 className="text-2xl font-bold text-white font-display tracking-tight truncate">{formData.name}</h2>
              )}
              
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="bg-dark-950 border border-dark-700 rounded px-2 py-0.5 text-xs text-white focus:border-blazing focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="overdue">Overdue</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <StatusBadge status={formData.status} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="pt-16 pb-8 px-8 space-y-8 overflow-y-auto">
          
          {/* 1. PROJECT SCOPE (NEW SECTION) */}
          <div className="space-y-3">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
               <Briefcase size={14} /> Project Scope
             </h3>
             <div className="rounded-xl border border-dark-800 bg-dark-950/50 p-4 space-y-4">
               {isEditing ? (
                 <>
                   <EditableInput icon={FileText} value={formData.projectName} field="projectName" placeholder="Project Name" />
                   <div className="flex items-start gap-2 w-full">
                      <Briefcase size={16} className="text-gray-500 mt-1 shrink-0" />
                      <textarea
                        value={formData.projectSummary || ''}
                        onChange={(e) => setFormData({ ...formData, projectSummary: e.target.value })}
                        className="w-full bg-dark-950 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none min-h-[60px]"
                        placeholder="Project Summary"
                      />
                   </div>
                   <EditableInput icon={LinkIcon} value={formData.projectLink} field="projectLink" type="url" placeholder="Project Link (URL)" />
                 </>
               ) : (
                 <>
                   <div className="flex justify-between items-start">
                     <div>
                       <h4 className="text-white font-bold text-lg">{formData.projectName || 'Untitled Project'}</h4>
                       <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                         {formData.projectSummary || 'No summary provided.'}
                       </p>
                     </div>
                     {formData.projectLink && (
                       <a 
                         href={formData.projectLink} 
                         target="_blank" 
                         rel="noreferrer"
                         className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 text-xs font-bold text-white hover:bg-dark-700 transition-colors"
                       >
                         <LinkIcon size={12} /> Open Link
                       </a>
                     )}
                   </div>
                   
                   {/* Service Chips */}
                   <div className="flex flex-wrap gap-2 pt-2 border-t border-dark-800/50">
                      {(formData.serviceList && formData.serviceList.length > 0 ? formData.serviceList : [formData.service]).map((srv: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-blazing/10 text-blazing border border-blazing/20">
                          {srv}
                        </span>
                      ))}
                   </div>
                 </>
               )}
             </div>
          </div>

          {/* 2. Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-dark-950 border border-dark-800 p-4">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <DollarSign size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              </div>
              {isEditing ? (
                 <input
                  type="text"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-700 rounded px-2 py-1 text-lg font-mono text-white focus:border-blazing focus:outline-none"
                />
              ) : (
                <div className="text-xl font-mono text-white">{formData.revenue}</div>
              )}
            </div>
            <div className="rounded-xl bg-dark-950 border border-dark-800 p-4">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Next Invoice Due</span>
              </div>
              {isEditing ? (
                 <input
                  type="date"
                  value={formData.nextDue}
                  onChange={(e) => setFormData({ ...formData, nextDue: e.target.value })}
                  className="w-full bg-dark-900 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none"
                />
              ) : (
                <div className={`text-xl font-mono ${formData.status === 'overdue' ? 'text-red-400 font-bold' : 'text-white'}`}>
                  {formatDisplayDate(formData.nextDue)}
                </div>
              )}
            </div>
          </div>

          {/* 3. Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <EditableInput icon={Mail} value={formData.email} field="email" type="email" placeholder="Email Address" />
              <EditableInput icon={Phone} value={formData.phone} field="phone" type="tel" placeholder="Phone Number" />
              <EditableInput icon={Globe} value={formData.website} field="website" type="url" placeholder="Website URL" />
            </div>
          </div>

          {/* 4. Technical Timeline */}
          <div className="rounded-xl border border-dark-800 bg-dark-800/30 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Server size={18} className="text-blazing" /> Technical Timeline
            </h3>
            
            <div className="space-y-3">
              {/* Domain */}
              <div className="flex justify-between items-center border-b border-dark-700 pb-2">
                <span className="text-sm text-gray-400 flex items-center gap-2"><ShieldCheck size={14} /> Domain Expiry</span>
                {isEditing ? (
                  <input type="date" value={formData.domainExpiryDate} onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })} className="bg-dark-950 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none" />
                ) : (<span className="font-mono text-white">{formatDisplayDate(formData.domainExpiryDate)}</span>)}
              </div>
              
              {/* Hosting */}
              <div className="flex justify-between items-center border-b border-dark-700 pb-2">
                <span className="text-sm text-gray-400 flex items-center gap-2"><Server size={14} /> Hosting Renewal</span>
                {isEditing ? (
                  <input type="date" value={formData.hostingExpiry} onChange={(e) => setFormData({ ...formData, hostingExpiry: e.target.value })} className="bg-dark-950 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none" />
                ) : (<span className="font-mono text-white">{formatDisplayDate(formData.hostingExpiry)}</span>)}
              </div>

              {/* AMC */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-2"><Calendar size={14} /> Maintenance (AMC)</span>
                {isEditing ? (
                  <input type="date" value={formData.amcDue} onChange={(e) => setFormData({ ...formData, amcDue: e.target.value })} className="bg-dark-950 border border-dark-700 rounded px-2 py-1 text-sm text-white focus:border-blazing focus:outline-none" />
                ) : (<span className="font-mono text-white">{formatDisplayDate(formData.amcDue)}</span>)}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-dark-950 px-8 py-4 border-t border-dark-800 flex justify-between items-center shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Close</button>
          
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"><RotateCcw size={16} /> Revert</button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 text-sm font-bold bg-blazing text-white rounded-lg hover:bg-blazing-light transition-colors shadow-lg shadow-blazing/20 animate-in fade-in"><Save size={16} /> Save Changes</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-6 py-2 text-sm font-bold bg-dark-800 text-white rounded-lg border border-dark-700 hover:bg-dark-700 hover:border-gray-500 transition-all">Edit Details</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};