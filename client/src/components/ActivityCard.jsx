import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ActivityService from '../services/activity.service'; 

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleUpdateClick = () => {
    navigate(`/activities/edit/${activity.id}`);
  };

  const handleDeleteClick = async () => {
    Swal.fire({
      title: 'ยืนยันที่จะลบกิจกรรม?',
      text: "กิจกรรมจะไม่สามารถกู้คืนกลับมาได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ActivityService.deleteActivities(activity.id); 
          Swal.fire(
            'ลบกิจกรรมสำเร็จ!',
            'กิจกรรมถูกลบแล้ว.',
            'success'
          );
          navigate('/activities'); 
        } catch (error) {
          Swal.fire(
            'Error!',
            'Failed to delete activity.',
            'error'
          );
          console.error('Error deleting activity:', error);
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-3xl">
      {/* Header Gradient */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
        <h2 className="text-white text-2xl font-bold">{activity.name}</h2>
        <p className="text-indigo-100 mt-1">{activity.description}</p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
            {activity.type === "competition" ? "การแข่งขัน" : activity.type}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full text-sm">
            ระดับ: {activity.level}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 font-semibold rounded-full text-sm">
            ทีม: {activity.team_size} คน
          </span>
          <span
            className={`px-3 py-1 font-semibold rounded-full text-sm ${
              activity.status === "open"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-600"
            }`}
          >
            {activity.status === "open" ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
          <p>
            <strong>วันที่แข่งขัน:</strong> {formatDate(activity.date)}
          </p>
          <p>
            <strong>รับสมัคร:</strong> {formatDate(activity.reg_open)} – {formatDate(activity.reg_close)}
          </p>
          <p>
            <strong>สถานที่:</strong> {activity.location}
          </p>
        </div>

        <div className="border-t border-gray-200 mt-3 pt-3"></div>

        {/* Contact Info */}
        <div className="text-sm space-y-1">
          <p>
            <strong>ติดต่อ:</strong> {activity.contact_name}
          </p>
          <p>📞 {activity.contact_phone}</p>
          <p>
            ✉️{" "}
            <a
              href={`mailto:${activity.contact_email}`}
              className="text-indigo-600 underline hover:text-indigo-800 transition-colors"
            >
              {activity.contact_email}
            </a>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleUpdateClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Update
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ActivityCard;
