import React, { useState } from 'react';
import Login from './components/Login';
import ContactForm from './components/ContactForm';
import ContactCard from './components/ContactCard';
import ContactModal from './components/ContactModal';

const INITIAL_CONTACTS = [
  { id: 1, name: 'Ángel', lastName: 'García', phone: '+58 412-1234567', nickname: 'Gabo', notes: 'Compañero de la facultad de ingeniería. Desarrollador principal del transpiler de Pascal.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
  { id: 2, name: 'María', lastName: 'González', phone: '+58 424-7654321', nickname: 'Mari', notes: 'Encargada del despliegue en AWS y de las configuraciones de la base de datos PostgreSQL.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [viewVersion, setViewVersion] = useState('grid'); 
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const handleSaveContact = (formData) => {
    if (editingContact) {
      setContacts(contacts.map(c => c.id === editingContact.id ? { ...formData, id: editingContact.id } : c));
      setEditingContact(null);
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }]);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">⚙️ DevContacts Manager</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition">
          Cerrar Sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Lado Izquierdo: Formulario */}
        <div className="md:col-span-1">
          <ContactForm 
            onSave={handleSaveContact} 
            currentContact={editingContact} 
            onCancel={() => setEditingContact(null)} 
          />
        </div>

        {/* Lado Derecho: Selector de Versión y Visualización del CRUD */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-xl border flex items-center justify-between shadow-sm">
            <span className="text-sm font-semibold text-gray-700">Cambiar Versión del Componente:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
              {['grid', 'list', 'compact', 'minimal'].map((v) => (
                <button
                  key={v} onClick={() => setViewVersion(v)}
                  className={`px-3 py-1 text-xs font-medium capitalize rounded-md transition ${viewVersion === v ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Renderizado Dinámico de las Variaciones */}
          <div className={`flex flex-wrap gap-4 ${viewVersion === 'list' ? 'flex-col' : ''}`}>
            {contacts.length === 0 ? (
              <p className="text-gray-400 text-sm italic py-8 text-center w-full">No hay contactos registrados.</p>
            ) : (
              contacts.map(contact => (
                <ContactCard 
                  key={contact.id}
                  contact={contact}
                  version={viewVersion}
                  onSelect={setSelectedContact}
                  onEdit={setEditingContact}
                  onDelete={handleDeleteContact}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Popup de Detalle */}
      <ContactModal 
        contact={selectedContact} 
        onClose={() => setSelectedContact(null)} 
      />
    </div>
  );
}