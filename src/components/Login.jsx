import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin();
    } else {
      setError(true);
      setPassword(''); // Borra la contraseña por seguridad tras un fallo
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh">
      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 w-full max-w-sm flex flex-col gap-5">
        <div className="text-center mb-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800">Acceso Seguro</h2>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">Usuario</label>
          <input required type="text" value={username} onChange={(e) => {setUsername(e.target.value); setError(false);}} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all" placeholder="Ingrese su usuario" />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 mb-1 block">Contraseña</label>
          <input required type="password" value={password} onChange={(e) => {setPassword(e.target.value); setError(false);}} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all" placeholder="••••••••" />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl text-xs font-bold text-center animate-fade-in">
            Error de credenciales
          </div>
        )}

        <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors mt-2">
          Ingresar al Sistema
        </button>
      </form>
    </div>
  );
}