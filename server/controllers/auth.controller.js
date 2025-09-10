import jwt from "jsonwebtoken"
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
import crypto from "crypto"



const User = db.User;

//Register
const signUp = async (req,res) =>{
  const {
    email, password, type, name
  } = req.body
  try{
    //check alidation request ส้ง 4 ฟิล นี้เราให้ด้วยจ้า
    if(!email || !password || !type || !name){
      return res.status(400).send({message: "Email, password, type, name are you require !"})
    }

const allowType = ["admin","teacher","judge"];
if(!allowType.includes(type)){
   return res.status(400).send({message: "Invalid user type. Must be admin, teacher or judge"})
}

//check addition validation for teacher
//ทำใน วงเล็บก่อน
if(type === "teacher" && (!school || !phone)){
return res.status(400).send({message: "school and phone are required for tescher!"})

}

//check if user already exists
//จะไม่เจอ awit + then
const existingUser = await User.findOne({
  where:{
    email: email,
  }
});

//มีemail อยู่แล้ว
if(existingUser){
  return res.status(400).send({message: "Email already in use!"})
}
//เตรียมข้อมูลในการสร้าง 
const userData = {
  name:name, email:email, password:password, type:type,
};
if(type === 'teacher'){
  userData.school = school;
  userData.phone = phone;
}

//create new user

const user = await User.create(userData);


//if user is a teacher, create, send Verification email
if(type === "teacher"){
  //create verification
const token = crypto.randomBytes(32).toString("hex");
const verification = await db.VeriticationToken.create({
  token,
  userId: user.id,
  expiredAt: new DateTransfer.now()+24*60*60
})
}

res.status(201).send({
  message: user.type === "teacher" ? "Registration Successfully! Please check your email to verify your account"
  : "User registed Successfully! ",

  user: {
    id:user.id,
    name:user.name,
    email:user.email,
    type:user.type,
    ...(user.type === "teacher" && {isVerified: user.isVerified})
  },
});

  }catch (error){
return res.status(500).send({message: "Some error occorred"});
  }
}







const authController = {};
//function Register รับ2 parameter คือ req(ผู้ใช้ส่งเข้ามา), res(ส่งข้อมูลกลับไปยังผู้ใช้)
authController.Register = async (req, res) => {
  // user ส่ง ข้อมูลผ่าน body
  const { username, fullName, email, password } = req.body;

  // validate ข้อมูล ที่ user ส่งมา
  if (!username || !fullName || !email || !password) {
    res.status(400).send({ message: "Please provide all require fields." });
    return;
  }

  // เช็ค username ซ้ำว่ากันไหม
  // SQL = SELECT * FROM user WHERE username = username;
  await User.findOne({
    where: { username: username },
    attributes: { exclude: ["password"] },
  })
    // .select(-password) คือ ไม่ดึง field password มาแสดง
    .then((user) => {
      // ถ้ามี username อยู่แล้วจะไม่ให้ทำ process ต่อไป
      if (user) {
        res.status(400).send({ message: "Username is already existed." });
        return;
      }

      const newUser = {
        username: username,
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, 8),
      };

      User.create(newUser)
        .then((user) => {
          // เช็คว่า user ส่ง role มาด้วยไหม
          // send roles in body [ADMIN] *แอดมินเป็นคนส่งมา
          if (req.body.roles) {
            // นำ roles ที่ส่งมา เทียบกับ role ที่อยู่ใน table
            // SQL = SELECT * FROM ROLE WHERE roleName = role1 OR roleName = role2 OR roleName = role3
            Role.findAll({
              where: {
                roleName: { [Op.or]: req.body.roles }, // เช็ค roles ที่ส่งมา
              },
            }).then((roles) => {
              user.setRoles(roles).then(() => {
                res.send({ message: "User registered successfully" });
              });
            });
          } else {
            // ใส่ค่า default role เป็น user
            // user สมัคร
            user.setRoles([3]).then(() => {
              res.send({ message: "User registered successfully" });
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Something error while registering a new user",
          });
        });
    });
};

authController.signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Username or password are missing",
    });
    return;
  }
  await User.findOne({
    where: { username: username },
  }).then((user) => {
    if (!user) {
      res.status(404).send({ message: "User Not Found!" });
      return;
    }

    const passwordIsaValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsaValid) {
      res.status(401).send({ message: "invalid password" });
    }
    //valid user

    const token = jwt.sign({ username: user.username }, config.secret, {
      expiresIn: 864000, //24h
    });

    const authorities = [];
    user.getRoles().then((roles) => {
      console.log(roles);
      for (let i = 0; i < roles.length; i++) {
        //ROLES_USER
        authorities.push("ROLES_" + roles[i].roleName.toUpperCase());
      }
       res.send({
      token: token,
      authorities: authorities,
      userInfo: {
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    });
    });

   
  });
};

export default authController;
