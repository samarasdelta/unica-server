const express = require("express");

const router = express.Router();

const pool = require("../models/db.js");

// Register routes

// read projects
router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM projects ORDER BY projectId DESC ",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// create project
router.post("/", (req, res) => {
  pool.query(
    `INSERT INTO projects(projectTitle, projectCategory, projectState) VALUES ('${req.body.title}', '${req.body.category}', '${req.body.public}') `,
    (error, results) => {
      // console.log(results.insertId);
      if (error) {
        // console.log('Error message: ', error.message);
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
});

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

// get project id
router.get("/:projectId", (req, res) => {
  const id = req.params.projectId;
  pool.query(`SELECT * FROM projects WHERE projectId=${id}`, (err, results) => {
    if (err) res.status(500).send({ error: err.message });

    return res.status(200).send(results[0]);
  });
});

// query mappings for put update
const getQuery = (reqBody) => {
  const mappings = {
    title: "projectTitle",
    category: "projectCategory",
    public: "projectState",
  };

  return Object.entries(reqBody)
    .map((entry) => {
      const key = entry[0];
      const value = entry[1];

      return `${mappings[key]} = '${value}'`;
    })
    .join(", ");
};

// put update
router.put("/:projectId", (req, res) => {
  const id = req.params.projectId;

  pool.query(
    `UPDATE projects SET ${getQuery(req.body)} WHERE projectId=${id}`,
    (err) => {
      if (err) res.status(500).send({ error: err.message });
      return res.status(200).send({
        message: `Project with id: ${id}, title, category and state changed`,
      });
    }
  );
});

// export
module.exports = router;
