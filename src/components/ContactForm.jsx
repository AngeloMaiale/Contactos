import React, { useState, useEffect } from "react";

// Selector serio de códigos con banderas y países principales
const DIAL_CODES = [
  { code: "+58", label: "🇻🇪 +58" },
  { code: "+54", label: "🇦🇷 +54" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+57", label: "🇨🇴 +57" },
  { code: "+52", label: "🇲🇽 +52" },
];

export default function ContactForm({ onSave, currentContact, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    nickname: "",
    notes: "",
    avatar: "",
  });
  const [dialCode, setDialCode] = useState("+58");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (currentContact) {
      setFormData({
        name: currentContact.name,
        lastName: currentContact.lastName,
        nickname: currentContact.nickname || "",
        notes: currentContact.notes || "",
        avatar: currentContact.avatar || "",
      });

      // Separar el código de área del número al editar
      const parts = currentContact.phone.split(" ");
      if (parts.length > 1) {
        setDialCode(parts[0]);
        setPhoneNumber(parts.slice(1).join(""));
      } else {
        setPhoneNumber(currentContact.phone);
      }
    } else {
      setFormData({
        name: "",
        lastName: "",
        nickname: "",
        notes: "",
        avatar: "",
      });
      setDialCode("+58");
      setPhoneNumber("");
    }
  }, [currentContact]);

  // VALIDACIÓN: Solo letras y espacios
  const handleTextOnly = (e, field) => {
    const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    setFormData({ ...formData, [field]: value });
  };

  // VALIDACIÓN: Solo números
  const handleNumberOnly = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      phone: `${dialCode} ${phoneNumber}`,
      avatar:
        formData.avatar ||
        "https://ui-avatars.com/api/?name=" +
          formData.name +
          "+" +
          formData.lastName +
          "&background=random",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        {currentContact ? "Editar Contacto" : "Nuevo Contacto"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">
            Nombre
          </label>
          <input
            required
            type="text"
            maxLength="30"
            value={formData.name}
            onChange={(e) => handleTextOnly(e, "name")}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all"
            placeholder="Ej. Ángel"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">
            Apellido
          </label>
          <input
            required
            type="text"
            maxLength="30"
            value={formData.lastName}
            onChange={(e) => handleTextOnly(e, "lastName")}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all"
            placeholder="Ej. García"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 mb-1 block">
          Teléfono Móvil
        </label>
        <div className="flex gap-2">
          <select
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            className="bg-slate-50 border border-slate-200 px-2 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 font-medium cursor-pointer"
          >
            {DIAL_CODES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          {/* maxLength en el teléfono */}
          <input
            required
            type="text"
            maxLength="15"
            value={phoneNumber}
            onChange={handleNumberOnly}
            className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all"
            placeholder="412 1234567"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">
            Apodo (Opcional)
          </label>
          <input
            type="text"
            maxLength="20"
            value={formData.nickname}
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">
            URL Foto (Opcional)
          </label>
          {/* A la URL no le ponemos un límite tan corto, la dejamos con 200 */}
          <input
            type="url"
            maxLength="200"
            value={formData.avatar}
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 transition-all"
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 mb-1 block">
          Notas
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows="3"
          className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
        ></textarea>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-colors text-sm"
        >
          {currentContact ? "Guardar Cambios" : "Registrar"}
        </button>
        {currentContact && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 font-bold py-2.5 rounded-xl transition-colors text-sm"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
