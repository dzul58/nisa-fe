import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const HistorysUpdate = () => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    performed_by: '',
  });
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
      const queryParams = new URLSearchParams({ ...filterValues, page }).toString();
      const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/update-history?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(response.data);
      // Assuming the backend returns totalPages. If not, you'll need to calculate it
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm", { locale: id });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-2 bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Update History</h2>
  
        <div className="flex gap-2">
          <input
            type="text"
            name="performed_by"
            placeholder="Performed By"
            value={filterValues.performed_by}
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
              <th className="border-b p-1">Homepass Moving ID</th>
              <th className="border-b p-1">Action</th>
              <th className="border-b p-1">Performed By</th>
              <th className="border-b p-1">Performed At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-b p-1 text-center">{(page - 1) * 10 + index + 1}</td>
                <td className="border-b p-1 text-center">{row.homepass_moving_id}</td>
                <td className="border-b p-1 text-center">{row.action}</td>
                <td className="border-b p-1 text-center">{row.performed_by}</td>
                <td className="border-b p-1 text-center">{formatDate(row.performed_at)}</td>
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

export default HistorysUpdate;