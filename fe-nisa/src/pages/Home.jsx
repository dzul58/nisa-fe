import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

const Home = () => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    request_purpose: '',
    customerCid: '',
    homepassId: '',
    network: '',
    status: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/homepass?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setData(response.data.requests);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('https://moving-address-be.oss.myrepublic.co.id/api/authorization-cs', {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserRole();
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

  const showUnauthorizedAlert = () => {
    Swal.fire({
      title: 'Unauthorized',
      text: 'You do not have permission to perform this action. Only Customer Services are allowed.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/');
    });
  };

  const isAdmin = () => userRole === 'Customer Service';

  const handleCreateClick = () => {
    if (isAdmin()) {
      navigate('/createhomepass');
    } else {
      showUnauthorizedAlert()
    }
  };

  const handleEditClick = (e, id) => {
    if (!isAdmin()) {
      e.preventDefault();
      showUnauthorizedAlert()
    }
  };

  return (
    <div className="p-2 bg-slate-50">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleCreateClick}
          className="bg-[#662b81] hover:bg-[#4A0F70] text-white font-bold py-2 px-4 rounded text-sm"
        >
          Create Request
        </button>
  
        <div className="flex gap-2">
          <input
            type="text"
            name="id"
            placeholder="Search Ticket"
            value={filterValues.id}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-32"
          />
          <input
            type="text"
            name="request_purpose"
            placeholder="Search Request Purpose"
            value={filterValues.request_purpose}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-40"
          />
          <input
            type="text"
            name="customer_cid"
            placeholder="Search CID"
            value={filterValues.customer_cid}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-32"
          />
          <input
            type="text"
            name="homepass_id"
            placeholder="Search Homepass ID"
            value={filterValues.homepass_id}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-36"
          />
          <input
            type="text"
            name="network"
            placeholder="Search Network"
            value={filterValues.network}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-32"
          />
          <input
            type="text"
            name="home_id_status"
            placeholder="Search Home-ID Status"
            value={filterValues.home_id_status}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-40"
          />
          <input
            type="text"
            name="full_name_pic"
            placeholder="Search PIC HPM"
            value={filterValues.full_name_pic}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-32"
          />
          <input
            type="text"
            name="status"
            placeholder="Search Status"
            value={filterValues.status}
            onChange={handleFilterChange}
            className="border rounded p-1 text-xs w-32"
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
              <th className="border-b p-1">Timestamp</th>
              <th className="border-b p-1">Ticket</th>
              <th className="border-b p-1">Tujuan Permintaan</th>
              <th className="border-b p-1">CID</th>
              <th className="border-b p-1">Homepass ID</th>
              <th className="border-b p-1">Network</th>
              <th className="border-b p-1">Home-ID</th>
              <th className="border-b p-1">PIC HPM</th>
              <th className="border-b p-1">Status</th>
              <th className="border-b p-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-b p-1 text-center">{(page - 1) * 10 + index + 1}</td>
                <td className="border-b p-1 text-center">{format(new Date(row.timestamp), "yyyy/dd/MM HH:mm")}</td>
                <td className="border-b p-1 text-center">{row.id}</td>
                <td className="border-b p-1 text-center">{row.request_purpose.substring(0, 20)}..</td>
                <td className="border-b p-1 text-center">{row.customer_cid}</td>
                <td className="border-b p-1 text-center">{row.homepass_id}</td>
                <td className="border-b p-1 text-center">{row.network}</td>
                <td className="border-b p-1 text-center">{row.home_id_status}</td>
                <td className="border-b p-1 text-center">{row.hpm_pic}</td>
                <td className="border-b p-1 text-center">{row.status}</td>
                <td className="border-b px-3 py-1 text-center">
                  <Link
                    to={`/hmpdetails/${row.id}`}
                    className="bg-[#662b81] hover:bg-[#4A0F70] text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/edithomepass/${row.id}`}
                    onClick={(e) => handleEditClick(e, row.id)}
                    className="bg-[#662b81] hover:bg-[#4A0F70] text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </Link>
                </td>
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

export default Home;