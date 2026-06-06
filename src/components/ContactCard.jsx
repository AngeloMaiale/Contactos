import React from 'react';

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

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

export default function ContactCard({ contact, version, onEdit, onDelete, onSelect }) {
  const { id, name, lastName, nickname, phone, notes, avatarUrl } = contact;
  const fullName = `${name} ${lastName}`.trim();
  
  const initials = `${name?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  const defaultAvatar = (
    <div className="w-full h-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl rounded-full shadow-inner">
      {initials}
    </div>
  );

  const renderAvatar = () => {
    if (avatarUrl && avatarUrl.trim() !== '') {
      return (
        <img 
          src={avatarUrl} 
          alt={fullName} 
          className="w-full h-full object-cover" 
          onError={(e) => { 
            e.target.onerror = null;
            e.target.parentElement.innerHTML = `<div class="w-full h-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl rounded-full">${initials}</div>`;
          }} 
        />
      );
    }
    return defaultAvatar;
  };

  if (version === 'grid') {
    return (
      <div className="group bg-slate-900 border border-slate-800 rounded-3xl py-5 px-4 shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-full h-full min-h-[340px] box-border min-w-0">
        <div className="flex flex-col items-center text-center w-full min-w-0 cursor-pointer flex-1" onClick={() => onSelect(contact)}>
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-md flex-shrink-0 border-2 border-slate-800 bg-slate-950">
            {renderAvatar()}
          </div>
          
          <div className="w-full min-w-0 px-2">
            <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors truncate w-full" title={fullName}>
              {fullName}
            </h3>
            {nickname && <p className="text-xs italic text-slate-500 mt-0.5 truncate w-full" title={`"${nickname}"`}>"{nickname}"</p>}
            
            <div className="inline-block bg-indigo-950/60 text-indigo-300 border border-indigo-900/50 font-semibold text-xs rounded-full px-4 py-1.5 mt-3 max-w-full truncate">
              {formatPhoneNumber(phone)}
            </div>

            <p className="text-sm text-slate-400 mt-4 leading-relaxed line-clamp-3 w-full" title={notes}>
              {notes || <span className="text-slate-600 italic text-xs">Sin descripción</span>}
            </p>
          </div>
        </div>

        <div className="flex gap-2 w-full mt-5 pt-3 border-t border-slate-800/60 justify-end flex-shrink-0">
          <button onClick={() => onEdit(contact)} className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors">
            <EditIcon />
          </button>
          <button onClick={() => onDelete(id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-xl transition-colors">
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  if (version === 'list') {
    return (
      <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:shadow-indigo-500/5 transition-all flex items-center justify-between w-full h-auto min-h-[6rem] box-border gap-4 min-w-0">
        <div className="flex items-center gap-5 flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(contact)}>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-800 bg-slate-950">
            {renderAvatar()}
          </div>
          
          <div className="flex-1 min-w-0 grid grid-cols-1">
            <div className="flex flex-wrap items-center gap-2 mb-1 w-full min-w-0">
              <h3 className="font-bold text-slate-100 text-lg group-hover:text-indigo-400 transition-colors truncate max-w-[60%]" title={fullName}>
                {fullName}
              </h3>
              {nickname && <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-lg truncate max-w-[35%]">"{nickname}"</span>}
            </div>
            <p className="text-sm text-indigo-400 font-semibold truncate w-full">{formatPhoneNumber(phone)}</p>
          </div>
          
          <div className="hidden md:block flex-1 min-w-0 border-l-2 border-slate-800 pl-5 ml-2 h-full max-h-[4.5rem] overflow-hidden">
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 w-full" title={notes}>
              {notes || <span className="text-slate-600 italic text-xs">Sin descripción</span>}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button onClick={() => onEdit(contact)} className="p-2.5 text-slate-400 hover:text-indigo-400 bg-slate-950 border border-slate-800 rounded-xl transition-colors shadow-sm">
            <EditIcon />
          </button>
          <button onClick={() => onDelete(id)} className="p-2.5 text-slate-400 hover:text-red-400 bg-slate-950 border border-slate-800 rounded-xl transition-colors shadow-sm">
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  if (version === 'compact') {
    return (
      <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-md hover:border-slate-700 transition-all flex items-center justify-between w-full h-auto min-h-[4rem] box-border min-w-0 gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(contact)}>
          <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-slate-800 bg-slate-950">
            {renderAvatar()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-100 text-sm truncate w-full" title={fullName}>{fullName}</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5 truncate w-full">{formatPhoneNumber(phone)}</p>
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0">
          <button onClick={() => onEdit(contact)} className="p-1.5 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-slate-800">
            <EditIcon />
          </button>
          <button onClick={() => onDelete(id)} className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800">
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  if (version === 'minimal') {
    return (
      <div className="group bg-slate-900/40 hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-xl p-2.5 transition-all flex items-center justify-between w-full min-w-0 gap-4 box-border">
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(contact)}>
          <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors truncate w-full">
              {fullName} {nickname && <span className="text-xs text-slate-500 font-normal">({nickname})</span>} 
              <span className="text-xs text-slate-600 font-normal mx-1">—</span> 
              <span className="text-xs text-slate-400 font-mono">{formatPhoneNumber(phone)}</span>
            </p>
          </div>
        </div>

        <button onClick={() => onDelete(id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 p-1 rounded-lg hover:bg-slate-800" title="Eliminar">
          <DeleteIcon />
        </button>
      </div>
    );
  }

  return null;
}