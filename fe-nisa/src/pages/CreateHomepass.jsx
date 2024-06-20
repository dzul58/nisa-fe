import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateHomepass = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    // full_name_pic: "",
    submission_from: "",
    request_source: "",
    customer_cid: "",
    current_address: "",
    destination_address: "",
    coordinate_point: "",
    house_photo: null,
    request_purpose: "Moving Address (Pindah Rumah)",
    email_address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Nonaktifkan tombol save setelah ditekan
    try {
      let uploadResult = {
        // fullNamePic: formData.full_name_pic,
        submissionFrom: formData.submission_from,
        requestSource: formData.request_source,
        customerCid: formData.customer_cid,
        homepassId: formData.homepass_id,
        housePhotoUrl: "" // Default to an empty string if no file is uploaded
      };
  
      if (formData.house_photo) {
        const housePhotoFormData = new FormData();
        housePhotoFormData.append("file", formData.house_photo);
        const uploadResponse = await axios.post("http://192.168.202.166:8000/api/upload", housePhotoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        uploadResult.housePhotoUrl = uploadResponse.data.imageUrl;
      }
  
      const dataToSend = { 
        ...formData, 
        uploadResult 
      };
      
      if (!formData.completion_date) {
        delete dataToSend.completion_date;
      }
  
      const response = await axios.post("http://192.168.202.166:8000/api/homepass", dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
  
      Swal.fire({
        icon: "success",
        title: "The request has been successfully made!",
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating homepass:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while making the request!",
      });
    } finally {
      setIsButtonDisabled(false); // Aktifkan kembali tombol save setelah proses selesai
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      house_photo: event.target.files[0],
    });
  };

   const handleCancel = () => {
    navigate("/");
  };

  


  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Create new Request</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="sm:col-span-4">
            <label htmlFor="email_address" className="block text-sm font-medium leading-6 text-gray-900">Email Address:</label>
            <div className="mt-2">
              <input  type="email" id="email_address" name="email_address" value={formData.email_address} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-3">
              <label htmlFor="submission_from" className="block text-sm font-medium leading-6 text-gray-900">Pengajuan dari:</label>
              <div className="mt-2">
                <select id="submission_from" name="submission_from" value={formData.submission_from} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>CS SIM</option>
                  <option>CS WIC</option>
                  <option>CS Priority/SME</option>
                  <option>CJ MyRep</option>
                  <option> Tim RWB </option>
                  <option> Tim WIC </option>
                </select>
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label htmlFor="request_source" className="block text-sm font-medium leading-6 text-gray-900">Sumber Permintaan:</label>
              <div className="mt-2">
                <select id="request_source" name="request_source" value={formData.request_source} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>Email, Soc-Med, Whatsapp</option>
                  <option>Walk In Customer</option>
                  <option>Retain RWB</option>
                </select>
              </div>
            </div>


          <div className="sm:col-span-3">
            <label htmlFor="customer_cid" className="block text-sm font-medium leading-6 text-gray-900">CID Pelanggan:</label>
            <div className="mt-2">
              <input type="text" id="customer_cid" name="customer_cid" value={formData.customer_cid} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="coordinate_point" className="block text-sm font-medium leading-6 text-gray-900">Titik Koordinat:</label>
            <div className="mt-2">
              <input type="text" id="coordinate_point" name="coordinate_point" value={formData.coordinate_point} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-3">
              <label htmlFor="request_purpose" className="block text-sm font-medium leading-6 text-gray-900">Tujuan Permintaan:</label>
              <div className="mt-2">
                <select id="request_purpose" name="request_purpose" value={formData.request_purpose} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>Moving Address (Pindah Rumah)</option>
                </select>
              </div>
            </div>

          <div className="col-span-full">
            <label htmlFor="current_address" className="block text-sm font-medium leading-6 text-gray-900">Alamat Saat Ini:</label>
            <div className="mt-2">
              <textarea type="text" id="current_address" name="current_address" value={formData.current_address} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="destination_address" className="block text-sm font-medium leading-6 text-gray-900">Alamat Tujuan:</label>
            <div className="mt-2">
              <textarea  type="text" id="destination_address" name="destination_address" value={formData.destination_address} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>

          <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
            Foto Rumah
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="house_photo"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="house_photo"
                    name="house_photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6">
      <button type="button" onClick={handleCancel} className="w-32 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Cancel</button>
      <button type="submit" className="w-32 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-3 px-6" disabled={isButtonDisabled}>Save</button>
      </div>
    </form>
    </div>
    
  );
}

export default CreateHomepass;
