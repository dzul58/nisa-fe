import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";

const HpmDetail = () => {
	const navigate = useNavigate();
  const { id: detailId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/homepass/${detailId}`);
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4"
        >
            Back
        </button>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <p><strong>Timestamp:</strong> {formatDate(data.timestamp)}</p>
        <p><strong>Nama Lengkap PIC yg mengajukan:</strong> {data.full_name_pic}</p>
        <p><strong>Pengajuan dari:</strong> {data.submission_from}</p>
        <p><strong>Sumber Permintaan:</strong> {data.request_source}</p>
        <p><strong>CID Pelanggan:</strong> {data.customer_cid}</p>
        <p><strong>Alamat Saat ini (existing):</strong> {data.current_address}</p>
        <p><strong>Alamat Tujuan (destinasi):</strong> {data.destination_address}</p>
        <p><strong>Titik koordinat:</strong> {data.coordinate_point}</p>
        <p><strong>Foto Rumah (optional, bila ada):</strong> {data.house_photo}</p>
        <p><strong>Tujuan Permintaan:</strong> {data.request_purpose}</p>
        <p><strong>Email Address:</strong> {data.email_address}</p>
        <p><strong>Hasil Pengecekan Tim HPM:</strong> {data.hpm_check_result}</p>
        <p><strong>Homepass id:</strong> {data.homepass_id}</p>
        <p><strong>Network:</strong> {data.network}</p>
        <p><strong>Status Home-ID:</strong> {data.home_id_status}</p>
        <p><strong>Remarks(Uncover/Reject):</strong> {data.remarks}</p>
        <p><strong>Note/Recommendation(free text):</strong> {data.notes_recommendations}</p>
        <p><strong>PIC HPM:</strong> {data.hpm_pic}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Tanggal Pengerjaan:</strong> {formatDate(data.completion_date)}</p>
      </div>
    </div>
  );
};

export default HpmDetail;
