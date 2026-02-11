import { useState } from 'react';

function LeadTable({ leads, onViewDetail }) 
{  
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('All')
  const filteredLeads = leads.filter(lead => {
    const lowerSearch = search.toLowerCase()
    const matchesSearch = 
      lead.name.toLowerCase().includes(lowerSearch) ||
      lead.email.toLowerCase().includes(lowerSearch) ||
      (lead.phone && lead.phone.includes(lowerSearch)) ||
      lead.source.toLowerCase().includes(lowerSearch)

    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter

    return matchesSearch && matchesSource
  })


  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        No leads added yet...
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, phone or source..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  No leads match your search or filter
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {lead.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(lead.created_at || Date.now()).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onViewDetail(lead)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeadTable