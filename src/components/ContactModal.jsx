import React from 'react';

const formatPhoneNumber = (phoneStr) => {
  if (!phoneStr) return '';
  const prefixes = ['+58', '+1', '+34', '+57', '+54', '+56', '+52', '+51'];
  const prefix = prefixes.find(code => phoneStr.startsWith(code));

  if (prefix) {
    const numberBody = phoneStr.replace(prefix, '');
    if (numberBody.length === 10 || numberBody.length === 9) {
      return `${prefix} ${numberBody.slice(0, 3)} ${numberBody.slice(3, 6)} ${numberBody.slice(6)}`;
    }
    return `${prefix} ${numberBody}`;
  }
  return phoneStr;
};

export default function ContactModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
      <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={onClose}></div>
      
      <div className="bg-slate-800 rounded-3xl p-6 max-w-sm w-full border border-slate-700 relative z-10 pointer-events-auto animate-in zoom-in-95 duration-200 shadow-[0_25px_70px_-10px_rgba(0,0,0,0.6)]">
        <div className="flex justify-between items-start mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl rounded-full shadow-md overflow-hidden border border-slate-700/50">
            {contact.avatarUrl ? (
              <img src={contact.avatarUrl} alt={contact.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              `${contact.name[0]}${contact.lastName ? contact.lastName[0] : ''}`
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-950 p-2.5 rounded-full transition-colors border border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 break-words leading-tight">{contact.name} {contact.lastName}</h3>
        {contact.nickname && <p className="text-sm text-indigo-400 font-semibold mt-1">"{contact.nickname}"</p>}
        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Teléfono</span>
            <span className="text-indigo-300 font-mono bg-slate-900/60 border border-slate-700/60 px-3 py-2 rounded-xl mt-1.5 inline-block w-fit text-sm">
              {formatPhoneNumber(contact.phone)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Notas Registradas</span>
            <div className="max-h-32 overflow-y-auto mt-1.5 bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <p className="text-sm text-slate-300 whitespace-pre-wrap break-words">
                {contact.notes || <span className="italic text-slate-500 text-xs">El usuario no agregó notas a este contacto.</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}