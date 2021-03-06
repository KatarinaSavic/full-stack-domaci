const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Partner = require("../models/partner.model");

/**
 * LOGIN WS
 */
router.get("/:email/:pass", (req, response) => {
  User.findOne({ email: req.params.email }, (err, res) => {
    if (err) {
      response.status(400).send({
        err,
        msg: "Doslo je do greske",
      });
      return;
    }
    if (res) {
      if (res.password == req.params.pass) {
        response.status(200).send({
          msg: "korisnik",
          user: res,
        });
      } else {
        response.status(200).send({
          msg: "korisnik pogresan pass",
        });
      }
    } else {
      Partner.findOne({ email: req.params.email }, (err, res) => {
        if (err) {
          response.status(400).send({
            err,
            msg: "Doslo je do greske",
          });
          return;
        }
        if (res) {
          if (res.password == req.params.pass) {
            response.status(200).send({
              msg: "partner",
              user: res,
            });
          } else {
            response.status(200).send({
              msg: "partner pogresan pass",
            });
          }
        } else {
          response.status(200).send({
            msg: "ne postoji",
          });
        }
      });
      // ne postoji user sa prosledjenim mailom
    }
  });
});

module.exports = router;
