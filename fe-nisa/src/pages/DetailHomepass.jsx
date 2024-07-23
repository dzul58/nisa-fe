import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';
import loadingGif from '../assets/loading_image.gif'

const DetailHomepass = () => {
  const { id: detailId } = useParams();
  const [data, setData] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/homepass/${detailId}`, {
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
        const response = await axios.get('https://moving-address-be.oss.myrepublic.co.id/api/authorization-hpm', {
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

  const isAdmin = () => data.response_hpm_status === 'Untaken' && userRole === 'HPM' || userRole === 'Survey Ops.';
  // const isAdmin = () => data.response_hpm_status === 'Untaken';

  const handleAdminUpdate = async () => {
    try {
      await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/status-taken/${detailId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      
      if (userRole !== "Survey Ops.") {
        navigate(`/updatehomepass/${detailId}`);
      } else {
        navigate(`/updatesurvey/${detailId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (e) => {
    if (!isAdmin()) {
      e.preventDefault();
      Swal.fire({
        title: 'Unauthorized',
        text: 'You do not have permission to update this request.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const openImageModal = (src) => {
    setImageSrc(src);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setImageSrc('');
  };

  const showSurveyOpsFields = data && data?.hpm_check_result === "Survey Ops.";

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div>
      <form className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">Detail Moving Address Request</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">View and review the details of the moving address request.</p>
    </div>
    <div className={`px-3 py-1 rounded-full text-white font-semibold ${
      data.response_hpm_status === 'Taken' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      Status: {data.response_hpm_status}
    </div>
  </div>
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

          <div className="sm:col-span-3">
              <label htmlFor="response_hpm_location" className="block text-sm font-medium leading-6 text-gray-900">Area:</label>
              <div className="mt-2">
                <input type="text" id="response_hpm_location" name="response_hpm_location" value={data.response_hpm_location} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="sm:col-span-3">
            <label htmlFor="response_hpm_source" className="block text-sm font-medium leading-6 text-gray-900">Source:</label>
            <div className="mt-2">
              <input type="text" id="response_hpm_source" name="response_hpm_source" value={data.response_hpm_source} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

          
          {/* <div className="col-span-3">
          <label htmlFor="photo_front_of_house_url" className="block text-sm font-medium leading-6 text-gray-900">
              Photo Front of house
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.photo_front_of_house_url} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.photo_front_of_house_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.photo_front_of_house_url} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div>

            <div className="col-span-3">
          <label htmlFor="photo_old_fat_url" className="block text-sm font-medium leading-6 text-gray-900">
            Photo Old FAT
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.photo_old_fat_url} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.photo_old_fat_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.photo_old_fat_url} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div>

            <div className="col-span-3">
          <label htmlFor="photo_right_of_home_url" className="block text-sm font-medium leading-6 text-gray-900">
                Photo Right of Home
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.photo_right_of_home_url} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.photo_right_of_home_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.photo_right_of_home_url} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div>
            <div className="col-span-3">
          <label htmlFor="photo_new_fat_url" className="block text-sm font-medium leading-6 text-gray-900">
                Photo New FAT
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.photo_new_fat_url} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.photo_new_fat_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.photo_new_fat_url} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div>

            <div className="col-span-3">
          <label htmlFor="photo_left_of_home_url" className="block text-sm font-medium leading-6 text-gray-900">
                Photo Left of Home
            </label>
            <div className="relative inline-block group flex items-center space-x-2">
                <input 
                    type="text" 
                    id="request_purpose" 
                    name="request_purpose" 
                    value={data.photo_left_of_home_url} 
                    readOnly 
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />
                <a 
                    href={data.photo_left_of_home_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                >
                    Image
                </a>
                <img 
                    src={data.photo_left_of_home_url} 
                    alt="image" 
                    className="absolute top-0 left-full ml-2 w-150 border border-gray-300 bg-white p-2 hidden group-hover:block"
                />
            </div>
            </div> */}

<div className="col-span-3">
  <label htmlFor="photo_front_of_house_url" className="block text-sm font-medium leading-6 text-gray-900">
    Photo Front of house
  </label>
  <div className="relative inline-block group flex items-center space-x-2">
    <input 
      type="text" 
      id="photo_front_of_house_url" 
      name="photo_front_of_house_url" 
      value={data.photo_front_of_house_url} 
      readOnly 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    />
    <button 
      type="button"
      onClick={() => openImageModal(data.photo_front_of_house_url)}
      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
    >
      Image
    </button>
  </div>
</div>

<div className="col-span-3">
  <label htmlFor="photo_old_fat_url" className="block text-sm font-medium leading-6 text-gray-900">
    Photo Old FAT
  </label>
  <div className="relative inline-block group flex items-center space-x-2">
    <input 
      type="text" 
      id="photo_old_fat_url" 
      name="photo_old_fat_url" 
      value={data.photo_old_fat_url} 
      readOnly 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    />
    <button 
      type="button"
      onClick={() => openImageModal(data.photo_old_fat_url)}
      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
    >
      Image
    </button>
  </div>
</div>

<div className="col-span-3">
  <label htmlFor="photo_right_of_home_url" className="block text-sm font-medium leading-6 text-gray-900">
    Photo Right of Home
  </label>
  <div className="relative inline-block group flex items-center space-x-2">
    <input 
      type="text" 
      id="photo_right_of_home_url" 
      name="photo_right_of_home_url" 
      value={data.photo_right_of_home_url} 
      readOnly 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    />
    <button 
      type="button"
      onClick={() => openImageModal(data.photo_right_of_home_url)}
      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
    >
      Image
    </button>
  </div>
</div>

<div className="col-span-3">
  <label htmlFor="photo_new_fat_url" className="block text-sm font-medium leading-6 text-gray-900">
    Photo New FAT
  </label>
  <div className="relative inline-block group flex items-center space-x-2">
    <input 
      type="text" 
      id="photo_new_fat_url" 
      name="photo_new_fat_url" 
      value={data.photo_new_fat_url} 
      readOnly 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    />
    <button 
      type="button"
      onClick={() => openImageModal(data.photo_new_fat_url)}
      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
    >
      Image
    </button>
  </div>
</div>

<div className="col-span-3">
  <label htmlFor="photo_left_of_home_url" className="block text-sm font-medium leading-6 text-gray-900">
    Photo Left of Home
  </label>
  <div className="relative inline-block group flex items-center space-x-2">
    <input 
      type="text" 
      id="photo_left_of_home_url" 
      name="photo_left_of_home_url" 
      value={data.photo_left_of_home_url} 
      readOnly 
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
    />
    <button 
      type="button"
      onClick={() => openImageModal(data.photo_left_of_home_url)}
      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
    >
      Image
    </button>
  </div>
</div>

{/* Image Modal */}
{isImageModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50" onClick={closeImageModal}></div>
    <div className="bg-white rounded shadow-lg z-50 w-11/12 max-w-3xl max-h-[90vh] flex flex-col relative p-4">
      <button 
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={closeImageModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex-grow overflow-auto">
        <img src={imageSrc} alt="Modal" className="w-full h-auto object-contain" />
      </div>
    </div>
  </div>
)}


          <div className="sm:col-span-4">
            <label htmlFor="request_purpose" className="block text-sm font-medium leading-6 text-gray-900">Tujuan Permintaan:</label>
            <div className="mt-2">
              <input  type="text" id="request_purpose" name="request_purpose" value={data.request_purpose} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email_address" className="block text-sm font-medium leading-6 text-gray-900">Email Address:</label>
            <div className="mt-2">
              <input  type="email" id="email_address" name="email_address" value={data.email_address} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
              <label htmlFor="response_hpm_timestamp" className="block text-sm font-medium leading-6 text-gray-900"> Respone Time HPM PIC:</label>
              <div className="mt-2">
                <input type="text" id="response_hpm_timestamp" name="response_hpm_timestamp" value={data.response_hpm_timestamp ? formatDate(data.response_hpm_timestamp) : ''} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
{/* dari sini */}

{showSurveyOpsFields && (
              <>
                {/* <div className="sm:col-span-4">
                  <label htmlFor="freitag_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">Freitag Survey Ops:</label>
                  <div className="mt-2">
                    <input type="text" id="freitag_survey_ops" name="freitag_survey_ops" value={data.freitag_survey_ops || ''} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div> */}

                <div className="col-span-3">
                  <label htmlFor="photo1_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo 1 Survey Ops
                  </label>
                  <div className="relative inline-block group flex items-center space-x-2">
                    <input 
                      type="text" 
                      id="photo1_survey_ops" 
                      name="photo1_survey_ops" 
                      value={data.photo1_survey_ops || ''} 
                      readOnly 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    <button 
                      type="button"
                      onClick={() => openImageModal(data.photo1_survey_ops)}
                      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                    >
                      Image
                    </button>
                  </div>
                </div>

                <div className="col-span-3">
                  <label htmlFor="photo2_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo 2 Survey Ops
                  </label>
                  <div className="relative inline-block group flex items-center space-x-2">
                    <input 
                      type="text" 
                      id="photo2_survey_ops" 
                      name="photo2_survey_ops" 
                      value={data.photo2_survey_ops || ''} 
                      readOnly 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    <button 
                      type="button"
                      onClick={() => openImageModal(data.photo2_survey_ops)}
                      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                    >
                      Image
                    </button>
                  </div>
                </div>

                <div className="col-span-3">
                  <label htmlFor="photo3_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo 3 Survey Ops
                  </label>
                  <div className="relative inline-block group flex items-center space-x-2">
                    <input 
                      type="text" 
                      id="photo3_survey_ops" 
                      name="photo3_survey_ops" 
                      value={data.photo3_survey_ops || ''} 
                      readOnly 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    <button 
                      type="button"
                      onClick={() => openImageModal(data.photo3_survey_ops)}
                      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                    >
                      Image
                    </button>
                  </div>
                </div>

                <div className="col-span-3">
                  <label htmlFor="photo4_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo 4 Survey Ops
                  </label>
                  <div className="relative inline-block group flex items-center space-x-2">
                    <input 
                      type="text" 
                      id="photo4_survey_ops" 
                      name="photo4_survey_ops" 
                      value={data.photo4_survey_ops || ''} 
                      readOnly 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                    />
                    <button 
                      type="button"
                      onClick={() => openImageModal(data.photo4_survey_ops)}
                      className="px-4 py-1 text-lg font-medium bg-[#662b81] text-white rounded-lg cursor-pointer"
                    >
                      Image
                    </button>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="notes_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">Notes Survey Ops:</label>
                  <div className="mt-2">
                    <textarea id="notes_survey_ops" name="notes_survey_ops" value={data.notes_survey_ops || ''} readOnly rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                </div>
                </>
            )}
          </div>
        </div>

        

        <div className="flex items-center justify-end gap-x-6">
            <Link 
                to="/" 
                className="w-32 text-center bg-transparent hover:bg-[#662b81] text-[#662b81] font-semibold hover:text-white py-2 px-4 border border-[#662b81] hover:border-transparent rounded"
            >
                Back
            </Link>
            {isAdmin() ? (
            <Link 
              onClick={handleAdminUpdate}
              className="w-32 text-center bg-[#662b81] text-white font-semibold hover:bg-[#4A0F70] py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Update
            </Link>
            ) : (
            <button 
              onClick={handleUpdateClick}
              className="w-32 text-center bg-[#662b81] text-white font-semibold hover:bg-[#4A0F70] py-2 px-4 border border-green-500 hover:border-transparent rounded"
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