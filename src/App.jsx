import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import ContactCard from "./components/ContactCard";
import ContactModal from "./components/ContactModal";

const INITIAL_CONTACTS = [
  {
    id: 1,
    name: "Ángel",
    lastName: "García",
    phone: "+58 412-1234567",
    nickname: "Gabo",
    notes: "Compañero de proyecto. Desarrollador principal.",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: 2,
    name: "María",
    lastName: "González",
    phone: "+58 424-7654321",
    nickname: "Mari",
    notes: "Encargada de la base de datos PostgreSQL.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("dir_contacts");
    return savedContacts ? JSON.parse(savedContacts) : INITIAL_CONTACTS;
  });

  const [viewVersion, setViewVersion] = useState("grid");
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  useEffect(() => {
    localStorage.setItem("dir_contacts", JSON.stringify(contacts));
  }, [contacts]);

  if (!isAuthenticated)
    return <Login onLogin={() => setIsAuthenticated(true)} />;

  const handleSaveContact = (formData) => {
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? { ...formData, id: editingContact.id }
            : c,
        ),
      );
      setEditingContact(null);
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }]);
    }
  };

  const handleDeleteContact = (id) =>
    setContacts(contacts.filter((c) => c.id !== id));

  return (
    <div className="min-h-screen bg-mesh flex flex-col font-sans text-slate-800 transition-colors duration-500">
      {/* Header flotante con efecto cristal */}
      <header className="sticky top-0 bg-white/70 backdrop-blur-md border-b border-white/50 px-8 py-4 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">
            Contactos UI
          </h1>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors px-4 py-2 rounded-xl hover:bg-red-50 hover:shadow-inner"
        >
          Cerrar Sesión
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <aside className="lg:col-span-4 space-y-6">
          <ContactForm
            onSave={handleSaveContact}
            currentContact={editingContact}
            onCancel={() => setEditingContact(null)}
          />
        </aside>

        <section className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-white/60 backdrop-blur-xl p-2.5 rounded-2xl border border-white shadow-sm flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 ml-4 uppercase tracking-widest">
              Visualización
            </span>
            <div className="flex bg-slate-200/50 p-1.5 rounded-xl gap-1">
              {["grid", "list", "compact", "minimal"].map((v) => (
                <button
                  key={v}
                  onClick={() => setViewVersion(v)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${viewVersion === v ? "bg-white shadow-md text-indigo-600 scale-105" : "text-slate-500 hover:text-slate-800 hover:bg-white/50"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-200/50 min-h-[500px]">
            <div
              className={
                viewVersion === "list"
                  ? "flex flex-col gap-5 w-full"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
              }
            >
              {contacts.length === 0 ? (
                <div className="w-full flex flex-col items-center justify-center py-20 text-slate-400 animate-fade-in">
                  <div className="bg-white p-6 rounded-full shadow-inner mb-4">
                    <svg
                      className="w-12 h-12 opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                  <p className="font-medium">El directorio está vacío.</p>
                </div>
              ) : (
                contacts.map((contact, index) => (
                  <div
                    key={contact.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <ContactCard
                      contact={contact}
                      version={viewVersion}
                      onSelect={setSelectedContact}
                      onEdit={setEditingContact}
                      onDelete={handleDeleteContact}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <ContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </div>
  );
}
