import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const backendUrl = 'https://dev-service-cloud-73599099399.europe-west1.run.app'

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/items')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    const interval = setInterval(fetchProducts, 5000) // Poll every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div>
        <h1>Cloud App Front</h1>
        <p>Frontend déployé sur Google Cloud Run</p>
        <p>Backend URL: {backendUrl}</p>
      </div>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="products-section">
        <h2>Produits</h2>
        <button onClick={fetchProducts} disabled={loading}>
          {loading ? 'Chargement...' : 'Actualiser les produits'}
        </button>
        {error && <p style={{color: 'red'}}>Erreur: {error}</p>}
        {products.length > 0 ? (
          <div className="products-list">
            {products.map((product, index) => (
              <div key={product.id || index} className="product-item">
                <h3>{product.name || `Produit ${index + 1}`}</h3>
                <p>ID: {product.id}</p>
                <p>Prix: {product.price ? `${product.price}€` : 'N/A'}</p>
                <p>Description: {product.description || 'Aucune description'}</p>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>Aucun produit trouvé.</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
