const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { body } = request;
  const object = { id: uuid(), ...body, likes: 0 };

  repositories.push(object);

  response.status(200).json(object);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id: requesId } = request.params;
  const projectIndex = repositories.findIndex(({ id }) => id == requesId);

  repositories[projectIndex] = request.body.body;
  response.status(200).jsonp({ body: repositories[projectIndex] });
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id: requesId } = request.params;

  const projectIndex = repositories.findIndex(({ id }) => id == requesId);
  //console.log(projectIndex);

  const likeProject = (index) => {
    return index != -1 ? (repositories[index].likes += 1) : false;
  };
  // response.send = () => {
  //   response.body = repositories[projectIndex];

  // }

  return likeProject(projectIndex)
    ? response.status(200).jsonp({ likes: repositories[projectIndex].likes })
    : response.status(400).json("not project");
});

module.exports = app;
