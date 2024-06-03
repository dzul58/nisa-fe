import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(filterValues).toString();
        const response = await axios.get(`http://192.168.202.166:8000/api/homepass?${queryParams}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterValues]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm", { locale: id });
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <Link to="/createhomepass" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Homepass
        </Link>
      </div>
      <table className="min-w-full bg-white border">
      <thead>
  <tr>
    <th className="border px-4 py-2" colSpan="12">
      <div className="flex items-center">
        <input
          type="text"
          id="fullNamePic"
          name="fullNamePic"
          value={filterValues.fullNamePic}
          onChange={handleFilterChange}
          placeholder="Full Name PIC"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="submissionFrom"
          name="submissionFrom"
          value={filterValues.submissionFrom}
          onChange={handleFilterChange}
          placeholder="Submission From"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="requestSource"
          name="requestSource"
          value={filterValues.requestSource}
          onChange={handleFilterChange}
          placeholder="Request Source"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="customerCid"
          name="customerCid"
          value={filterValues.customerCid}
          onChange={handleFilterChange}
          placeholder="Customer CID"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="homepassId"
          name="homepassId"
          value={filterValues.homepassId}
          onChange={handleFilterChange}
          placeholder="Homepass ID"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="network"
          name="network"
          value={filterValues.network}
          onChange={handleFilterChange}
          placeholder="Network"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="homeIdStatus"
          name="homeIdStatus"
          value={filterValues.homeIdStatus}
          onChange={handleFilterChange}
          placeholder="Home ID Status"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="hpmPic"
          name="hpmPic"
          value={filterValues.hpmPic}
          onChange={handleFilterChange}
          placeholder="HPM PIC"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />

        <input
          type="text"
          id="status"
          name="status"
          value={filterValues.status}
          onChange={handleFilterChange}
          placeholder="Status"
          className="border-gray-300 rounded-md py-2 px-3 mr-2"
        />
      </div>
    </th>
  </tr>
  <tr>
    <th className="border px-4 py-2">No</th>
    <th className="border px-4 py-2">Timestamp</th>
    <th className="border px-4 py-2 whitespace-nowrap">Nama Lengkap PIC yg mengajukan</th>
    <th className="border px-4 py-2">Pengajuan dari</th>
    <th className="border px-4 py-2">Sumber Permintaan</th>
    <th className="border px-4 py-2">CID Pelanggan</th>
    <th className="border px-4 py-2">Homepass id</th>
    <th className="border px-4 py-2">Network</th>
    <th className="border px-4 py-2">Status Home-ID</th>
    <th className="border px-4 py-2">PIC HPM</th>
    <th className="border px-4 py-2">Status</th>
    <th className="border px-4 py-2">Actions</th>
  </tr>
</thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{formatDate(row.timestamp)}</td>
              <td className="border px-4 py-2 whitespace-nowrap">{row.full_name_pic}</td>
              <td className="border px-4 py-2">{row.submission_from}</td>
              <td className="border px-4 py-2">{row.request_source}</td>
              <td className="border px-4 py-2">{row.customer_cid}</td>
              <td className="border px-4 py-2">{row.homepass_id}</td>
              <td className="border px-4 py-2">{row.network}</td>
              <td className="border px-4 py-2">{row.home_id_status}</td>
              <td className="border px-4 py-2">{row.hpm_pic}</td>
              <td className="border px-4 py-2">{row.status}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/hmpdetail/${row.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Detail
                </Link>
                <Link
                  to={`/updatehomepass/${row.id}`}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;