import React, { useState, useEffect } from 'react';

const PRESETS_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
];

export default function ContactForm({ onSave, currentContact, onCancel }) {
  const [formData, setFormData] = useState({
    name: '', lastName: '', phone: '', nickname: '', notes: '', avatar: PRESETS_AVATARS[0]
  });

  useEffect(() => {
    if (currentContact) setFormData(currentContact);
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', lastName: '', phone: '', nickname: '', notes: '', avatar: PRESETS_AVATARS[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
      <h3 className="text-lg font-bold text-gray-800">{currentContact ? 'Editar Contacto' : 'Nuevo Contacto'}</h3>
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-2 border rounded-md text-sm w-full" required />
        <input type="text" placeholder="Apellido" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="p-2 border rounded-md text-sm w-full" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Número" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="p-2 border rounded-md text-sm w-full" required />
        <input type="text" placeholder="Apodo" value={formData.nickname} onChange={e => setFormData({...formData, nickname: e.target.value})} className="p-2 border rounded-md text-sm w-full" />
      </div>
      <textarea placeholder="Notas..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="p-2 border rounded-md text-sm w-full h-16 resize-none" />
      
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2">Seleccionar Foto Predeterminada:</label>
        <div className="flex gap-3">
          {PRESETS_AVATARS.map((url, idx) => (
            <img 
              key={idx} src={url} alt="preset" 
              onClick={() => setFormData({...formData, avatar: url})}
              className={`w-10 h-10 rounded-full object-cover cursor-pointer border-2 ${formData.avatar === url ? 'border-blue-600 scale-110' : 'border-transparent'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        {currentContact && <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm bg-gray-200 rounded-md">Cancelar</button>}
        <button type="submit" className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">{currentContact ? 'Actualizar' : 'Guardar'}</button>
      </div>
    </form>
  );
}