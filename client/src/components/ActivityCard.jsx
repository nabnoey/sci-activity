const ActivityCard = ({ activity }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
      </div>
    </div>
  );
};
export default ActivityCard;
