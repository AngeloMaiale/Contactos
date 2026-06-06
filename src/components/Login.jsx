import React from 'react';

export default function Login({
  isRegistering,
  setIsRegistering,
  authUsername,
  setAuthUsername,
  authPassword,
  setAuthPassword,
  confirmPassword,
  setConfirmPassword,
  authError,
  setAuthError,
  authSuccess,
  setAuthSuccess,
  handleLogin,
  handleRegister,
  usersList
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-800 transition-all">
        <h2 className="text-2xl font-bold text-slate-100 text-center mb-2">
          {isRegistering ? 'Crear Nuevo Usuario' : 'Iniciar Sesión'}
        </h2>
        <p className="text-center text-xs text-slate-500 mb-6">
          {isRegistering ? 'Regístrate para obtener tu panel aislado' : 'Ingresa tus credenciales de acceso'}
        </p>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Usuario</label>
            <input 
              type="text" 
              value={authUsername} 
              onChange={(e) => setAuthUsername(e.target.value)} 
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-100 placeholder-slate-600" 
              placeholder="Ej. usuario" 
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Contraseña</label>
            <input 
              type="password" 
              value={authPassword} 
              onChange={(e) => setAuthPassword(e.target.value)} 
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-100 placeholder-slate-600" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          {isRegistering && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Confirmar Contraseña</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-100 placeholder-slate-600" 
                placeholder="••••••••" 
                required 
              />
            </div>
          )}

          {authError && <p className="text-xs text-red-400 font-semibold mt-1 bg-red-950/40 p-2.5 rounded-lg border border-red-900/50">{authError}</p>}
          {authSuccess && <p className="text-xs text-emerald-400 font-semibold mt-1 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50">{authSuccess}</p>}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/10 transition-all mt-2 text-sm">
            {isRegistering ? 'Registrar Cuenta' : 'Ingresar al Sistema'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); setAuthSuccess(''); }} 
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {isRegistering ? '¿Ya tienes usuario? Inicia sesión' : '¿No tienes usuario? Regístrate aquí'}
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-md w-full text-center">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Usuarios registrados en el sistema</p>
        <div className="flex flex-wrap justify-center gap-2">
          {usersList.map((u, index) => (
            <span key={index} className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono shadow-md">
              👤 {u.username}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}