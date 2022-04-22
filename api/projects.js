const fs = require("fs");
const express = require("express");

const router = express.Router();

const passport = require("passport");

const jwt = require("jsonwebtoken");

const { pool } = require("../models/db.js");

// Register routes

// read projects
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);
    console.log("USERID", decoded.userId);

    pool.query(
      `SELECT * FROM projects WHERE projectDeleted="0" AND projectOwnerId='${decoded.userId}' ORDER BY projectId DESC`,
      (error, results) => {
        if (error) throw error;
        res.send(results);
      }
    );
  }
);

// create project
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const mapBool = {
      true: 1,
      false: 0,
    };
    const publicBoolean = mapBool[req.body.public];
    const token = req.headers.authorization.slice(7);
    const decoded = jwt.decode(token);

    pool.query(
      `INSERT INTO projects(projectTitle, projectCategory, projectTemplate, projectState, projectOwnerId) VALUES ('${req.body.title}', '${req.body.category}', '${req.body.template.folderName}', '${publicBoolean}', '${decoded.userId}' ) `,
      (error, results) => {
        if (error) {
          res.status(500).json({
            error: error.message,
          });

          throw error;
        }

        pool.query(
          `SELECT * FROM projects WHERE projectId=${results.insertId}`,
          (error1, results1) => {
            if (error1) throw error;
            res.send(results1);
          }
        );
      }
    );
  }
);

// delete project
router.delete("/:projectId", (req, res) => {
  const id = req.params.projectId;

  pool.query(
    `SELECT * FROM projects WHERE projectId=${id}`,
    // eslint-disable-next-line consistent-return
    (error, results) => {
      const projects = JSON.parse(JSON.stringify(results));
      if (error) throw error;
      if (projects.length > 0) {
        const projectToBeDeleted = projects[0];
        if (projectToBeDeleted.projectDeleted === 1) {
          pool.query(
            `DELETE FROM projects WHERE projectId=${projectToBeDeleted.projectId}`,
            (err) => {
              if (err) {
                return res.status(500).send({
                  error: err.message,
                });
              }
              return res.status(200).send({
                message: `Project with id: ${id} deleted`,
              });
            }
          );
        } else {
          pool.query(
            `UPDATE projects SET projectDeleted = 1 WHERE projectId=${projectToBeDeleted.projectId}`
          );
          return res.status(200).send({
            message: `Project with id: ${id} marked as deleted`,
          });
        }
      } else {
        return res.status(400).send({
          message: `Project with id: ${id} does not exist!`,
        });
      }
    }
  );
});

// get project to be deleted
router.get("/deleted", (req, res) => {
  pool.query(
    `SELECT * FROM projects WHERE projectDeleted="1" ORDER BY projectDateCreated DESC`,
    (err, results) => {
      if (err) res.status(500).send({ error: err.message });

      return res.status(200).send(results);
    }
  );
});

// get public project
router.get("/public", (req, res) => {
  pool.query(
    `SELECT * FROM projects WHERE projectState="1" AND projectDeleted="0" ORDER BY projectDateCreated DESC`,
    (err, results) => {
      if (err) res.status(500).send({ error: err.message });

      return res.status(200).send(results);
    }
  );
});

// get project id
router.get("/:projectId", (req, res) => {
  const id = req.params.projectId;
  pool.query(`SELECT * FROM projects WHERE projectId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    return res.status(200).send(results[0]);
  });
});

// query mappings for put update
// const getQuery = (reqBody) => {
//   const mappings = {
//     title: "projectTitle",
//     category: "projectCategory",
//     public: "projectState",
//     isDeleted: "projectDeleted",
//     text: "projectInfo",
//   };
//   const entries = Object.entries(reqBody);

//   const array = entries.map((entry) => {
//     const key = entry[0];
//     const value = entry[1];

//     return `${mappings[key]} = '${value}'`;
//   });

//   const query = array.join(", ");

//   return query;
// };

const getQuery = (reqBody) => {
  const query = {};

  // const mappings = {
  //   title: "projectTitle",
  //   category: "projectCategory",
  //   public: "projectState",
  //   isDeleted: "projectDeleted",
  //   text: "projectInfo",
  // };

  if (reqBody.title) {
    query.projectTitle = reqBody.title;
  }

  if (reqBody.category) {
    query.projectCategory = reqBody.category;
  }

  if (reqBody.public) {
    query.projectState = reqBody.public;
  }

  if (reqBody.isDeleted) {
    query.projectDeleted = reqBody.isDeleted;
  }

  if (reqBody.text) {
    query.projectInfo = reqBody.text;
  }

  // if (reqBody.text) {
  //   const mathTemplate = fs.readFileSync(
  //     "./templates/math-example/main.tex",
  //     "utf8"
  //   );
  //   query.projectInfo = `${mathTemplate}`;
  // }

  return query;
};

// put update
router.put("/:projectId", (req, res) => {
  const id = req.params.projectId;

  pool.query(
    `UPDATE projects SET ? WHERE projectId=${id}`,
    getQuery(req.body),
    (err) => {
      if (err) res.status(500).send({ error: err.message });
      return res.status(200).send({
        message: `Project with id: ${id}, updated!`,
      });
    }
  );
});

// export
module.exports = router;
