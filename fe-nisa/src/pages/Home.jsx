import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

const Home = () => {
  const [data, setData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    fullNamePic: '',
    submissionFrom: '',
    requestSource: '',
    customerCid: '',
    homepassId: '',
    network: '',
    homeIdStatus: '',
    hpmPic: '',
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
  }, [filterValues, page]);

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
      text: 'You do not have permission to perform this action. Only Administrators are allowed.',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      navigate('/');
    });
  };

  const isAdmin = () => userRole === 'Administrator';

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
    <div className="overflow-x-auto p-5 bg-slate-50">
      <div className="mb-4">
        {/* {isAdmin() && ( */}
          <button
            onClick={handleCreateClick}
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Request
          </button>
        {/* )} */}
      </div>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
        <tr>
            <th className="border-b px-4 py-2" colSpan="12">
              <div className="grid grid-cols-12 gap-3">
                {/* <input
                  type="text"
                  id="fullNamePic"
                  name="fullNamePic"
                  value={filterValues.fullNamePic}
                  onChange={handleFilterChange}
                  placeholder="Nama Lengkap PIC yg mengajukan"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-3"
                /> */}
                {/* <input
                  type="text"
                  id="submissionFrom"
                  name="submissionFrom"
                  value={filterValues.submissionFrom}
                  onChange={handleFilterChange}
                  placeholder="Pengajuan dari"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="requestSource"
                  name="requestSource"
                  value={filterValues.requestSource}
                  onChange={handleFilterChange}
                  placeholder="Sumber Permintaan"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                /> */}
                <input
                  type="text"
                  id="customerCid"
                  name="customerCid"
                  value={filterValues.customerCid}
                  onChange={handleFilterChange}
                  placeholder="CID Pelanggan"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="homepassId"
                  name="homepassId"
                  value={filterValues.homepassId}
                  onChange={handleFilterChange}
                  placeholder="Homepass ID"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="network"
                  name="network"
                  value={filterValues.network}
                  onChange={handleFilterChange}
                  placeholder="Network"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="homeIdStatus"
                  name="homeIdStatus"
                  value={filterValues.homeIdStatus}
                  onChange={handleFilterChange}
                  placeholder="Status Home-ID"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="hpmPic"
                  name="hpmPic"
                  value={filterValues.hpmPic}
                  onChange={handleFilterChange}
                  placeholder="PIC HPM"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={filterValues.status}
                  onChange={handleFilterChange}
                  placeholder="Status"
                  className="border border-gray-300 rounded-md py-2 px-3 col-span-2"
                />
              </div>
            </th>
          </tr>
          <tr>
            <th className="border-b px-4 py-2 bg-gray-200">No</th>
            <th className="border-b px-4 py-2 bg-gray-200">Timestamp</th>
            {/* <th className="border-b px-4 py-2 bg-gray-200 whitespace-nowrap">Nama Lengkap PIC yg mengajukan</th> */}
            {/* <th className="border-b px-4 py-2 bg-gray-200">Pengajuan dari</th> */}
            {/* <th className="border-b px-4 py-2 bg-gray-200">Sumber Permintaan</th> */}
            <th className="border-b px-4 py-2 bg-gray-200">CID Pelanggan</th>
            <th className="border-b px-4 py-2 bg-gray-200">Tujuan Permintaan</th>
            <th className="border-b px-4 py-2 bg-gray-200">Homepass ID</th>
            <th className="border-b px-4 py-2 bg-gray-200">Network</th>
            <th className="border-b px-4 py-2 bg-gray-200">Status Home-ID</th>
            <th className="border-b px-4 py-2 bg-gray-200">PIC HPM</th>
            <th className="border-b px-4 py-2 bg-gray-200">Status</th>
            <th className="border-b px-4 py-2 bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border-b px-4 py-2">{(page - 1) * 10 + index + 1}</td>
              <td className="border-b px-4 py-2">{formatDate(row.timestamp)}</td>
              {/* <td className="border-b px-4 py-2 whitespace-nowrap">{row.full_name_pic}</td> */}
              {/* <td className="border-b px-4 py-2">{row.submission_from}</td> */}
              {/* <td className="border-b px-4 py-2">{row.request_source}</td> */}
              <td className="border-b px-4 py-2">{row.customer_cid}</td>
              <td className="border-b px-4 py-2">{row.request_purpose}</td>
              <td className="border-b px-4 py-2">{row.homepass_id}</td>
              <td className="border-b px-4 py-2">{row.network}</td>
              <td className="border-b px-4 py-2">{row.home_id_status}</td>
              <td className="border-b px-4 py-2">{row.hpm_pic}</td>
              <td className="border-b px-4 py-2">{row.status}</td>
              <td className="border-b px-4 py-2">
                <Link
                  to={`/hmpdetails/${row.id}`}
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Detail
                </Link>
                {/* {isAdmin() && ( */}
                  <Link
                    to={`/edithomepass/${row.id}`}
                    onClick={(e) => handleEditClick(e, row.id)}
                    className="bg-green-400 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </Link>
                {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
