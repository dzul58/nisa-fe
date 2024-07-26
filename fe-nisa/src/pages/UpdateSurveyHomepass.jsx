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
    video_survey_ops: null,
    notes_survey_ops: "",
  });

  useEffect(() => {
    const fetchHomepassData = async () => {
      try {
        const response = await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/homepass/${id}`, {
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

  const uploadSurveyPhotosAndVideo = async () => {
    const photoTypes = [
      { key: 'photo1_survey_ops', endpoint: 'upload-survey-ops-photo1', resultKey: 'imageUrlSurveyOps1', formDataKey: 'photo_survey_ops1' },
      { key: 'photo2_survey_ops', endpoint: 'upload-survey-ops-photo2', resultKey: 'imageUrlSurveyOps2', formDataKey: 'photo_survey_ops2' },
      { key: 'photo3_survey_ops', endpoint: 'upload-survey-ops-photo3', resultKey: 'imageUrlSurveyOps3', formDataKey: 'photo_survey_ops3' },
    ];
  
    const results = {};
  
    for (const photo of photoTypes) {
      if (formData[photo.key] instanceof File) {
        const photoFormData = new FormData();
        photoFormData.append(photo.formDataKey, formData[photo.key]);
        try {
          const uploadResponse = await axios.post(`https://moving-address-be.oss.myrepublic.co.id/api/${photo.endpoint}`, photoFormData, {
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
  
    // Handle video upload
    if (formData.video_survey_ops instanceof File) {
      const videoFormData = new FormData();
      videoFormData.append('video', formData.video_survey_ops);
      try {
        const uploadResponse = await axios.post(`https://moving-address-be.oss.myrepublic.co.id/api/upload-video`, videoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        if (uploadResponse.data && uploadResponse.data.videoUrl) {
          results.video_survey_ops = uploadResponse.data.videoUrl;
        }
      } catch (error) {
        console.error(`Error uploading video:`, error);
      }
    }
  
    return results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    try {
      const uploadResults = await uploadSurveyPhotosAndVideo();
  
      const updatedFormData = {
        freitag_survey_ops: formData.freitag_survey_ops,
        notes_survey_ops: formData.notes_survey_ops,
        photo1_survey_ops: uploadResults.photo1_survey_ops || formData.photo1_survey_ops,
        photo2_survey_ops: uploadResults.photo2_survey_ops || formData.photo2_survey_ops,
        photo3_survey_ops: uploadResults.photo3_survey_ops || formData.photo3_survey_ops,
        video_survey_ops: uploadResults.video_survey_ops || formData.video_survey_ops,
      };
  
      const response = await axios.put(`https://moving-address-be.oss.myrepublic.co.id/api/update-ops/${id}`, updatedFormData, {
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
      await axios.get(`https://moving-address-be.oss.myrepublic.co.id/api/status-untaken/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log("Status updated to untaken");
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
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update Survey Homepass</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Please fill in the survey information.</p>
        </div>
  
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="notes_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">Notes Survey OPS:</label>
              <div className="mt-2">
                <textarea 
                  id="notes_survey_ops" 
                  name="notes_survey_ops" 
                  value={formData.notes_survey_ops} 
                  onChange={handleChange} 
                  rows="3" 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
  
            <div className="col-span-full space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Upload Survey Photos and Video</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {['photo1_survey_ops', 'photo2_survey_ops', 'photo3_survey_ops'].map((photoKey, index) => (
                  <div key={photoKey}>
                    <label htmlFor={photoKey} className="block text-sm font-medium leading-6 text-gray-900">
                      Survey Photo {index + 1}
                    </label>
                    <input
                      type="file"
                      id={photoKey}
                      name={photoKey}
                      onChange={handleFileChange}
                      accept="image/*"
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
                <div>
                  <label htmlFor="video_survey_ops" className="block text-sm font-medium leading-6 text-gray-900">
                    Survey Video
                  </label>
                  <input
                    type="file"
                    id="video_survey_ops"
                    name="video_survey_ops"
                    onChange={handleFileChange}
                    accept="video/*"
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
          <button 
            type="button" 
            onClick={handleCancel} 
            className="w-32 bg-transparent hover:bg-[#662b81] text-[#662b81] font-semibold hover:text-white py-2 px-4 border border-[#662b81] hover:border-transparent rounded"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-32 rounded-md bg-[#662b81] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4A0F70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-3 px-6" 
            disabled={isButtonDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSurveyHomepass;