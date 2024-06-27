import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

const DetailHomepass = () => {
  const { id: detailId } = useParams();
  const [data, setData] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/homepass/${detailId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/authorization-hpm', {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchData();
    fetchUserRole();
  }, [detailId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm", { locale: id });
  };

  const isAdmin = () => userRole === 'HPM';

  const handleUpdateClick = (e) => {
    if (!isAdmin()) {
      e.preventDefault();
      Swal.fire({
        title: 'Unauthorized',
        text: 'You do not have permission to update. Only HPM are allowed.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <form className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Detail Moving Address Request</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">View and review the details of the moving address request.</p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="full_name_pic" className="block text-sm font-medium leading-6 text-gray-900">Nama Lengkap PIC yang Mengajukan:</label>
              <div className="mt-2">
                <input type="text" id="full_name_pic" name="full_name_pic" value={data.full_name_pic} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="submission_from" className="block text-sm font-medium leading-6 text-gray-900">Pengajuan dari:</label>
              <div className="mt-2">
                <input type="text" id="submission_from" name="submission_from" value={data.submission_from} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="submission_from" className="block text-sm font-medium leading-6 text-gray-900">Sumber Permintaan:</label>
              <div className="mt-2">
                <input type="text" id="submission_from" name="submission_from" value={data.request_source} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="submission_from" className="block text-sm font-medium leading-6 text-gray-900">CID Pelanggan:</label>
              <div className="mt-2">
                <input type="text" id="submission_from" name="submission_from" value={data.customer_cid} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="coordinate_point" className="block text-sm font-medium leading-6 text-gray-900">Titik Koordinat:</label>
            <div className="mt-2">
              <input type="text" id="coordinate_point" name="coordinate_point" value={data.coordinate_point} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>


          <div className="col-span-full">
            <label htmlFor="current_address" className="block text-sm font-medium leading-6 text-gray-900">Alamat Saat Ini:</label>
            <div className="mt-2">
              <textarea type="text" id="current_address" name="current_address" value={data.current_address} readOnly rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="destination_address" className="block text-sm font-medium leading-6 text-gray-900">Alamat Tujuan:</label>
            <div className="mt-2">
              <textarea  type="text" id="destination_address" name="destination_address" value={data.destination_address} readOnly rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div className="col-span-3">
          <label htmlFor="house_photo" className="block text-sm font-medium leading-6 text-gray-900">
                Foto Rumah
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.house_photo} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.house_photo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-purple-500 text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.house_photo} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div>

            <div className="sm:col-span-4">
            <label htmlFor="request_purpose" className="block text-sm font-medium leading-6 text-gray-900">Tujuan Permintaan:</label>
            <div className="mt-2">
              <input  type="text" id="request_purpose" name="request_purpose" value={data.request_purpose} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email_address" className="block text-sm font-medium leading-6 text-gray-900">Email Address:</label>
            <div className="mt-2">
              <input  type="email" id="email_address" name="email_address" value={data.email_address} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-3">
              <label htmlFor="hpm_check_result" className="block text-sm font-medium leading-6 text-gray-900">HPM Check Result:</label>
              <div className="mt-2">
                <input type="text" id="hpm_check_result" name="hpm_check_result" value={data.hpm_check_result} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="hpm_pic" className="block text-sm font-medium leading-6 text-gray-900">HPM PIC:</label>
            <div className="mt-2">
              <input type="text" id="hpm_pic" name="hpm_pic" value={data.hpm_pic} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>


          <div className="sm:col-span-2">
            <label htmlFor="homepass_id" className="block text-sm font-medium leading-6 text-gray-900">Homepass ID:</label>
            <div className="mt-2">
              <input  type="text" id="homepass_id" name="homepass_id" value={data.homepass_id} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="home_id_status" className="block text-sm font-medium leading-6 text-gray-900">Home ID Status:</label>
            <div className="mt-2">
              <input type="text" id="home_id_status" name="home_id_status" value={data.home_id_status} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="network" className="block text-sm font-medium leading-6 text-gray-900">Network:</label>
            <div className="mt-2">
              <input type="text" id="network"  name="network" value={data.network} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="remarks" className="block text-sm font-medium leading-6 text-gray-900"> Remarks: (Uncover/Reject) </label>
            <div className="mt-2">
              <input id="remarks" name="remarks" value={data.remarks} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="notes_recommendations" className="block text-sm font-medium leading-6 text-gray-900">Note/Recomendation (free text):</label>
            <div className="mt-2">
              <textarea id="notes_recommendations" name="notes_recommendations" value={data.notes_recommendations} readOnly rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status:</label>
              <div className="mt-2">
                <input type="text" id="status" name="status" value={data.status} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="completion_date" className="block text-sm font-medium leading-6 text-gray-900">Completion Date and Time:</label>
              <div className="mt-2">
                <input type="text" id="completion_date" name="completion_date" value={data.completion_date ? formatDate(data.completion_date) : ''} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
            <Link 
                to="/" 
                className="w-32 text-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Back
            </Link>
            {isAdmin() ? (
            <Link 
              to={`/updatehomepass/${data.id}`} 
              className="w-32 text-center bg-green-500 text-white font-semibold hover:bg-green-700 py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Update
            </Link>
            ) : (
            <button 
              onClick={handleUpdateClick}
              className="w-32 text-center bg-green-500 text-white font-semibold hover:bg-green-700 py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Update
            </button>
        )}
        </div>
      </form>
    </div>
  );
}

export default DetailHomepass;