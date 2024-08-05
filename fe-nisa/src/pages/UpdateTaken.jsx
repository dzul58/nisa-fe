import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateTaken = () => {
  const [ticketId, setTicketId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUntaken = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        'https://moving-address-be.oss.myrepublic.co.id/api/update-ticket-taken',
        { id: ticketId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "The ticket has been set to Untaken!",
      });
      
      setTicketId(""); // Clear the input field after successful update
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

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Ticket Status</h2>
      <form onSubmit={handleUntaken} className="space-y-4">
        <div>
          <label htmlFor="ticket" className="block text-sm font-medium text-gray-700">Ticket:</label>
          <input
            type="text"
            id="ticket"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 border border-gray-300"
            required
          />
        </div>
        <p className="text-center text-gray-600">Are you sure you want to set this ticket to Untaken?</p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setTicketId("")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-[#662b81] text-white rounded hover:bg-[#4A0F70] transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Set to Untaken'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaken;