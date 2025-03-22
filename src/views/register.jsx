import React, { useRef, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Image from '../assets/ai-generated-8915797_1280.jpg';

export default function Register() {
  const nameRef = useRef();
  const firstNameRef = useRef();
  const phoneRef = useRef();
  const sexRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fileRef = useRef();
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useStateContext();
  const navigate = useNavigate();

  const validateNameAndFirstName = (value) => /^[a-zA-Z\s]*$/.test(value);
  const validatePhone = (value) => /^\d{10}$/.test(value);
  const validatePassword = (value) => value.length >= 4 && value.length <= 15;

  const handleNameAndFirstName = (e) => {
    const value = e.target.value;
    if (!validateNameAndFirstName(value)) e.target.value = value.slice(0, -1);
  };

  const handlePhone = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value) || value.length > 10) e.target.value = value.slice(0, -1);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (!validatePassword(value)) e.target.value = value.slice(0, 15);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess('');

    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('firstname', firstNameRef.current.value);
    formData.append('phone', phoneRef.current.value);
    formData.append('sex', sexRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('email', emailRef.current.value);
    if (fileRef.current.files[0]) formData.append('image', fileRef.current.files[0]);

    try {
      const { data } = await axiosClient.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(data.user);
      setToken(data.token);
      setSuccess('Compte créé avec succès !');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const GenderCombobox = ({ sexRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const options = [
      { value: 'male', label: 'Homme' },
      { value: 'female', label: 'Femme' },
      { value: 'other', label: 'Autre' },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (value) => {
      setSelectedOption(value);
      sexRef.current.value = value;
      setIsOpen(false);
    };

    return (
      <div className="relative w-full">
        <div
          onClick={toggleDropdown}
          className="w-full bg-gray-800/50 text-gray-200 rounded-xl p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer flex justify-between items-center transition-all duration-200 hover:bg-gray-700/50"
          tabIndex={0}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="gender-options"
        >
          <span className="text-sm">
            {selectedOption ? options.find(opt => opt.value === selectedOption)?.label : 'Sélectionner le genre'}
          </span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <ul
            id="gender-options"
            className="absolute z-20 w-full bg-gray-800/90 backdrop-blur-sm text-gray-200 rounded-xl mt-1 shadow-lg max-h-60 overflow-auto border border-gray-700"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="p-3 hover:bg-indigo-600/30 cursor-pointer transition-colors duration-150"
                role="option"
                aria-selected={selectedOption === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        <input type="hidden" ref={sexRef} value={selectedOption} required />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1200px] bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <div className="relative h-full min-h-[300px]">
            <img src={Image} alt="Paysage désertique" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/70"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">Capturer des Moments,</h2>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Créer des Souvenirs</h2>
              <div className="flex gap-2 mt-6">
                <div className="w-4 h-1 bg-white/30 rounded"></div>
                <div className="w-4 h-1 bg-white/30 rounded"></div>
                <div className="w-4 h-1 bg-indigo-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">Créer un compte</h1>
            <p className="text-gray-400 mb-8">
              Déjà inscrit ?{' '}
              <a href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150">
                Connectez-vous ici
              </a>
            </p>

            {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
            {success && <p className="text-green-400 mb-4 text-sm">{success}</p>}

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    ref={firstNameRef}
                    onChange={handleNameAndFirstName}
                    className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
                    Prénom
                  </label>
                </div>
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    ref={nameRef}
                    onChange={handleNameAndFirstName}
                    className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
                    Nom
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="email"
                  ref={emailRef}
                  className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
                  required
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  ref={phoneRef}
                  onChange={handlePhone}
                  className="w-full bg-gray-800/50 text-white rounded-xl p-4 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
                  required
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
                  Téléphone
                </label>
              </div>
              <GenderCombobox sexRef={sexRef} />
              <div className="relative">
                <input
                  type="password"
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  className="w-full bg-gray-800/50 text-white rounded-xl p-4 pr-12 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 peer"
                  required
                />
                <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-indigo-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm">
                  Mot de passe
                </label>
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full bg-gray-800/50 text-gray-400 rounded-xl p-4 border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition-all duration-200"
                />
                {image && <img src={image} alt="Aperçu" className="w-24 h-24 object-cover rounded-xl mt-4 border border-gray-700" />}
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded bg-gray-800 border-gray-600 text-indigo-500 focus:ring-indigo-500 h-5 w-5"
                  required
                />
                <span className="text-gray-400 text-sm">
                  J'accepte les{' '}
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150">
                    Termes et Conditions
                  </a>
                </span>
              </label>
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
                {loading ? 'Création...' : 'Créer un compte'}
              </button>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-gray-800/80 text-gray-400">Ou inscrivez-vous avec</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-gray-800/50 border border-gray-700 text-white rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-200"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}