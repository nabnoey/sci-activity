import Activity from "../models/activity.model.js";

const activityController = {};

// Create new activity
activityController.create = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    } = req.body;

    // เช็คค่าว่าง
    if (
      !name || !description || !type || !level || !team_size || !date ||
      !location || !reg_open || !reg_close || !contact_name ||
      !contact_phone || !contact_email || !status
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // เช็คว่ามี activity นี้แล้วหรือยัง
    const exist = await Activity.findOne({ where: { name } });
    if (exist) {
      return res.status(400).send({ message: "Activity already exists" });
    }

    // สร้าง activity ใหม่
    const newActivity = await Activity.create({
      name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    });

    // ส่ง response กลับ client
    res.status(201).json({
      message: "Activity created successfully",
      activity: newActivity,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};


//get
activityController.getAll = async (req, res) => {
  await Activity.findAll()
    .then((data) => {
      res.send(data);
    })

    .catch((error) => {
      res.status(500).send({ message: error.message || "Something error" });
    });
};


//getByid
activityController.getById = async (req, res) => {
  const id = req.params.id;
  await Activity.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No found Activity with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: error.message || "Something error" + id });
    });
};



//update
activityController.update = async (req, res) => {
  const id = req.params.id;
  const {  name,
      description,
      type,
      level,
      team_size,
      date,
      location,
      reg_open,
      reg_close,
      contact_name,
      contact_phone,
      contact_email,
      status,
    
  } = req.body;

  if ( !name && !description && !type && !level && !team_size && !date &&
  !location && !reg_open && !reg_close && !contact_name &&
  !contact_phone && !contact_email && !status) {
    res
      .status(404)
      .send({ message: "Title, Type and ImageUrl can not be empty!" });
    return;
  }

  await Activity.update(
    { name: name,
  description: description,
  type: type,
  level: level,
  team_size: team_size,
  date: date,
  location: location,
  reg_open: reg_open,
  reg_close: reg_close,
  contact_name: contact_name,
  contact_phone: contact_phone,
  contact_email: contact_email,
  status: status, },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.send({ message: "Activity update successfully!" });
    } else {
      res.send({
        message:
          "Cannot update restaurant with id " +
          id +
          ".Maybe restaurant was not found or req.body is empty .",
      });
    }
  });
};


// Delete activity by id
activityController.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send({ message: "Id is missing" });
    }

    const num = await Activity.destroy({ where: { id } });

    if (num === 1) {
      res.send({ message: "Activity was deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete activity with id ${id}. Maybe not found.`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

export default activityController;
