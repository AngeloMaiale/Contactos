import React from 'react';

export default function ContactModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
        <div className="flex flex-col items-center text-center">
          <img src={contact.avatar} alt={contact.name} className="w-28 h-28 rounded-full object-cover shadow-md mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">{contact.name} {contact.lastName}</h2>
          {contact.nickname && <p className="text-sm text-gray-500 italic mb-3">"{contact.nickname}"</p>}
          <span className="bg-blue-50 text-blue-700 font-semibold px-4 py-1 rounded-full text-sm mb-4">{contact.phone}</span>
          <div className="w-full text-left bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Notas</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.notes || "Sin notas adicionales."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}