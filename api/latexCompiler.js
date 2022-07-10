// const { v4: uuidv4 } = require("uuid");
const express = require("express");
// const { writeFile, readFile } = require("fs");
const { readFile } = require("fs");
const { exec } = require("child_process");

const router = express.Router();

const readFileSync = async (filePath) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// const writeFileSync = async (where, what) => {
//   return new Promise((resolve, reject) => {
//     const data = new Uint8Array(Buffer.from(what));
//     writeFile(where, data, (err) => {
//       if (err) reject(err);
//       resolve("File written!");
//     });
//   });
// };

// const compileLatex = async (texFile) => {
//   return new Promise((resolve, reject) => {
//     exec(`./laton -o public ${texFile}`, (error) => {
//       if (error) reject(error);

//       resolve("Success!");
//     });
//   });
// };

const compileTemplate = async (pathToTemplate) => {
  return new Promise((resolve, reject) => {
    exec(
      `./laton ./templates/${pathToTemplate}/main.tex ./templates/${pathToTemplate}/*`,
      (error) => {
        if (error) reject(error);

        resolve("Success!");
      }
    );
  });
};

router.get("/public/:file", async (req, res) => {
  const { file } = req.params;
  try {
    const pdfData = await readFileSync(`./public/${file}`);
    res.contentType("application/pdf");
    res.send(pdfData);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.get("/:template", async (req, res) => {
  const { template } = req.params;
  try {
    await compileTemplate(template);
    // return pdf
    const filePath = `./templates/${template}/main.tex`;
    const pdfData = await readFileSync(filePath);
    res.contentType("application/pdf");
    res.send(pdfData);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

// compile
router.post("/", (req, res) => {
  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      req.text += chunk;
    });

    req.on("end", async () => {
      try {
        const latexCode = req.text;

        res.json({
          pdf: `https://latexonline.cc/compile?text=${latexCode}&target=babis`,
        });
      } catch (e) {
        res.status(500).json({
          error: e.message,
        });
      }
    });
  }
});

// download .pdf
router.post("/download/pdf", (req, res) => {
  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      req.text += chunk;
    });

    req.on("end", async () => {
      try {
        const pdfCode = req.text;

        res.json({
          pdf: `https://latexonline.cc/compile?text=${pdfCode}&download=main.pdf`,
        });
      } catch (e) {
        res.status(500).json({
          error: e.message,
        });
      }
    });
  }
});

// download .tex
router.post("/download/tex", (req, res) => {
  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      req.text += chunk;
    });

    req.on("end", async () => {
      try {
        const texCode = req.text;

        res.json({
          pdf: `https://latexonline.cc/compile?text=${texCode}&download=main.tex`,
        });
      } catch (e) {
        res.status(500).json({
          error: e.message,
        });
      }
    });
  }
});

module.exports = router;
