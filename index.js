const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note");

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

app.use(express.json());

app.use(requestLogger);

app.use(cors());

app.use(express.static("build"));

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2022-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2022-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2022-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//   console.log("maxid...", ...notes.map((n) => n.id));
//   console.log(
//     "maxid",
//     notes.map((n) => n.id)
//   );
//   return maxId + 1;
// };

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// GET
app.get("/", (request, response) => {
  response.send("<h1>Hello Worlds!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  // OLD
  // const id = Number(request.params.id);
  // console.log("id", id);
  // const note = notes.find((note) => {
  //   console.log(
  //     "note get no",
  //     note.id,
  //     typeof note.id,
  //     id,
  //     typeof id,
  //     note.id === id
  //   );
  //   return note.id === id;
  // });
  // console.log("note", note);

  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }

  // console.log("note", note);
  // response.json(note);

  // NEW
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST
app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log("body", body);

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content-missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  // Old
  // notes = notes.concat(note);
  // response.json(note);

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// PUT
app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// DELETE
app.delete("/api/notes/:id", (request, response, next) => {
  // OLD
  // const id = Number(request.params.id);
  // notes = notes.filter((note) => {
  //   console.log(
  //     "note delete",
  //     note.id,
  //     typeof note.id,
  //     id,
  //     typeof id,
  //     note.id === id
  //   );
  //   return note.id !== id;
  // });
  // console.log("notes", notes);
  // response.status(204).end();

  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
