import React, { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard';
import Login from './components/Login';
import ContactForm from './components/ContactForm';
import ContactModal from './components/ContactModal';

const phonePrefixes = [
  { code: '+58', label: 'VEN (+58)' },
  { code: '+1',  label: 'USA/CAN (+1)' },
  { code: '+34', label: 'ESP (+34)' },
  { code: '+57', label: 'COL (+57)' },
  { code: '+54', label: 'ARG (+54)' },
  { code: '+56', label: 'CHL (+56)' },
  { code: '+52', label: 'MEX (+52)' },
  { code: '+51', label: 'PER (+51)' },
];

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null); 
  const [usersList, setUsersList] = useState([]); 
  const [isRegistering, setIsRegistering] = useState(false); 

  const [contacts, setContacts] = useState([]);
  const [viewVersion, setViewVersion] = useState('grid');
  const [selectedContact, setSelectedContact] = useState(null); 
  
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formNickname, setFormNickname] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPhonePrefix, setFormPhonePrefix] = useState('+58'); 
  const [formNotes, setFormNotes] = useState('');
  const [formAvatarUrl, setFormAvatarUrl] = useState(''); 

  useEffect(() => {
    const savedUsers = localStorage.getItem('system_users');
    if (savedUsers) {
      setUsersList(JSON.parse(savedUsers));
    } else {
      const defaultUsers = [{ username: 'admin', password: '123' }];
      localStorage.setItem('system_users', JSON.stringify(defaultUsers));
      setUsersList(defaultUsers);
    }
  }, []);

  useEffect(() => {
    if (loggedUser) {
      const savedContacts = localStorage.getItem(`contacts_${loggedUser}`);
      setContacts(savedContacts ? JSON.parse(savedContacts) : []);
    }
  }, [loggedUser]);

  const saveContacts = (newContactsList) => {
    setContacts(newContactsList);
    if (loggedUser) {
      localStorage.setItem(`contacts_${loggedUser}`, JSON.stringify(newContactsList));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const userObj = usersList.find(
      (u) => u.username === authUsername.trim().toLowerCase() && u.password === authPassword
    );
    if (userObj) {
      setLoggedUser(userObj.username);
      setAuthPassword('');
    } else {
      setAuthError('Usuario o contraseña incorrectos.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError(''); setAuthSuccess('');
    const usernameClean = authUsername.trim().toLowerCase();

    if (!usernameClean || !authPassword || !confirmPassword) {
      setAuthError('Todos los campos son obligatorios.'); return;
    }
    if (authPassword !== confirmPassword) {
      setAuthError('Las contraseñas no coinciden.'); return;
    }
    if (usersList.some((u) => u.username === usernameClean)) {
      setAuthError('El nombre de usuario ya está registrado.'); return;
    }

    const updatedUsers = [...usersList, { username: usernameClean, password: authPassword }];
    localStorage.setItem('system_users', JSON.stringify(updatedUsers));
    setUsersList(updatedUsers);
    setAuthSuccess('¡Usuario creado con éxito! Ya puedes iniciar sesión.');
    setIsRegistering(false); setAuthPassword(''); setConfirmPassword('');
  };

  const handleLogout = () => {
    setLoggedUser(null); setAuthUsername(''); setAuthPassword('');
  };

  const openCreateModal = () => {
    setEditingContactId(null); setFormName(''); setFormLastName('');
    setFormNickname(''); setFormPhone(''); setFormPhonePrefix('+58');
    setFormNotes(''); setFormAvatarUrl(''); setIsFormOpen(true);
  };

  const openEditModal = (contact) => {
    setEditingContactId(contact.id); setFormName(contact.name);
    setFormLastName(contact.lastName); setFormNickname(contact.nickname);
    setFormNotes(contact.notes); setFormAvatarUrl(contact.avatarUrl || ''); 

    const foundPrefix = phonePrefixes.find(p => contact.phone.startsWith(p.code));
    if (foundPrefix) {
      setFormPhonePrefix(foundPrefix.code);
      setFormPhone(contact.phone.replace(foundPrefix.code, '')); 
    } else {
      setFormPhonePrefix('+58'); setFormPhone(contact.phone);
    }
    setIsFormOpen(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const fullPhone = `${formPhonePrefix}${formPhone.trim().replace(/\s+/g, '')}`;

    if (editingContactId) {
      const updated = contacts.map((c) =>
        c.id === editingContactId
          ? { ...c, name: formName, lastName: formLastName, nickname: formNickname, phone: fullPhone, notes: formNotes, avatarUrl: formAvatarUrl.trim() }
          : c
      );
      saveContacts(updated);
      if (selectedContact && selectedContact.id === editingContactId) {
        setSelectedContact({ ...selectedContact, name: formName, lastName: formLastName, nickname: formNickname, phone: fullPhone, notes: formNotes, avatarUrl: formAvatarUrl.trim() });
      }
    } else {
      const newContact = { id: Date.now().toString(), name: formName, lastName: formLastName, nickname: formNickname, phone: fullPhone, notes: formNotes, avatarUrl: formAvatarUrl.trim() };
      saveContacts([...contacts, newContact]);
    }
    setIsFormOpen(false);
  };

  const handleDeleteUser = (username) => {
    if (username === 'admin') {
      alert('El usuario "admin" es el administrador por defecto del sistema y no puede ser eliminado.');
      return;
    }

    if (window.confirm(`¿Estás completamente seguro de eliminar al usuario "${username}"? Esto borrará permanentemente toda su agenda de contactos.`)) {

      const updatedUsers = usersList.filter((u) => u.username !== username);
      localStorage.setItem('system_users', JSON.stringify(updatedUsers));
      setUsersList(updatedUsers);

      localStorage.removeItem(`contacts_${username}`);
      
      if (authUsername.toLowerCase() === username) {
        setAuthUsername('');
        setAuthPassword('');
      }

      alert(`Usuario "${username}" y sus contactos eliminados correctamente.`);
    }
  };

  if (!loggedUser) {
    return (
      <Login 
        isRegistering={isRegistering} setIsRegistering={setIsRegistering}
        authUsername={authUsername} setAuthUsername={setAuthUsername}
        authPassword={authPassword} setAuthPassword={setAuthPassword}
        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
        authError={authError} setAuthError={setAuthError}
        authSuccess={authSuccess} setAuthSuccess={setAuthSuccess}
        handleLogin={handleLogin} handleRegister={handleRegister}
        usersList={usersList}
        onDeleteUser={handleDeleteUser} 
      />
    );
  }

  const handleDeleteContact = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este contacto?')) {
      const filtered = contacts.filter((c) => c.id !== id);
      saveContacts(filtered);
      if (selectedContact && selectedContact.id === id) setSelectedContact(null);
    }
  };

  if (!loggedUser) {
    return (
      <Login 
        isRegistering={isRegistering} setIsRegistering={setIsRegistering}
        authUsername={authUsername} setAuthUsername={setAuthUsername}
        authPassword={authPassword} setAuthPassword={setAuthPassword}
        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
        authError={authError} setAuthError={setAuthError}
        authSuccess={authSuccess} setAuthSuccess={setAuthSuccess}
        handleLogin={handleLogin} handleRegister={handleRegister}
        usersList={usersList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6 relative">
      <div className="max-w-6xl mx-auto bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-slate-900 p-6 shadow-sm">
        
        <header className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-800/60 pb-6 mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 capitalize">Panel de {loggedUser}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={openCreateModal} className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-sm px-4 py-2 rounded-xl transition-colors shadow-md shadow-indigo-600/10">
              + Nuevo Contacto
            </button>
            <button onClick={handleLogout} className="bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold text-sm px-4 py-2 rounded-xl transition-colors border border-slate-700/50">
              Cerrar Sesión
            </button>
          </div>
        </header>

        <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl w-fit mb-6 shadow-inner border border-slate-900">
          {['grid', 'list', 'compact', 'minimal'].map((v) => (
            <button key={v} onClick={() => setViewVersion(v)} className={`px-4 py-1.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all ${viewVersion === v ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
              {v}
            </button>
          ))}
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
            <p className="text-slate-500 font-medium">No hay contactos en tu agenda. ¡Crea uno nuevo!</p>
          </div>
        ) : (
          <div className={viewVersion === 'list' ? "flex flex-col gap-4 w-full" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full items-start"}>
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                version={viewVersion}
                onEdit={openEditModal}
                onDelete={handleDeleteContact}
                onSelect={setSelectedContact} 
              />
            ))}
          </div>
        )}
      </div>

      <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />

      <ContactForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveContact}
        editingContactId={editingContactId}
        formName={formName} setFormName={setFormName}
        formLastName={formLastName} setFormLastName={setFormLastName}
        formNickname={formNickname} setFormNickname={setFormNickname}
        formPhone={formPhone} setFormPhone={setFormPhone}
        formPhonePrefix={formPhonePrefix} setFormPhonePrefix={setFormPhonePrefix}
        formNotes={formNotes} setFormNotes={setFormNotes}
        formAvatarUrl={formAvatarUrl} setFormAvatarUrl={setFormAvatarUrl}
        phonePrefixes={phonePrefixes}
      />
    </div>
  );
}