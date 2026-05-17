import React from 'react';

export default function ContactCard({ contact, version, onSelect, onEdit, onDelete }) {
  const { name, lastName, phone, nickname, notes, avatar } = contact;
  const fullName = `${name} ${lastName}`;
  if (version === 'grid') {
    return (
      <div className="border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between w-64 h-80 overflow-hidden box-border">
        <div className="flex flex-col items-center text-center overflow-hidden">
          <img src={avatar} alt={fullName} className="w-20 h-20 rounded-full object-cover mb-3 flex-shrink-0" />
          <h3 className="font-bold text-lg text-gray-900 truncate w-full">{fullName}</h3>
          {nickname && <p className="text-sm text-gray-500 italic truncate w-full">"{nickname}"</p>}
          <p className="text-blue-600 font-medium text-sm mt-1">{phone}</p>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2 px-1 text-center overflow-hidden">{notes}</p>
        </div>
        <div className="flex gap-2 mt-3 pt-2 border-t w-full flex-shrink-0">
          <button onClick={() => onSelect(contact)} className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 rounded">Ver</button>
          <button onClick={() => onEdit(contact)} className="flex-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1 rounded">Editar</button>
          <button onClick={() => onDelete(contact.id)} className="flex-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 py-1 rounded">Borrar</button>
        </div>
      </div>
    );
  }

  if (version === 'list') {
    return (
      <div className="border rounded-lg p-3 bg-white shadow-sm flex items-center justify-between w-full max-w-2xl h-24 overflow-hidden box-border">
        <div className="flex items-center gap-4 overflow-hidden flex-1 mr-4">
          <img src={avatar} alt={fullName} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div className="overflow-hidden flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="font-bold text-gray-900 truncate">{fullName}</h3>
              {nickname && <span className="text-xs text-gray-400 truncate">({nickname})</span>}
            </div>
            <p className="text-sm text-blue-600 font-medium">{phone}</p>
            <p className="text-xs text-gray-500 truncate">{notes}</p>
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={() => onSelect(contact)} className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded">Ver</button>
          <button onClick={() => onEdit(contact)} className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded">Editar</button>
          <button onClick={() => onDelete(contact.id)} className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded">Borrar</button>
        </div>
      </div>
    );
  }

  if (version === 'compact') {
    return (
      <div className="border rounded-lg p-2 bg-gradient-to-r from-gray-50 to-white shadow-sm flex items-center gap-3 w-52 h-20 overflow-hidden box-border">
        <img src={avatar} alt={fullName} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
        <div className="overflow-hidden flex-1 cursor-pointer" onClick={() => onSelect(contact)}>
          <h3 className="font-bold text-sm text-gray-900 truncate">{name} {lastName[0]}.</h3>
          <p className="text-xs text-gray-600 truncate">{phone}</p>
          {nickname && <p className="text-[10px] text-gray-400 truncate">"{nickname}"</p>}
        </div>
        <button onClick={() => onDelete(contact.id)} className="text-gray-400 hover:text-red-500 text-xs p-1 flex-shrink-0">✕</button>
      </div>
    );
  }

  return (
    <div className="border-b py-2 px-3 flex items-center justify-between w-64 h-14 overflow-hidden bg-white box-border">
      <div className="overflow-hidden flex-1 mr-2 cursor-pointer" onClick={() => onSelect(contact)}>
        <p className="font-medium text-sm text-gray-800 truncate">{fullName}</p>
        <p className="text-xs text-gray-400 truncate">{phone}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0 text-xs">
        <button onClick={() => onEdit(contact)} className="text-blue-600 hover:underline">Edit</button>
        <button onClick={() => onDelete(contact.id)} className="text-red-500 hover:underline">Del</button>
      </div>
    </div>
  );
}