const { db } = require("../models/db.js");

/**
 * This is used for testing the Client<->API connection, but this operation
 * won't be allowed in the final version of the project as it is a
 * security risk to expose all users
 */
const getAllUsers = async () => {
  return db("SELECT * FROM users");
};

const getUserByEmail = (email) => {
  return db(`SELECT * FROM users where userEmail = '${email}'`);
};

const createUser = ({ email, pass, fname, sname }) => {
  return db(
    `INSERT INTO users(userFirstName, userSurName, userEmail, userPassword )
    VALUES ('${fname}', '${sname}' , '${email}', '${pass}' ) `
  );
};

const getUserById = (id) => {
  return db(`SELECT * FROM users where userId = '${id}'`, [id]);
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers,
};
