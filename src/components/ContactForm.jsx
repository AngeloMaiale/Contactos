import React from 'react';

export default function ContactForm({
  isOpen,
  onClose,
  onSubmit,
  editingContactId,
  formName, setFormName,
  formLastName, setFormLastName,
  formNickname, setFormNickname,
  formPhone, setFormPhone,
  formPhonePrefix, setFormPhonePrefix,
  formNotes, setFormNotes,
  formAvatarUrl, setFormAvatarUrl,
  phonePrefixes
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl max-w-lg w-full border border-slate-800 animate-in fade-in zoom-in-95 duration-150 relative z-10">
        <h3 className="text-xl font-bold text-slate-100 mb-4">
          {editingContactId ? 'Editar Contacto' : 'Añadir Nuevo Contacto'}
        </h3>
        
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Nombre *</label>
            <input type="text" maxLength={30} value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-700" placeholder="Ej. Juan" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Apellido</label>
            <input type="text" maxLength={30} value={formLastName} onChange={(e) => setFormLastName(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-700" placeholder="Ej. Pérez" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Apodo (Nickname)</label>
            <input type="text" maxLength={20} value={formNickname} onChange={(e) => setFormNickname(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-700" placeholder="Ej. Juancito" />
          </div>
          
          <div className="min-w-0">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Teléfono *</label>
            <div className="flex gap-2 w-full min-w-0">
              <select
                value={formPhonePrefix}
                onChange={(e) => setFormPhonePrefix(e.target.value)}
                className="px-2 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer w-28 flex-shrink-0"
              >
                {phonePrefixes.map((p) => (
                  <option key={p.code} value={p.code} className="bg-slate-900 text-slate-300">
                    {p.label}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                maxLength={15}
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value.replace(/\D/g, ''))} 
                className="min-w-0 flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-700"
                placeholder="Ej. 4125551234"
                required
              />
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">URL de la Imagen de Perfil</label>
            <input type="url" value={formAvatarUrl} onChange={(e) => setFormAvatarUrl(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-700" placeholder="https://ejemplo.com/foto.jpg" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Notas / Descripción</label>
            <textarea rows={3} value={formNotes} onChange={(e) => setFormNotes(e.target.value)} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 resize-none placeholder-slate-700" placeholder="Detalles o anotaciones sobre el contacto..."></textarea>
          </div>

          <div className="sm:col-span-2 flex gap-2 justify-end mt-2 pt-4 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors border border-slate-700/60">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
              {editingContactId ? 'Guardar Cambios' : 'Crear Contacto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}