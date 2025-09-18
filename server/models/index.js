import sequelize from "./db.js";
import Sequelize from "sequelize"; // libralies
import User from "./user.model.js";
import Activity from "./activity.model.js";

import VerificationToken from "./verificationToken.model.js";

const db = {};
// S ตัวเล็ก
//import มาจาก db.js
db.sequelize = sequelize;
// S ตัวใหญ่
//import มาจาก libralies
db.Sequelize = Sequelize;

db.User = User;
db.Activity = Activity;

db.VerificationToken = VerificationToken;

//association
db.VerificationToken.belongsTo(User, { foreignKey: "userId" });



export default db;