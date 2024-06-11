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
      {/* <div className="flex justify-end">
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
      </div> */}

      <div class="p-8 rounded border border-gray-200">
  <h1 class="font-medium text-3xl">Add User</h1>
  <p class="text-gray-600 mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.</p>

  <form>
    <div class="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Nama Lengkap PIC yg mengajukan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.full_name_pic}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Timestamp:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{formatDate(data.timestamp)}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Pengajuan dari:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.submission_from}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Sumber Permintaan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.request_source}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">CID Pelanggan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.customer_cid}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Alamat Saat ini (existing):</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.current_address}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Alamat Tujuan (destinasi):</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.destination_address}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Titik koordinat:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.coordinate_point}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Tujuan Permintaan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.request_purpose}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Email Address:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.email_address}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Hasil Pengecekan Tim HPM:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.hpm_check_result}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Homepass id:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.homepass_id}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Network:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.network}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Status Home-ID:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.home_id_status}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Remarks(Uncover/Reject):</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.remarks}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Note/Recommendation(free text):</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.notes_recommendations}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">PIC HPM:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.hpm_pic}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Status:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.status}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Tanggal Pengerjaan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{formatDate(data.completion_date)}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Timestamp</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{formatDate(data.timestamp)}</div>
      </div>

    </div>




    <div class="space-x-4 mt-8 flex justify-end">
      <button type="submit" class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50">Update</button>

      <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Back</button>
    </div>
  </form>
</div>


    </div>
  );
};

export default HpmDetail;
