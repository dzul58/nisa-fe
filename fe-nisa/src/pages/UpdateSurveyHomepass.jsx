import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateSurveyHomepass = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    freitag_survey_ops: "",
    photo1_survey_ops: null,
    photo2_survey_ops: null,
    photo3_survey_ops: null,
    photo4_survey_ops: null,
    notes_survey_ops: "",
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

  const uploadSurveyPhotos = async () => {
    const photoTypes = [
      { key: 'photo1_survey_ops', endpoint: 'upload-survey-ops-photo1', resultKey: 'imageUrlSurveyOps1', formDataKey: 'photo_survey_ops1' },
      { key: 'photo2_survey_ops', endpoint: 'upload-survey-ops-photo2', resultKey: 'imageUrlSurveyOps2', formDataKey: 'photo_survey_ops2' },
      { key: 'photo3_survey_ops', endpoint: 'upload-survey-ops-photo3', resultKey: 'imageUrlSurveyOps3', formDataKey: 'photo_survey_ops3' },
      { key: 'photo4_survey_ops', endpoint: 'upload-survey-ops-photo4', resultKey: 'imageUrlSurveyOps4', formDataKey: 'photo_survey_ops4' },
    ];
  
    const results = {};
  
    for (const photo of photoTypes) {
      if (formData[photo.key] instanceof File) {
        const photoFormData = new FormData();
        photoFormData.append(photo.formDataKey, formData[photo.key]);
        try {
          const uploadResponse = await axios.post(`http://localhost:8000/api/${photo.endpoint}`, photoFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          if (uploadResponse.data && uploadResponse.data[photo.resultKey]) {
            results[photo.key] = uploadResponse.data[photo.resultKey];
          }
        } catch (error) {
          console.error(`Error uploading ${photo.key}:`, error);
        }
      }
    }
  
    return results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    try {
      const photoUploadResults = await uploadSurveyPhotos();
  
      const updatedFormData = {
        freitag_survey_ops: formData.freitag_survey_ops,
        notes_survey_ops: formData.notes_survey_ops,
        photo1_survey_ops: photoUploadResults.photo1_survey_ops || formData.photo1_survey_ops,
        photo2_survey_ops: photoUploadResults.photo2_survey_ops || formData.photo2_survey_ops,
        photo3_survey_ops: photoUploadResults.photo3_survey_ops || formData.photo3_survey_ops,
        photo4_survey_ops: photoUploadResults.photo4_survey_ops || formData.photo4_survey_ops,
      };
  
      const response = await axios.put(`http://localhost:8000/api/update-ops/${id}`, updatedFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
  
      Swal.fire({
        icon: "success",
        title: "The survey has been successfully updated!",
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating survey:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error while updating the survey.",
      });
    } finally {
      setIsButtonDisabled(false);
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
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleCancel = async () => {
    try {
      // Panggil endpoint status
      await axios.get(`http://localhost:8000/api/status-untaken/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log("Status updated to untaken");
      // Navigasi kembali ke halaman detail
      navigate(`/hmpdetails/${id}`);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error while cancelling the update.",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update Survey Homepass</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Please fill in the survey information.</p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* <div className="sm:col-span-4">
              <label htmlFor="freitag_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">Freitag Survey OPS:</label>
              <div className="mt-2">
                <input type="text" id="freitag_survey_ops" name="freitag_survey_ops" value={formData.freitag_survey_ops} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> */}

            <div className="col-span-full">
              <label htmlFor="notes_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">Notes Survey OPS:</label>
              <div className="mt-2">
                <textarea id="notes_survey_ops" name="notes_survey_ops" value={formData.notes_survey_ops} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>

            <div className="col-span-full space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Survey Photos</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {['photo1_survey_ops', 'photo2_survey_ops', 'photo3_survey_ops', 'photo4_survey_ops'].map((photoKey, index) => (
                  <div key={photoKey}>
                    <label htmlFor={photoKey} className="block text-sm font-medium leading-6 text-gray-900">
                      Survey Photo {index + 1}
                    </label>
                    <input
                      type="file"
                      id={photoKey}
                      name={photoKey}
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
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <button type="button" onClick={handleCancel} className="w-32 bg-transparent hover:bg-[#662b81] text-[#662b81] font-semibold hover:text-white py-2 px-4 border border-[#662b81] hover:border-transparent rounded">Cancel</button>
          <button type="submit" className="w-32 rounded-md bg-[#662b81] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4A0F70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-3 px-6" disabled={isButtonDisabled}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSurveyHomepass;