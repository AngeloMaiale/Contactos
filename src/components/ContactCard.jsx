import React from "react";

export default function ContactCard({
  contact,
  version,
  onSelect,
  onEdit,
  onDelete,
}) {
  const { name, lastName, phone, nickname, notes, avatar } = contact;
  const fullName = `${name} ${lastName}`;

  if (version === 'grid') {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/80 rounded-3xl py-5 px-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between w-64 h-80 overflow-hidden box-border">
      <div className="flex flex-col items-center text-center overflow-hidden cursor-pointer w-full" onClick={() => onSelect(contact)}>
        
        {/* Avatar y efecto difuminado */}
        <div className="relative mb-3 flex-shrink-0">
          <img src={avatar} alt={fullName} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md flex-shrink-0 z-10 relative" />
          <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
        
        {/* Contenedor del Nombre */}
        <div className="w-full min-h-[28px] flex items-center justify-center px-1 mb-0.5 overflow-hidden">
          <h3 className="font-bold text-base text-slate-800 tracking-tight leading-normal truncate w-full">
            {fullName}
          </h3>
        </div>
        
        {/* Apodo */}
        <p className="text-xs text-slate-400 italic truncate w-full mb-2.5 flex-shrink-0">{nickname ? `"${nickname}"` : 'Sin apodo'}</p>
        
        {/* Teléfono */}
        <span className="bg-indigo-50/80 text-indigo-600 font-bold px-4 py-1 rounded-xl text-xs backdrop-blur-sm border border-indigo-100 flex-shrink-0 mb-3">
          {phone}
        </span>
        
        {/* Notas con altura de línea corregida para evitar el corte inferior */}
        <div className="w-full px-1 overflow-hidden">
          <p className="text-xs text-slate-500 line-clamp-2 text-center leading-relaxed pb-1">
            {notes}
          </p>
        </div>
        
      </div>
      
      {/* Botones de acción */}
      <div className="flex gap-2 mt-2 pt-3 border-t border-slate-200/60 w-full flex-shrink-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button onClick={() => onEdit(contact)} className="flex-1 text-xs font-bold bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:text-indigo-600 py-2 rounded-xl transition-all">Editar</button>
        <button onClick={() => onDelete(contact.id)} className="flex-1 text-xs font-bold bg-white border border-slate-200 shadow-sm hover:border-red-300 hover:text-red-600 py-2 rounded-xl transition-all">Eliminar</button>
      </div>
    </div>
  );
}

  if (version === "list") {
    return (
      <div className="group bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex items-center justify-between w-full max-w-3xl h-24 overflow-hidden box-border">
        <div
          className="flex items-center gap-5 overflow-hidden flex-1 mr-4 cursor-pointer"
          onClick={() => onSelect(contact)}
        >
          <img
            src={avatar}
            alt={fullName}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0 shadow-sm"
          />
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-slate-800 truncate text-lg group-hover:text-indigo-600 transition-colors">
                {fullName}
              </h3>
              {nickname && (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg truncate">
                  "{nickname}"
                </span>
              )}
            </div>
            <p className="text-sm text-indigo-500 font-semibold mt-1">
              {phone}
            </p>
          </div>
          <div className="hidden md:block flex-1 border-l-2 border-slate-100 pl-5 ml-4">
            <p className="text-xs text-slate-500 truncate leading-relaxed">
              {notes}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onEdit(contact)}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors shadow-sm bg-white border border-slate-100"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm bg-white border border-slate-100"
          >
            🗑️
          </button>
        </div>
      </div>
    );
  }

  if (version === "compact") {
    return (
      <div className="group bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl p-2.5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex items-center gap-3 w-60 h-16 overflow-hidden box-border relative">
        <img
          src={avatar}
          alt={fullName}
          className="w-11 h-11 rounded-xl object-cover flex-shrink-0 shadow-sm"
        />
        <div
          className="overflow-hidden flex-1 cursor-pointer"
          onClick={() => onSelect(contact)}
        >
          <h3 className="font-bold text-sm text-slate-800 truncate">
            {name} {lastName[0]}.
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold truncate">
            {phone}
          </p>
        </div>
        <button
          onClick={() => onDelete(contact.id)}
          className="absolute right-2 top-0 bottom-0 my-auto h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 text-xs opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-slate-100"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="group border-b border-slate-200/60 hover:bg-white/60 py-3 px-5 flex items-center justify-between w-72 h-14 overflow-hidden box-border transition-colors rounded-xl">
      <div
        className="overflow-hidden flex-1 mr-2 cursor-pointer flex items-center gap-3"
        onClick={() => onSelect(contact)}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 flex-shrink-0 shadow-sm"></div>
        <p className="font-semibold text-sm text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
          {fullName}
        </p>
      </div>
      <div className="flex gap-4 flex-shrink-0 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(contact)}
          className="text-slate-400 hover:text-indigo-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="text-slate-400 hover:text-red-600 transition-colors"
        >
          Del
        </button>
      </div>
    </div>
  );
}
