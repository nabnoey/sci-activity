import sequelize from "./db.js";
import Sequelize from "sequelize";
import Teacher from "./teacher.model.js";
import Admin from "./admin.model.js";
import Judge from "./judge.model.js";
import VeriticationToken from "./verificationToken.model.js";
import Activity from "./activity.model.js"



//สร้าง object db เพื่อรวมทุกอย่าง
const db = {};

// S ตัวเล็ก
db.sequelize = sequelize; // instance ที่ใช้เชื่อม DB
// S ตัวใหญ่
db.Sequelize = Sequelize; // class Sequelize

db.User = User; // model user
db.Activity = Activity
db.Teacher = Teacher
db.Admin = Admin
db.Judge = Judge
db.VeriticationToken = VeriticationToken

// Association
db.VeriticationToken.belongTo(db.User,{foreigKey:"userId"});
db.User.belongTo(db.VeriticationToken,{foreigKey:"userId"}); // เพราะ 1 user มีได้ 1 token แล้ว 1 token ก็สามารถมีได้คนเดียวเพราะมันจะไม่ซ้ำกัน

export default db;
