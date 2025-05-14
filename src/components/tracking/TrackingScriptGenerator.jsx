import React, { useState, useEffect } from 'react';
import { useCookieData } from '../../context/CookieContext';

const TrackingScriptGenerator = () => {
  const [scriptCode, setScriptCode] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const { cookieData } = useCookieData();

  useEffect(() => {
    // Générer un ID de tracking unique
    setTrackingId(`track_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  useEffect(() => {
    const code = `
<!-- Cookie Tracker Script -->
<script>
(function(w,d,t,id) {
  w.CookieTracker = w.CookieTracker || {};
  w.CookieTracker.q = w.CookieTracker.q || [];
  
  var script = d.createElement('script');
  script.async = true;
  script.src = 'https://your-domain.com/tracker.js';
  script.id = id;
  
  var first = d.getElementsByTagName('script')[0];
  first.parentNode.insertBefore(script, first);
  
  function track(event, data) {
    w.CookieTracker.q.push({
      event: event,
      data: data,
      timestamp: new Date().toISOString(),
      trackingId: '${trackingId}'
    });
  }
  
  // Événements de base
  d.addEventListener('DOMContentLoaded', function() {
    track('pageview', { 
      url: w.location.href,
      title: d.title 
    });
  });
  
  // Suivi des clics sur les produits
  d.addEventListener('click', function(e) {
    if(e.target.matches('.product-link, .add-to-cart')) {
      track('product_click', {
        productId: e.target.dataset.productId,
        productName: e.target.dataset.productName,
        price: e.target.dataset.price
      });
    }
  });
  
  // Suivi du panier abandonné
  w.addEventListener('beforeunload', function() {
    const cart = localStorage.getItem('cart');
    if(cart) {
      track('cart_abandoned', {
        items: JSON.parse(cart)
      });
    }
  });
})(window, document, 'script', '${trackingId}');
</script>
`;

    setScriptCode(code);
  }, [trackingId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptCode);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Script de Tracking</h2>
      <p className="text-gray-600 mb-4">
        Copiez ce script et ajoutez-le juste avant la fermeture de la balise &lt;/head&gt; de votre site e-commerce.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <pre className="whitespace-pre-wrap text-sm font-mono">
          {scriptCode}
        </pre>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">ID de tracking: {trackingId}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Copier le script
        </button>
      </div>
      
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
        <h3 className="text-lg font-medium text-blue-800">Instructions d'installation</h3>
        <ol className="mt-2 list-decimal list-inside text-blue-700">
          <li>Copiez le script ci-dessus</li>
          <li>Collez-le juste avant la fermeture de la balise &lt;/head&gt; de votre site</li>
          <li>Ajoutez les classes CSS suivantes à vos éléments :
            <ul className="ml-6 mt-2 list-disc">
              <li><code className="bg-blue-100 px-2 py-1 rounded">.product-link</code> pour les liens de produits</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">.add-to-cart</code> pour les boutons d'ajout au panier</li>
            </ul>
          </li>
          <li>Ajoutez les attributs data suivants à vos éléments :
            <ul className="ml-6 mt-2 list-disc">
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-product-id</code></li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-product-name</code></li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-price</code></li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TrackingScriptGenerator;