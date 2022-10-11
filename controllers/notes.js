const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

// GET

notesRouter.get("/", async (request, response) => {
  // OLD
  // Note.find({}).then((notes) => {
  //   response.json(notes);
  // });

  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

notesRouter.get("/:id", async (request, response) => {
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

  // OLD
  // Note.findById(request.params.id)
  //   .then((note) => {
  //     if (note) {
  //       response.json(note);
  //     } else {
  //       response.status(404).end();
  //     }
  //   })
  //   .catch((error) => next(error));

  // OLD
  // try {
  //   const note = await Note.findById(request.params.id);
  //   if (note) {
  //     response.json(note);
  //   } else {
  //     response.status(404).end();
  //   }
  // } catch (exception) {
  //   next(exception);
  // }

  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// POST
notesRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log("body", body);

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content-missing",
    });
  }

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });

  // Old
  // notes = notes.concat(note);
  // response.json(note);

  // OLD
  // note
  //   .save()
  //   .then((savedNote) => {
  //     response.status(201).json(savedNote);
  //   })
  //   .catch((error) => next(error));

  // OLD
  // try {
  //   const savedNote = await note.save();
  //   response.status(201).json(savedNote);
  // } catch (exception) {
  //   next(exception);
  // }

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

// PUT
notesRouter.put("/:id", (request, response, next) => {
  // const note = {
  //   content: body.content,
  //   important: body.important,
  // };

  const { content, important } = request.body;
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// DELETE
notesRouter.delete("/:id", async (request, response) => {
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

  // OLD
  // Note.findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end();
  //   })
  //   .catch((error) => next(error));

  // OLD
  // try {
  //   await Note.findByIdAndRemove(request.params.id);
  //   response.status(204).end();
  // } catch (exception) {
  //   next(exception);
  // }
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// app.delete("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// });

module.exports = notesRouter;
