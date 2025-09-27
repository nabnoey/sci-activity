import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ActivityService from "../services/activity.service";
const AddActivity = () => {
  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: Date.now(),
    location: "",
    reg_open: Date.now(),
    reg_close: Date.now(),
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const resetForm = () => {
    setActivity({
      name: "",
      description: "",
      type: "",
      level: "",
      team_size: 1,
      date: Date.now(),
      location: "",
      reg_open: Date.now(),
      reg_close: Date.now(),
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      status: "draft",
    });
  };
  const handleSubmit = async () => {
    try {
      const newActivity = await ActivityService.createActivity(activity);
      if (newActivity.status === 201) {
        Swal.fire({
          title: "Add new activity",
          text: "Add new activity successfully!",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/activities");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Add new activity",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold mb-4">Add new Activity</h1>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Activity Name"
          name="name"
          value={activity.name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Description"
          name="description"
          value={activity.description}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Type"
          name="type"
          value={activity.type}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Level"
          name="level"
          value={activity.level}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="number"
          className="grow"
          placeholder="Team size"
          name="team_size"
          value={activity.team_size}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="date"
          className="grow"
          placeholder="Date"
          name="date"
          value={activity.date}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Location"
          name="location"
          value={activity.location}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="date"
          className="grow"
          placeholder="Register Open Date"
          name="reg_open"
          value={activity.reg_open}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="date"
          className="grow"
          placeholder="Register Close Date"
          name="reg_close"
          value={activity.reg_close}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Contact name"
          name="contact_name"
          value={activity.contact_name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Phone Number"
          name="contact_phone"
          value={activity.contact_phone}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Email"
          name="contact_email"
          value={activity.contact_email}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Status"
          name="status"
          value={activity.status}
          onChange={handleChange}
        />
      </label>
      <button className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddActivity;
