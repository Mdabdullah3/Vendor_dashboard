import React, { useEffect } from "react";
import { FiPlus, FiInfo, FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useEventStore from "../../store/EventStore";
import { SERVER } from "../../config";
import { FaTrash } from "react-icons/fa";
const EventManager = () => {
  const { events, fetchEvents, deleteEvent } = useEventStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const isExpired = (endDate) => {
    const end = new Date(endDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    console.log(end, today);

    return end > today;
  };

  const handleManageProducts = (eventId) => {
    navigate(`/admin/join-event/${eventId}`);
  };

  const header = [
    "Event Name",
    "Image",
    "Product Count",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ];

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
  };
  return (
    <div className="flex h-screen p-10 bg-gray-100">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Event Manager</h1>
          <Link to="/admin/create-event">
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary/60">
              <FiPlus className="mr-2" /> Add New Event
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              {header.map((head, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events?.map((event) => (
              <tr key={event.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{event.name}</td>
                <td className="py-4 px-6">
                  {event?.image?.secure_url ? (
                    <img
                      src={`${SERVER}${event?.image?.secure_url}  `}
                      alt={event?.name}
                      className="h-12"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="py-4 px-6">
                  {event?.eventProducts?.length || 0}
                </td>
                <td className="py-4 px-6">
                  {format(new Date(event?.startDate), "dd/MM/yyyy")}
                </td>
                <td className="py-4 px-6">
                  {format(new Date(event?.endDate), "dd/MM/yyyy")}
                </td>
                <td
                  className={`py-4 px-6 ${
                    isExpired(event?.endDate)
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {isExpired(event?.endDate) ? "Active" : "Expired"}
                </td>
                <td className="py-4 px-6 flex space-x-2">
                  <Link
                    to={`/admin/edit-event/${event.id}`}
                    className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </Link>
                  {isExpired(event?.endDate) ? (
                    <button
                      onClick={() => handleManageProducts(event.id)}
                      className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <FiInfo className="mr-1" /> Join
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManager;
