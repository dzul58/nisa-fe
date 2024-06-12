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

  return (
    <div className="p-4">
      <div class="p-8 rounded border border-gray-200">
  <h1 class="font-medium text-3xl">Detail Moving Address</h1>
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
            <label className="text-sm text-gray-700 block mb-1 font-medium">Pengajuan dari:</label>
            {data.submission_from ? (
              <div className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">
                {data.submission_from}
              </div>
            ) : (
              <div className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">
                <input type="text" placeholder="Pengajuan dari:" className="w-full bg-transparent focus:outline-none" disabled />
              </div>
            )}
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
        <label class="text-sm text-gray-700 block mb-1 font-medium" rows="3">Alamat Saat ini (existing):</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full">{data.current_address}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium" rows="3">Alamat Tujuan (destinasi):</label>
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
        <div rows="3" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.notes_recommendations}</div>
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
        <label class="text-sm text-gray-700 block mb-1 font-medium">Photo Rumah:</label>
        <div rows="2"  class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{data.house_photo}</div>
      </div>

      <div>
        <label class="text-sm text-gray-700 block mb-1 font-medium">Tanggal Pengerjaan:</label>
        <div class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" >{formatDate(data.completion_date)}</div>
      </div>

    </div>



    <div>
    <button
  class="p-4 border border-gray-200 rounded w-64 bg-white hover:bg-gray-50 hover:border-b-4 hover:border-b-blue-500 flex items-center active:bg-gray-100"
>
  <div class="flex justify-center items-center text-gray-500 mr-4">
    <svg
      xmlns={data.house_photo}
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  </div>
  <h1 class="font-bold text-gray-700 text-sm">Content page</h1>
</button>
      
      <div class="space-x-4 mt-8 flex justify-end">
        <button type="submit" class="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50">Update</button>
        <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Back</button>
      </div>
    </div>

    
  </form>
</div>


    </div>
  );
};

export default HpmDetail;
