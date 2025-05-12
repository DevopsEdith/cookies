import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RemarketingDashboard from '../components/remarketing/RemarketingDashboard';
import { ChartBar, Settings, PlusCircle, RefreshCw, Filter } from 'lucide-react';

const RemarketingTools = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec navigation et actions rapides */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Outils de Remarketing</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Reconquérir vos clients et augmenter votre taux de conversion
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouvelle campagne
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu de navigation contextuel */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <nav className="flex space-x-8">
              <Link 
                to="/remarketing/dashboard" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 font-medium text-sm border-b-2 border-blue-600"
              >
                <span className="flex items-center">
                  <ChartBar className="h-5 w-5 mr-2" />
                  Tableau de bord
                </span>
              </Link>
              <Link 
                to="/remarketing/campaign" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm"
              >
                <span className="flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Créer une campagne
                </span>
              </Link>
              <Link 
                to="/tracking" 
                className="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm"
              >
                <span className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Gestion des pixels
                </span>
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Carte de statistiques principales */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Paniers abandonnés</dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">24%</div>
                      <div className="mt-1 flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+3.2%</span>
                        <span className="ml-2 text-gray-500">vs mois dernier</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Taux de conversion</dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">2.8%</div>
                      <div className="mt-1 flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+0.5%</span>
                        <span className="ml-2 text-gray-500">vs mois dernier</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">ROI des campagnes</dt>
                    <dd>
                      <div className="text-lg font-bold text-gray-900">342%</div>
                      <div className="mt-1 flex items-baseline text-sm">
                        <span className="text-green-600 font-semibold">+28%</span>
                        <span className="ml-2 text-gray-500">vs mois dernier</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtres et actions */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-4 sm:px-6 flex flex-wrap justify-between items-center">
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeFilter === 'all' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Toutes les campagnes
              </button>
              <button 
                onClick={() => setActiveFilter('active')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeFilter === 'active' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Actives
              </button>
              <button 
                onClick={() => setActiveFilter('paused')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeFilter === 'paused' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                En pause
              </button>
              <button 
                onClick={() => setActiveFilter('draft')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeFilter === 'draft' 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Brouillons
              </button>
            </div>
            
            <div className="flex mt-3 sm:mt-0 space-x-3">
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  placeholder="Rechercher..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </button>
            </div>
          </div>
        </div>
        
        {/* Dashboard principal */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <RemarketingDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarketingTools;