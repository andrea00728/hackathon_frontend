import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios-client';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken, token } = useStateContext();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const payloads = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!payloads.email || !payloads.password) {
      setError('Tous les champs doivent être remplis.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosClient.post('/', payloads);
      setUser(data.user);
      setToken(data.token);
      setSuccess(data.message || 'Connexion réussie !');
      setError(null);
    } catch (err) {
      setError('Informations du compte incorrectes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length > 15 || value.length < 4) {
      e.target.value = value.slice(0, 15);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Connexion</h1>
          <p className="mt-2 text-sm text-gray-400">
            Pas de compte ?{' '}
            <a href="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150">
              Inscrivez-vous ici
            </a>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl text-sm flex justify-between items-center">
            {error}
            <button onClick={() => setError(null)} className="text-red-300 hover:text-red-200">
              ✕
            </button>
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded-xl text-sm flex justify-between items-center">
            {success}
            <button onClick={() => setSuccess('')} className="text-green-300 hover:text-green-200">
              ✕
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              ref={emailRef}
              className="w-full bg-gray-700/50 text-white rounded-xl p-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
              required
              aria-label="Adresse email"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              ref={passwordRef}
              onChange={handlePasswordChange}
              className="w-full bg-gray-700/50 text-white rounded-xl p-4 pr-12 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
              required
              aria-label="Mot de passe"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
              Mot de passe
            </label>
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-150"
              aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPassword ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.977 9.977 0 013.542-5.456m6.834 6.834A3 3 0 0012 15a3 3 0 00-2.834-2.999M21 12a9.977 9.977 0 00-3.542-5.456M15 9a3 3 0 00-3-3" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7z" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="text-sm text-gray-400">Se souvenir de moi</span>
            </label>
            <a href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-150">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white rounded-xl p-4 font-semibold text-sm hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : null}
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-gray-800/80 text-gray-400">Ou connectez-vous avec</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-gray-700/50 border border-gray-600 text-white rounded-xl p-4 hover:bg-gray-600/50 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
}