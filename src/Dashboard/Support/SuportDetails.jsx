import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useReportStore from "../../store/ReportStore";

const ReportDetails = () => {
  const { id } = useParams();
  const { report, fetchReportById, deleteReport } = useReportStore();

  useEffect(() => {
    fetchReportById(id);
  }, [fetchReportById, id]);

  const handleDelete = async () => {
    await deleteReport(id);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Report Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{report.title}</h2>
        <div className="mb-4">
          <img
            src={report.image}
            alt="Report"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <p className="text-gray-700 mb-4">{report.message}</p>
        <p className="text-gray-600">{report.description}</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FaTrash className="inline mr-2" /> Delete Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
