import sequelize from "./db.js";
import Sequelize from "sequelize";
import User from "./user.model.js";
import Teacher from "./teacher.model.js";
import Admin from "./admin.model.js";
import Judge from "./judge.model.js";
import VerificationToken from "./verificationToken.model.js";
import Activity from "./activity.model.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Teacher = Teacher;
db.Admin = Admin;
db.Judge = Judge;
db.VerificationToken = VerificationToken;
db.Activity = Activity;

// Associations
db.User.hasOne(db.VerificationToken, { foreignKey: "userId" });
db.VerificationToken.belongsTo(db.User, { foreignKey: "userId" });

// สามารถเพิ่ม associations อื่นๆ ของ Teacher/Judge/Admin ต่อ User ได้
db.Teacher.belongsTo(db.User, { foreignKey: "id" });
db.Judge.belongsTo(db.User, { foreignKey: "id" });
db.Admin.belongsTo(db.User, { foreignKey: "id" });

export default db;
