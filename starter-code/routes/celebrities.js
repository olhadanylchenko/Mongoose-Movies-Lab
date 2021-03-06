const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("celebrities", { celebrities });
  });
});

router.get("/celebrities/new", (req, res) => {
  console.log("check@");
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res) => {
  //   res.send(req.params.id);
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      //   res.send(celebrity);
      res.render("celebrities/show", { celebrity });
    })
    .catch((err) => {
      console.log(err);
      // logs the error to the console
      next(err);
    });
});

router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase,
  })
    // .then((data) => data.save())

    .then((data) => {
      console.log(`Success ${data} was added to the database`);

      res.redirect("celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new");
    });
});

router.post("/celebrities/:id/delete", (req, res) => {
  Celebrity.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id/edit", (req, res) => {
  console.log("wtf");
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/edit", { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities/:id", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOneAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
  })
    .then((data) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
