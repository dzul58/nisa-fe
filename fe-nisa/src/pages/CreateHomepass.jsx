import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateHomepass = () => {
  const navigate = useNavigate();
  const [areaOptions, setAreaOptions] = useState([]);
  const [areaInput, setAreaInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    submission_from: "",
    request_source: "",
    customer_cid: "",
    current_address: "",
    destination_address: "",
    coordinate_point: "",
    response_hpm_location: "",
    response_hpm_source: "",
    request_purpose: "Moving Address (Pindah Rumah)",
    photo_front_of_house: null,
    photo_left_of_house: null,
    photo_right_of_house: null,
    photo_old_fat: null,
    photo_new_fat: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    try {
      let uploadResult = {
        submissionFrom: formData.submission_from,
        requestSource: formData.request_source,
        customerCid: formData.customer_cid,
      };

      // Upload additional photos
      const photoUploadResults = await uploadAdditionalPhotos();

      const dataToSend = { 
        ...formData, 
        uploadResult,
        ...photoUploadResults
      };
      
      if (!formData.completion_date) {
        delete dataToSend.completion_date;
      }

      const response = await axios.post("https://moving-address-be.oss.myrepublic.co.id/api/homepass", dataToSend, {
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
      setIsButtonDisabled(false);
    }
  };

  const uploadAdditionalPhotos = async () => {
    const photoTypes = [
      { key: 'photo_front_of_house', endpoint: 'upload-photo-front-of-house', resultKey: 'imageUrlFrontOfHouse' },
      { key: 'photo_left_of_house', endpoint: 'upload-photo-left-of-house', resultKey: 'imageUrlLeftOfHouse' },
      { key: 'photo_right_of_house', endpoint: 'upload-photo-right-of-house', resultKey: 'imageUrlRightOfHouse' },
      { key: 'photo_old_fat', endpoint: 'upload-photo-old-fat', resultKey: 'imageUrlOldFat' },
      { key: 'photo_new_fat', endpoint: 'upload-photo-new-fat', resultKey: 'imageUrlNewFat' },
    ];

    const results = {};

    for (const photo of photoTypes) {
      if (formData[photo.key]) {
        const photoFormData = new FormData();
        photoFormData.append(photo.key, formData[photo.key]);
        try {
          const uploadResponse = await axios.post(`https://moving-address-be.oss.myrepublic.co.id/api/${photo.endpoint}`, photoFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          results[photo.resultKey] = uploadResponse.data[photo.resultKey];
        } catch (error) {
          console.error(`Error uploading ${photo.key}:`, error);
        }
      }
    }

    return results;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleCancel = () => {
    navigate("/");
  };


  const searchAreas = async (query) => {
    if (query.length < 2) return;
    try {
      const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/areas?query=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setAreaOptions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching areas:", error);
    }
  };

  const handleAreaInputChange = (e) => {
    const value = e.target.value;
    setAreaInput(value);
    searchAreas(value);
  };

  const handleAreaSelect = (area) => {
    setAreaInput(area);
    setFormData({
      ...formData,
      response_hpm_location: area,
    });
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Create new Request</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          {/* <div className="sm:col-span-4">
            <label htmlFor="email_address" className="block text-sm font-medium leading-6 text-gray-900">Email Address:</label>
            <div className="mt-2">
              <input  type="email" id="email_address" name="email_address" value={formData.email_address} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div> */}

          <div className="sm:col-span-4">
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
                  <option>Moving Network (Partner &gt;&gt; Own-Net MyRepublic)</option>
                  <option>Perbaikan Alamat System</option>
                  <option>Request Moving MDU</option>
                </select>
              </div>
          </div>
          
          {/* <div className="sm:col-span-3">
            <label htmlFor="response_hpm_location" className="block text-sm font-medium leading-6 text-gray-900">Area:</label>
            <div className="mt-2">
              <input type="text" id="response_hpm_location" name="response_hpm_location" value={formData.response_hpm_location} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div> */}

<div className="sm:col-span-3 relative">
      <label htmlFor="response_hpm_location" className="block text-sm font-medium leading-6 text-gray-900">Area:</label>
      <div className="mt-2">
        <input
          type="text"
          id="response_hpm_location"
          name="response_hpm_location"
          value={areaInput}
          onChange={handleAreaInputChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Type to search area..."
        />
        {showSuggestions && areaOptions.length > 0 && (
          <ul ref={suggestionRef} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {areaOptions.map((area, index) => (
              <li
                key={index}
                onClick={() => handleAreaSelect(area)}
                className="cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                {area}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

          <div className="sm:col-span-3">
              <label htmlFor="response_hpm_source" className="block text-sm font-medium leading-6 text-gray-900">Source:</label>
              <div className="mt-2">
                <select id="response_hpm_source" name="response_hpm_source" value={formData.response_hpm_source} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>BOSS</option>
                  <option>STELLA</option>
                </select>
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
                  <option>Inbound Call CS</option>
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

          <div className="col-span-full space-y-6">
  <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Photos</h3>
  
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div>
      <label htmlFor="photo_front_of_house" className="block text-sm font-medium leading-6 text-gray-900">
        Front of House Photo
      </label>
      <input
        type="file"
        id="photo_front_of_house"
        name="photo_front_of_house"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 bg-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="photo_old_fat" className="block text-sm font-medium leading-6 text-gray-900">
        Old FAT Photo
      </label>
      <input
        type="file"
        id="photo_old_fat"
        name="photo_old_fat"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 bg-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          border border-gray-300 rounded-md"
      />
    </div>


    <div>
      <label htmlFor="photo_right_of_house" className="block text-sm font-medium leading-6 text-gray-900">
        Right of House Photo
      </label>
      <input
        type="file"
        id="photo_right_of_house"
        name="photo_right_of_house"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 bg-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          border border-gray-300 rounded-md"
      />
    </div>



    <div>
      <label htmlFor="photo_new_fat" className="block text-sm font-medium leading-6 text-gray-900">
        New FAT Photo
      </label>
      <input
        type="file"
        id="photo_new_fat"
        name="photo_new_fat"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 bg-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <label htmlFor="photo_left_of_house" className="block text-sm font-medium leading-6 text-gray-900">
        Left of House Photo
      </label>
      <input
        type="file"
        id="photo_left_of_house"
        name="photo_left_of_house"
        onChange={handleFileChange}
        className="mt-2 block w-full text-sm text-gray-500 bg-white
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
          border border-gray-300 rounded-md"
      />
    </div>
  </div>
</div>

        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6">
      <button type="button" onClick={handleCancel} className="w-32 bg-transparent hover:bg-[#662b81]  text-[#662b81] ] font-semibold hover:text-white py-2 px-4 border border-[#662b81]  hover:border-transparent rounded">Cancel</button>
      <button type="submit" className="w-32 rounded-md bg-[#662b81] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4A0F70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-3 px-6" disabled={isButtonDisabled}>Save</button>
      </div>
    </form>
    </div>
    
  );
}

export default CreateHomepass;
