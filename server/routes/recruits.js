const express = require("express");
const router = express.Router();
const { Recruit } = require("../models/Recruit");
const { User } = require("../models/User");

// post recruit content route

router.post("/post", (req, res) => {
  const recruit = new Recruit(req.body.submitRecruitDetail);

  recruit.save((err, recruitPost) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

// get latest recruits content route

router.get("/latestPosts", (req, res) => {
  Recruit.find()
    .populate("writer")
    .exec((err, recruits) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res.status(200).json({ success: true, recruits });
      }
    });
});

// get a specific recruit route

router.get("/recruitDetail", (req, res) => {
  Recruit.findOne()
    .populate("writer")
    .exec((err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res
        .status(200)
        .json({ success: true, recruitDetail: recruit });
    });
});

module.exports = router;
