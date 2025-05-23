import React, { useState, useEffect } from 'react';
import { useCookieData } from '../../context/CookieContext';

const TrackingScriptGenerator = () => {
  const [scriptCode, setScriptCode] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const { cookieData } = useCookieData();

  useEffect(() => {
    setTrackingId(`track_${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  useEffect(() => {
    const code = `
<!-- Cookie Tracker Script -->
<script>
(function(w,d,t,id) {
  w.CookieTracker = w.CookieTracker || {};
  w.CookieTracker.q = w.CookieTracker.q || [];
  
  // Configuration
  const config = {
    trackingId: '${trackingId}',
    apiEndpoint: 'http://localhost:8080/api/track',
    debug: false
  };

  // Fonction d'envoi des données
  async function sendData(eventType, data) {
    try {
      const payload = {
        trackingId: config.trackingId,
        eventType,
        eventData: JSON.stringify(data),
        sessionId: localStorage.getItem('sessionId') || Math.random().toString(36).substring(2),
        timestamp: new Date().toISOString()
      };

      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (err) {
      if (config.debug) {
        console.error('Erreur lors de l\\'envoi des données:', err.message);
      }
      return null;
    }
  }

  // Initialisation
  localStorage.setItem('sessionId', localStorage.getItem('sessionId') || Math.random().toString(36).substring(2));

  // Suivi des vues de pages
  d.addEventListener('DOMContentLoaded', function() {
    sendData('pageview', { 
      url: w.location.href,
      title: d.title,
      referrer: d.referrer
    });
  });

  // Suivi des clics sur les produits
  d.addEventListener('click', function(e) {
    const productElement = e.target.closest('[data-product-id]');
    if (productElement) {
      sendData('product_click', {
        productId: productElement.dataset.productId,
        productName: productElement.dataset.productName,
        price: productElement.dataset.price,
        category: productElement.dataset.category
      });
    }
  });

  // Suivi des ajouts au panier
  w.addEventListener('add_to_cart', function(e) {
    sendData('add_to_cart', e.detail);
  });

  // Suivi des paniers abandonnés
  w.addEventListener('beforeunload', function() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      sendData('cart_abandoned', {
        items: JSON.parse(cart),
        totalValue: calculateCartTotal(JSON.parse(cart))
      });
    }
  });

  // Suivi des achats
  w.addEventListener('purchase_complete', function(e) {
    sendData('purchase', e.detail);
  });

  function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

})(window, document, 'script', '${trackingId}');
</script>`;

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
        <h3 className="text-lg font-medium text-blue-800">Instructions d'intégration</h3>
        <ol className="mt-2 list-decimal list-inside text-blue-700">
          <li>Copiez le script ci-dessus</li>
          <li>Collez-le juste avant la fermeture de la balise &lt;/head&gt; de votre site</li>
          <li>Ajoutez les attributs data suivants à vos éléments de produits :
            <ul className="ml-6 mt-2 list-disc">
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-product-id</code></li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-product-name</code></li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-price</code></li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">data-category</code></li>
            </ul>
          </li>
          <li>Pour suivre les achats, déclenchez l'événement 'purchase_complete' :
            <pre className="bg-blue-100 p-2 mt-2 rounded">
              {`window.dispatchEvent(new CustomEvent('purchase_complete', {
  detail: {
    orderId: '123',
    items: [...],
    total: 99.99
  }
}));`}
            </pre>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TrackingScriptGenerator;