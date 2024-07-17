import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateHomepass = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    current_address: "",
    destination_address: "",
    coordinate_point: "",
    request_purpose: "",
    email_address: "",
    hpm_check_result: "",
    // hpm_pic: "",
    home_id_status: "",
    homepass_id: "",
    network: "",
    remarks: "",
    notes_recommendations: "",
    status: "",
    completion_date: "",
  });

  useEffect(() => {
    const fetchHomepassData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/homepass/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching homepass data:", error);
      }
    };

    fetchHomepassData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true); // Nonaktifkan tombol save setelah ditekan
    try {
      const uploadResult = {
        fullNamePic: formData.full_name_pic,
        submissionFrom: formData.submission_from,
        requestSource: formData.request_source,
        customerCid: formData.customer_cid,
        homepassId: formData.homepass_id,
        housePhotoUrl: formData.house_photo,
      };

      const payload = {
        uploadResult,
        current_address: formData.current_address,
        destination_address: formData.destination_address,
        coordinate_point: formData.coordinate_point,
        request_purpose: formData.request_purpose,
        email_address: formData.email_address,
        hpm_check_result: formData.hpm_check_result,
        network: formData.network,
        home_id_status: formData.home_id_status,
        remarks: formData.remarks,
        notes_recommendations: formData.notes_recommendations,
        // hpm_pic: formData.hpm_pic,
        status: formData.status,
        completion_date: formData.completion_date,
      };

      const response = await axios.put(`http://localhost:8000/api/update-homepass/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        icon: "success",
        title: "The request has been successfully updated!",
      });
      navigate(`/hmpdetails/${id}`);
    } catch (error) {
      console.error("Error updating homepass:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error while updating the request.",
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

  const handleCancel = () => {
    navigate(`/hmpdetails/${id}`);
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update Moving Address Request</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Update the necessary fields for the moving address request.</p>
        </div>

  
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            {/* <div className="sm:col-span-4">
              <label htmlFor="remarks" className="block text-sm font-medium leading-6 text-gray-900"> Remarks: (Uncover/Reject) </label>
              <div className="mt-2">
                <input id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> */}

            {/* <div className="sm:col-span-3">
              <label htmlFor="hpm_pic" className="block text-sm font-medium leading-6 text-gray-900">HPM PIC:</label>
              <div className="mt-2">
                <input type="text" id="hpm_pic" name="hpm_pic" value={formData.hpm_pic} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> */}
            
            <div className="sm:col-span-3">
                <label htmlFor="homepass_id" className="block text-sm font-medium leading-6 text-gray-900">Homepass ID:</label>
              <div className="mt-2">
                <input type="text" id="homepass_id" name="homepass_id" value={formData.homepass_id} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="network" className="block text-sm font-medium leading-6 text-gray-900">Network:</label>
                <div className="mt-2">
                  <select id="network" name="network" value={formData.network} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option> </option>
                    <option>MyRepublic</option>
                    <option>MTI</option>
                    <option>Icon+</option>
                    <option>BIT</option>
                    <option>SMT</option>
                    <option>Fiberstar</option>
                    <option>Cemara Asri</option>
                    <option>IBS Ancol</option>
                  </select>
                </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="remarks" className="block text-sm font-medium leading-6 text-gray-900">Remarks: (Uncover/Reject)</label>
                <div className="mt-2">
                  <select id="remarks" name="remarks" value={formData.remarks} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option> </option>
                    <option>Add Pole (membutuhkan tiang tambahan)</option>
                    <option>Data Not Valid (tidak sesuai)</option>
                    <option>Crossing Cluster wall (melompati pembatas cluster)</option>
                    <option>Crossing other Property (melompati rumah lain)</option>
                    <option>Update Homepass Not HEP (ajukan perbaikan alamat ke IT)</option>
                    <option>Installation Not Standart (tidak standar)</option>
                    <option>Drop cable too Far (tarikan terlalu jauh)</option>
                    <option>Tidak tercover jaringan MyRep & Partner</option>
                    <option>Double Request</option>
                    <option>Add sling wire to NRO team</option>
                  </select>
                </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="hpm_check_result" className="block text-sm font-medium leading-6 text-gray-900">HPM Check Result:</label>
              <div className="mt-2">
                <select id="hpm_check_result" name="hpm_check_result" value={formData.hpm_check_result} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>Tercover</option>
                  <option>Tidak Tercover</option>
                  <option>Survey Ops.</option>
                </select>
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label htmlFor="home_id_status" className="block text-sm font-medium leading-6 text-gray-900">Home ID Status:</label>
              <div className="mt-2">
                <select id="home_id_status" name="home_id_status" value={formData.home_id_status} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>Taken</option>
                  <option>Released</option>
                </select>
              </div>
            </div>
  
            <div className="col-span-full">
              <label htmlFor="notes_recommendations" className="block text-sm font-medium leading-6 text-gray-900">Note/Recomendation (free text):</label>
              <div className="mt-2">
                <textarea id="notes_recommendations" name="notes_recommendations" value={formData.notes_recommendations} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status:</label>
              <div className="mt-2">
                <select id="status" name="status" value={formData.status} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option> </option>
                  <option>Done</option>
                  <option>On Progress</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label htmlFor="completion_date" className="block text-sm font-medium leading-6 text-gray-900">Completion Date and Time:</label>
              <div className="mt-2">
                <input type="datetime-local" id="completion_date" name="completion_date" value={formData.completion_date} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

export default UpdateHomepass;



