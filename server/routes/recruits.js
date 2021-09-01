const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Recruit } = require("../models/Recruit");
// const { User } = require("../models/User");

// post recruit content route

router.post("/recruit", (req, res) => {
  const recruit = new Recruit(req.body.submitRecruitDetail);

  recruit.save((err, recruitPost) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

// get latest recruits content route

router.get("/latestRecruits", (req, res) => {
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
    .populate("_id")
    .exec((err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true, recruitDetail: recruit });
    });
});

// update a specific reqcruit route

router.patch("/recruit", (req, res) => {
  let {
    recruitId,
    title,
    projectDetail,
    recruitPositions,
    requiredExperience,
    meetingLocation,
  } = req.body.submitRecruitDetail;

  recruitId = mongoose.Types.ObjectId(recruitId);

  Recruit.findByIdAndUpdate(
    recruitId,
    req.body.submitRecruitDetail,
    (err, recruit) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }

      return res.status(200).json({ success: true });
    }
  );
});

// delete a specific reqcruit route

router.delete("/recruit", (req, res) => {
  let recruitId = mongoose.Types.ObjectId(
    req.body.submitRecruitDetail.recruitId
  );

  Recruit.findByIdAndRemove(recruitId, null, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

module.exports = router;
