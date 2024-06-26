import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate, Link } from "react-router-dom";

const DetailHomepass = () => {
//   const navigate = useNavigate();
  const { id: detailId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.202.166:8000/api/homepass/${detailId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [detailId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy HH:mm", { locale: id });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Detail Moving Address Request</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">View and review the details of the moving address request.</p>
          </div>
  
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="full_name_pic" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Nama Lengkap PIC yang Mengajukan:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="full_name_pic"
                  id="full_name_pic"
                  value={data.full_name_pic}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="submission_from" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Pengajuan dari:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="submission_from"
                  id="submission_from"
                  value={data.submission_from}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="request_source" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Sumber Permintaan:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="request_source"
                  id="request_source"
                  value={data.request_source}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="customer_cid" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                CID Pelanggan:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="customer_cid"
                  id="customer_cid"
                  value={data.customer_cid}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="coordinate_point" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Titik Koordinat:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="coordinate_point"
                  id="coordinate_point"
                  value={data.coordinate_point}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="current_address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Alamat Saat Ini:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="current_address"
                  name="current_address"
                  rows="3"
                  value={data.current_address}
                  readOnly
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="destination_address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Alamat Tujuan:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="destination_address"
                  name="destination_address"
                  rows="3"
                  value={data.destination_address}
                  readOnly
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="house_photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Foto Rumah:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <input
                    type="text"
                    name="house_photo"
                    id="house_photo"
                    value={data.house_photo}
                    readOnly
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                  <a 
                    href={data.house_photo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Image
                  </a>
                </div>
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="request_purpose" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Tujuan Permintaan:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="request_purpose"
                  id="request_purpose"
                  value={data.request_purpose}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email Address:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="email"
                  name="email_address"
                  id="email_address"
                  value={data.email_address}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="hpm_check_result" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                HPM Check Result:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="hpm_check_result"
                  id="hpm_check_result"
                  value={data.hpm_check_result}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="hpm_pic" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                HPM PIC:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="hpm_pic"
                  id="hpm_pic"
                  value={data.hpm_pic}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="homepass_id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Homepass ID:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="homepass_id"
                  id="homepass_id"
                  value={data.homepass_id}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="home_id_status" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Home ID Status:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="home_id_status"
                  id="home_id_status"
                  value={data.home_id_status}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="network" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Network:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="network"
                  id="network"
                  value={data.network}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
  
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Remarks:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="remarks"
                  id="remarks"
                  value={data.remarks}
                  readOnly
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="notes_recommendations" className="block text-sm font-medium leading-6 text-gray-900 m:mt-px sm:pt-2">Note/Recomendation (free text):</label>
                <div className="mt-2">
                  <textarea id="notes_recommendations" name="notes_recommendations" value={data.notes_recommendations} readOnly rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status:</label>
                <div className="mt-2">
                  <input type="text" id="status" name="status" value={data.status} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
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
            <Link 
                to={`/updatehomepass/${data.id}`} 
                className="w-32 text-center bg-green-500 text-white font-semibold hover:bg-green-700 py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
                Update
            </Link>
        </div>
      </form>
    </div>
  );
}

export default DetailHomepass;