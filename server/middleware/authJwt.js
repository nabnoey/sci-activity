import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.User;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" }); 
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.username = decoded.username;
    next();
  });
};


const isAdmin = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].roleName === "admin") {
                    next();
                    return
                }
            }

            res.status(401).send({ message: "Unauthorized access, require admin role" });
            return;
        });
    });
};

// const authJwt = {verifyToken, isAdmin};


const isManager = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].roleName === "admin") {
                    next();
                    return ;
                }
            }

            res.status(401).send({ message: "Unauthorized access, require admin role" });
            return;
        });
    });
};



const isTescher = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].roleName === "admin") {
                    next();
                    return ;
                }
            }

            res.status(401).send({ message: "Unauthorized access, require admin role" });
            return;
        });
    });
};



const isJudge = (req, res, next) => {
    User.findByPk(req.username).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].roleName === "admin") {
                    next();
                    return ;
                }
            }

            res.status(401).send({ message: "Unauthorized access, require admin role" });
            return;
        });
    });
};

const authJwt = {verifyToken, isAdmin, isManager,isTescher,isJudge};

export default authJwt
