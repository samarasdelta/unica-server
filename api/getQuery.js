const assert = require("assert");

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

assert.equal(getQuery({ title: "mpampis" }), "projectTitle = 'mpampis'");
assert.equal(
  getQuery({ category: "Engineering" }),
  "projectCategory = 'Engineering'"
);

assert.equal(
  getQuery({ title: "mpampis", category: "Negi" }),
  "projectTitle = 'mpampis', projectCategory = 'Negi'"
);

assert.equal(
  getQuery({ title: "mpampis", category: "Negi", public: 1 }),
  "projectTitle = 'mpampis', projectCategory = 'Negi', projectState = '1'"
);

// eslint-disable-next-line
console.log("All tests passed!!");
