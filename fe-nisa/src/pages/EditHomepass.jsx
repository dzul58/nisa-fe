import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditHomepass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        full_name_pic: "",
        submission_from: "",
        request_source: "",
        customer_cid: "",
        current_address: "",
        destination_address: "",
        coordinate_point: "",
        house_photo: null,
        request_purpose: "",
        email_address: "",
        hpm_check_result: "",
        homepass_id: "",
        network: "",
        home_id_status: "",
        remarks: "",
        notes_recommendations: "",
        hpm_pic: "",
        status: "",
        completion_date: "",
    });

    useEffect(() => {
        const fetchHomepassData = async () => {
            try {
                const response = await axios.get(`http://192.168.202.166:8000/api/homepass/${id}`);
                const formattedData = {
                    ...response.data,
                    completion_date: formatDateTimeForInput(response.data.completion_date),
                };
                setFormData(formattedData);
            } catch (error) {
                console.error("Error fetching homepass data:", error);
            }
        };

        fetchHomepassData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let uploadResult = {};
    
          // Mengunggah file gambar jika ada
          if (formData.house_photo) {
            const housePhotoFormData = new FormData();
            housePhotoFormData.append("file", formData.house_photo);
            const uploadResponse = await axios.post("http://192.168.202.166:8000/api/upload", housePhotoFormData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
    
            // Membuat objek uploadResult
            uploadResult = {
              fullNamePic: formData.full_name_pic,
              submissionFrom: formData.submission_from,
              requestSource: formData.request_source,
              customerCid: formData.customer_cid,
              homepassId: formData.homepass_id,
              housePhotoUrl: uploadResponse.data.imageUrl,
            };
          } else {
            // Membuat objek uploadResult kosong jika tidak ada file yang diunggah
            uploadResult = {
              fullNamePic: formData.full_name_pic,
              submissionFrom: formData.submission_from,
              requestSource: formData.request_source,
              customerCid: formData.customer_cid,
              homepassId: formData.homepass_id,
              housePhotoUrl: "",
            };
          }
    
          // Mengirimkan data ke endpoint /api/homepass
          const dataToSend = { ...formData, uploadResult };
          if (!formData.completion_date) {
            delete dataToSend.completion_date;
          }
          const response = await axios.put(`http://192.168.202.166:8000/api/homepass/${id}`, dataToSend);
          console.log("RESPONSE>>>", response.data);
          alert("Homepass berhasil dibuat!");
          navigate("/");
        } catch (error) {
          console.error("Error creating homepass:", error);
          alert("Terjadi kesalahan saat membuat Homepass.");
        }
      };

    const formatDateTimeForInput = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
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

    return (
        <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Edit Homepass</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="full_name_pic" className="block font-medium mb-1">
                    Nama Lengkap PIC yang Mengajukan:
                </label>
                <input
                    type="text"
                    id="full_name_pic"
                    name="full_name_pic"
                    value={formData.full_name_pic}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="submission_from" className="block font-medium mb-1">
                    Pengajuan dari:
                </label>
                <input
                    type="text"
                    id="submission_from"
                    name="submission_from"
                    value={formData.submission_from}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="request_source" className="block font-medium mb-1">
                    Sumber Permintaan:
                </label>
                <input
                    type="text"
                    id="request_source"
                    name="request_source"
                    value={formData.request_source}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="customer_cid" className="block font-medium mb-1">
                    CID Pelanggan:
                </label>
                <input
                    type="text"
                    id="customer_cid"
                    name="customer_cid"
                    value={formData.customer_cid}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="current_address" className="block font-medium mb-1">
                    Alamat Saat Ini:
                </label>
                <input
                    type="text"
                    id="current_address"
                    name="current_address"
                    value={formData.current_address}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="destination_address" className="block font-medium mb-1">
                    Alamat Tujuan:
                </label>
                <input
                    type="text"
                    id="destination_address"
                    name="destination_address"
                    value={formData.destination_address}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="coordinate_point" className="block font-medium mb-1">
                    Titik Koordinat:
                </label>
                <input
                    type="text"
                    id="coordinate_point"
                    name="coordinate_point"
                    value={formData.coordinate_point}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="house_photo" className="block font-medium mb-1">
                    Foto Rumah:
                </label>
                <input
                    type="file"
                    id="house_photo"
                    name="house_photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="request_purpose" className="block font-medium mb-1">
                    Tujuan Permintaan:
                </label>
                <input
                    type="text"
                    id="request_purpose"
                    name="request_purpose"
                    value={formData.request_purpose}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email_address" className="block font-medium mb-1">
                    Email Address:
                </label>
                <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="hpm_check_result" className="block font-medium mb-1">
                    HPM Check Result:
                </label>
                <input
                    type="text"
                    id="hpm_check_result"
                    name="hpm_check_result"
                    value={formData.hpm_check_result}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="homepass_id" className="block font-medium mb-1">
                    Homepass ID:
                </label>
                <input
                    type="text"
                    id="homepass_id"
                    name="homepass_id"
                    value={formData.homepass_id}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="network" className="block font-medium mb-1">
                    Network:
                </label>
                <input
                    type="text"
                    id="network"
                    name="network"
                    value={formData.network}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="home_id_status" className="block font-medium mb-1">
                    Home ID Status:
                </label>
                <input
                    type="text"
                    id="home_id_status"
                    name="home_id_status"
                    value={formData.home_id_status}
                    onChange={handleChange}
                    className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="mb-4">
            <label htmlFor="remarks" className="block font-medium mb-1">
                Remarks:
            </label>
            <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="notes_recommendations" className="block font-medium mb-1">
                Notes/Recommendations:
            </label>
            <textarea
                id="notes_recommendations"
                name="notes_recommendations"
                value={formData.notes_recommendations}
                onChange={handleChange}
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="hpm_pic" className="block font-medium mb-1">
                HPM PIC:
            </label>
            <input
                type="text"
                id="hpm_pic"
                name="hpm_pic"
                value={formData.hpm_pic}
                onChange={handleChange}
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="status" className="block font-medium mb-1">
                Status:
            </label>
            <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="completion_date" className="block font-medium mb-1">
                Completion Date and Time:
            </label>
            <input
                type="datetime-local"
                id="completion_date"
                name="completion_date"
                value={formData.completion_date}
                onChange={handleChange}
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
            Update Homepass
        </button>
    </form>
</div>
    );
};

export default EditHomepass;