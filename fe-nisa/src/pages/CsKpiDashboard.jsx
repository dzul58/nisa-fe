import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const CsKpiDashboard = () => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    name: '',
    period: '',
  });
  const [sortBy, setSortBy] = useState('period');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...filterValues,
        sortBy,
        sortOrder,
        page,
      }).toString();
      const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/cs-kpi?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortBy, sortOrder]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('ASC');
    }
  };

  return (
    <div className="p-2 bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customer Service Performance</h2>
  
        <div className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="CS Name"
            value={filterValues.name}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-36"
          />
          <input
            type="month"
            name="period"
            placeholder="YYYY-MM"
            value={filterValues.period}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-36"
          />
          <button
            onClick={fetchData}
            className="bg-[#662b81] hover:bg-[#4A0F70] text-white font-bold py-1 px-2 rounded text-xs"
          >
            Search
          </button>
        </div>
      </div>
  
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-lg rounded-lg text-xs">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b p-1">No</th>
              <th className="border-b p-1 cursor-pointer" onClick={() => handleSort('name')}>
                CS Name {sortBy === 'name' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </th>
              <th className="border-b p-1 cursor-pointer" onClick={() => handleSort('total_requests_created')}>
                Total Requests Created {sortBy === 'total_requests_created' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </th>
              <th className="border-b p-1 cursor-pointer" onClick={() => handleSort('period')}>
                Period {sortBy === 'period' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.cs_id}-${row.period}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-b p-1 text-center">{(page - 1) * 10 + index + 1}</td>
                <td className="border-b p-1">{row.name}</td>
                <td className="border-b p-1 text-center">{row.total_requests_created}</td>
                <td className="border-b p-1 text-center">{row.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded disabled:opacity-50 text-xs"
        >
          Prev
        </button>
        <span className="text-gray-700 text-xs">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded disabled:opacity-50 text-xs"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CsKpiDashboard;