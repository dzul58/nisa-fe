import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTaken = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleUntaken = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        'https://moving-address-be.oss.myrepublic.co.id/api/update-ticket-taken',
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "The ticket has been set to Untaken!",
      });
      
      navigate(`/hmpdetails/${id}`);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error while updating the ticket status.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/hmpdetails/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Ticket Status</h2>
      <p className="mb-6 text-center text-gray-600">Are you sure you want to set this ticket to Untaken?</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleUntaken}
          disabled={isLoading}
          className={`px-6 py-2 bg-[#662b81] text-white rounded hover:bg-[#4A0F70] transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Processing...' : 'Set to Untaken'}
        </button>
      </div>
    </div>
  );
};

export default UpdateTaken;