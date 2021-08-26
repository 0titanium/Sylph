const express = require("express");
const router = express.Router();
const { Recruit } = require("../models/Recruit");

// post recruit route

router.post("/post", (req, res) => {
  const recruit = new Recruit(req.body.submitRecruitDetail);

  recruit.save((err, recruitPost) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true });
  });
});

module.exports = router;
