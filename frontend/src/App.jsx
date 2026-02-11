import { useState, useEffect } from 'react'
import LeadForm from './components/LeadForm'
import LeadTable from './components/LeadTable'

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => 
    {
    const saved = localStorage.getItem('darkMode')
    return saved ? saved === 'true' : false
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

    const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:3001/leads')
      if (!res.ok) throw new Error('Failed to load leads')
      const data = await res.json()
      setLeads(data.reverse()) 
    } catch (err) {
      console.log('Fetch error:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])


  const handleLeadAdded = () => {
    fetchLeads()
  }

  const viewLead = (lead) => {
    alert(
      `Lead Details:\n\n` +
      `Name: ${lead.name}\n` +
      `Email: ${lead.email}\n` +
      `Phone: ${lead.phone}\n` +
      `Company: ${lead.company || '-'}\n` +
      `Message: ${lead.message || '-'}\n` +
      `Source: ${lead.source}\n` +
      `Created: ${new Date(lead.created_at || Date.now()).toLocaleString()}`
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? 'Dark' : 'Light theme'}
          </button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-12">
          Lead Capture Dashboard
        </h1>

        <LeadForm onLeadAdded={handleLeadAdded} />

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Submitted Leads
          </h2>

          {loading ? (
            <p className="text-center">Loading leads...</p>
          ) : leads.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No leads yet.</p>
          ) : (
            <LeadTable leads={leads} onViewDetail={viewLead} />
          )}
        </div>

        <p className="text-center mt-16 text-sm text-gray-500 dark:text-gray-500">
          Built by SSk • Coimbatore • Feb 2026
        </p>
      </div>
    </div>
  )
}

export default App