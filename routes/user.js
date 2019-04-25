const routes = require("express").Router();
const User = require("../models").User;

routes.get("/", (req, res) => {
  User.findAll()
    .then(result => {
      res.render("userAll", {
        listdata: result.map(x => x.dataValues),
        column: User.getKeys()
      });
    })
    .catch(err => {
      res.render("error", { err: err });
    });
});

routes.get("/register", (req, res) => {
  res.render("userRegister", {
    column: User.getKeys()
  });
});

routes.post("/register", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
    money: req.body.money,
    gender: req.body.gender,
    role: req.body.role
  })
    .then(response => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("error", { err: err });
    });
});

routes.get("/edit/:id", (req, res) => {
  User.findByPk(req.params.id).then(result => {
    res.render("userEdit", {
      data: result.dataValues
    });
  });
});

routes.post("/edit/:id", (req, res) => {
  User.update(
    {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      country: req.body.country,
      money: req.body.money,
      gender: req.body.gender,
      role: req.body.role
    },
    {
      where: { id: req.params.id }
    }
  )
    .then(result => {
      res.redirect("/user");
    })
    .catch(err => {
      res.render("error", { err: err });
    });
});

routes.get("/delete/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(response => {
      res.redirect("/user");
    })
    .catch(err => {
      res.render("error", { err: err });
    });
});

module.exports = routes;
