import { useState } from 'react'

function LeadForm({ onLeadAdded }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    source: 'Website'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('') 
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Please enter name')
      return
    }
    if (!form.email.trim()) {
      setError('Email is required')
      return
    }
    if (!form.phone.trim()) {
      setError('Phone number is required')
      return
    }
    if (isNaN(form.phone)) {
      setError('Phone should contain only numbers')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

//using json server for db
    try {
      const res = await fetch('http://localhost:3001/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Failed to save lead')

      const savedLead = await res.json()

// i use Webhook through proxy.it's because webhook.site blocks direct browser call.
      const webhookUrl ='https://cors-anywhere.com/https://webhook.site/510c73ac-188c-4d4c-a905-3ec882327cef'

      const payload = {
        name: savedLead.name,
        email: savedLead.email,
        source: savedLead.source,
        created_at: new Date().toISOString()
      }

      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!webhookRes.ok) {
        console.log('Webhook failed but lead is saved', webhookRes.status)
      }

      setSuccess('Lead saved successfully!')
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        source: 'Website'
      })

      onLeadAdded()

    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Add New Lead
      </h2>

      <form onSubmit={submitForm} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Name *</label>
          <input name="name" value={form.name} onChange={handleInput} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleInput} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone *</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleInput} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Company</label>
          <input name="company" value={form.company} onChange={handleInput} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
          <textarea name="message" value={form.message} onChange={handleInput} rows="3" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Source *</label>
          <select name="source" value={form.source} onChange={handleInput} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required>
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-3 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Submitting...' : 'Submit Lead'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {success && <p className="mt-4 text-green-600 text-center">{success}</p>}
    </div>
  )
}

export default LeadForm