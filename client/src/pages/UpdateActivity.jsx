import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Changed from "react-router"
import ActivityService from "../services/activity.service"; // Changed import name
import Swal from "sweetalert2";

const UpdateActivity = () => { // Renamed component from Update to UpdateActivity
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: "",
    location: "",
    reg_open: "",
    reg_close: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  // Helper to format date for datetime-local input
  const formatDateTimeLocal = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await ActivityService.getById(id); // Changed to getById
        if (res.status === 200) {
          const fetchedActivity = res.data;
          // Format dates for input fields
          fetchedActivity.date = fetchedActivity.date ? new Date(fetchedActivity.date).toISOString().split('T')[0] : '';
          fetchedActivity.reg_open = formatDateTimeLocal(fetchedActivity.reg_open);
          fetchedActivity.reg_close = formatDateTimeLocal(fetchedActivity.reg_close);
          setActivity(fetchedActivity);
        } else {
          Swal.fire({
            title: "Activity Not Found",
            icon: "error",
            text: `No activity found with ID: ${id}`,
          });
        }
      } catch (err) {
        console.error('Failed to fetch activity data:', err);
        let errorMessage = 'Failed to fetch activity data.';
        if (err.response) {
          errorMessage += ` Status: ${err.response.status}. Data: ${JSON.stringify(err.response.data)}`;
        } else if (err.request) {
          errorMessage += ' No response received from server. Check if backend is running and accessible.';
        } else {
          errorMessage += ` Error: ${err.message}`;
        }
        Swal.fire({
          title: "Error fetching activity",
          icon: "error",
          text: errorMessage,
        });
      }
    };
    fetchActivity();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ActivityService.update(id, activity); // Changed to update
      if (res.status === 200) {
        Swal.fire({
          title: "Activity Updated",
          icon: "success",
          text: "Successfully updated activity.",
        }).then(() => navigate("/activities")); // Changed navigation target
      }
    } catch (err) {
      console.error('Failed to update activity:', err);
      let errorMessage = 'Failed to update activity.';
      if (err.response) {
        errorMessage += ` Status: ${err.response.status}. Data: ${JSON.stringify(err.response.data)}`;
      } else if (err.request) {
        errorMessage += ' No response received from server. Check if backend is running and accessible.';
      } else {
        errorMessage += ` Error: ${err.message}`;
      }
      Swal.fire({
        title: "Update Failed",
        icon: "error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 transform transition-all duration-300 hover:shadow-3xl">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4 tracking-tight">
          ✏️ แก้ไขกิจกรรม
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          ปรับปรุงข้อมูลกิจกรรมให้ครบถ้วนและถูกต้อง
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Activity Details Section */}
          <div className="bg-indigo-50 p-6 rounded-lg shadow-inner border border-indigo-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b-2 border-indigo-300 pb-2">ข้อมูลกิจกรรม</h2>
            <div className="space-y-5">
              {/* Name */}
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">ชื่อกิจกรรม</label>
                <input
                  type="text"
                  name="name"
                  placeholder="ชื่อกิจกรรม"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  value={activity.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">รายละเอียดกิจกรรม</label>
                <textarea
                  name="description"
                  placeholder="รายละเอียด"
                  className="textarea textarea-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm h-32 resize-y"
                  value={activity.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Type & Level */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label font-semibold text-gray-700 text-base">ประเภทกิจกรรม</label>
                  <input
                    type="text"
                    name="type"
                    className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    value={activity.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-gray-700 text-base">ระดับ</label>
                  <input
                    type="text"
                    name="level"
                    className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    value={activity.level}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Team & Date */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="form-control">
                  <label className="label font-semibold text-gray-700 text-base">จำนวนสมาชิกต่อทีม</label>
                  <input
                    type="number"
                    name="team_size"
                    min={1}
                    className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    value={activity.team_size}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-semibold text-gray-700 text-base">วันที่แข่งขัน</label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                    value={activity.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">สถานที่จัดกิจกรรม</label>
                <input
                  type="text"
                  name="location"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  value={activity.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Registration Dates Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b-2 border-blue-300 pb-2">ช่วงเวลาการรับสมัคร</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">เปิดรับสมัคร</label>
                <input
                  type="datetime-local"
                  name="reg_open"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  value={activity.reg_open}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">ปิดรับสมัคร</label>
                <input
                  type="datetime-local"
                  name="reg_close"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  value={activity.reg_close}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-green-50 p-6 rounded-lg shadow-inner border border-green-200">
            <h2 className="text-2xl font-bold text-green-600 mb-6 border-b-2 border-green-300 pb-2">ข้อมูลติดต่อ</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">ผู้ติดต่อ</label>
                <input
                  type="text"
                  name="contact_name"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                  value={activity.contact_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">เบอร์โทร</label>
                <input
                  type="text"
                  name="contact_phone"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                  value={activity.contact_phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold text-gray-700 text-base">อีเมล</label>
                <input
                  type="email"
                  name="contact_email"
                  className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 shadow-sm"
                  value={activity.contact_email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
            >
              ✅ บันทึกการแก้ไข
            </button>
            <button
              type="button"
              className="px-8 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate("/activities")}
            >
              ❌ ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateActivity; 