import React from 'react';
const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);
const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);
export default function ContactCard({ contact, version, onSelect, onEdit, onDelete }) {
  const { name, lastName, phone, nickname, notes, avatar } = contact;
  const fullName = `${name} ${lastName}`;
  if (version === 'grid') {
    return (
      <div className="group bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl py-5 px-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-full h-full min-h-[320px] box-border">
        <div className="flex flex-col items-center text-center cursor-pointer w-full" onClick={() => onSelect(contact)}>
          <div className="relative mb-3 flex-shrink-0">
            <img src={avatar} alt={fullName} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md z-10 relative" />
          </div>
          <div className="w-full flex items-center justify-center px-1 mb-1">
            <h3 className="font-bold text-base text-slate-800 tracking-tight leading-normal break-words w-full">
              {fullName}
            </h3>
          </div>
          <p className="text-xs text-slate-400 italic break-words w-full mb-3">
            {nickname ? `"${nickname}"` : 'Sin apodo'}
          </p>
          <span className="bg-indigo-50/80 text-indigo-600 font-bold px-4 py-1.5 rounded-xl text-xs border border-indigo-100 flex-shrink-0 mb-4 inline-block">
            {phone}
          </span>
          <div className="w-full px-1">
            <p className="text-xs text-slate-500 text-center leading-relaxed pb-1 break-words">
              {notes}
            </p>
          </div>  
        </div>      
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200/60 w-full flex-shrink-0 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => onEdit(contact)} className="flex-1 text-xs font-bold bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1">
            <EditIcon /> Editar
          </button>
          <button onClick={() => onDelete(contact.id)} className="flex-1 text-xs font-bold bg-white border border-slate-200 shadow-sm hover:border-red-300 hover:text-red-600 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1">
            <DeleteIcon /> Eliminar
          </button>
        </div>
      </div>
    );
  }

  if (version === 'list') {
    return (
      <div className="group bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex items-center justify-between w-full h-auto min-h-[6rem] box-border gap-4">
        
        <div className="flex items-center gap-5 flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(contact)}>
          <img src={avatar} alt={fullName} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm" />
          <div className="flex-1 min-w-0 grid grid-cols-1">
            <div className="flex flex-wrap items-center gap-2 mb-1 w-full min-w-0">
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors break-words w-full">{fullName}</h3>
              {nickname && <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-lg break-words">"{nickname}"</span>}
            </div>
            <p className="text-sm text-indigo-500 font-semibold">{phone}</p>
          </div>
          <div className="hidden md:block flex-1 min-w-0 border-l-2 border-slate-100 pl-5 ml-2 h-full max-h-[4.5rem] overflow-hidden text-shrink-0">
            <p className="text-xs text-slate-500 leading-relaxed break-words line-clamp-3">{notes}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button onClick={() => onEdit(contact)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors shadow-sm bg-white border border-slate-100" title="Editar">
             <EditIcon />
          </button>
          <button onClick={() => onDelete(contact.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm bg-white border border-slate-100" title="Eliminar">
             <DeleteIcon />
          </button>
        </div>
      </div>
    );
  }

  if (version === 'compact') {
    return (
      <div className="group bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center gap-3 w-full h-auto min-h-[4rem] box-border relative">
        <img src={avatar} alt={fullName} className="w-11 h-11 rounded-xl object-cover flex-shrink-0 shadow-sm" />
        <div className="flex-1 min-w-0 cursor-pointer pr-6" onClick={() => onSelect(contact)}>
          <h3 className="font-bold text-sm text-slate-800 break-words leading-tight mb-0.5">{name} {lastName[0]}.</h3>
          <p className="text-[11px] text-slate-500 font-semibold">{phone}</p>
        </div>

        <button onClick={() => onDelete(contact.id)} className="absolute right-3 top-0 bottom-0 my-auto h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-slate-100">
          <DeleteIcon />
        </button>
      </div>
    );
  }

  if (version === 'minimal') {
    return (
      <div className="group bg-white/60 hover:bg-white border border-transparent hover:border-slate-100 rounded-xl p-2.5 transition-all flex items-center justify-between w-full min-w-0 gap-4 box-border">
        
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(contact)}>
          <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors break-words w-full">
              {fullName} {nickname && <span className="text-xs text-slate-400 font-normal">({nickname})</span>} — <span className="text-xs text-slate-500 font-mono">{phone}</span>
            </p>
          </div>
        </div>
        <button onClick={() => onDelete(contact.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 p-1 rounded-lg hover:bg-red-50" title="Eliminar">
          <DeleteIcon />
        </button>
      </div>
    );
  }
}