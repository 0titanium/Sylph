const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recruitSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxLength: 100,
    },
    projectDetail: {
      type: String,
    },
    recruitPositions: {
      type: Array,
      default: [],
    },
    languages: {
      type: Array,
      default: [],
    },
    Qualifications: {
      type: String,
    },
    meetingLocation: {
      type: String,
      maxLength: 100,
    },
    personnel: {
      type: Number,
    },
    applyfor: {
      type: Array,
      default: [],
    },
    member: {
      type: Array,
      default: [],
    },
    recruitCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Recruit = mongoose.model("Recruit", recruitSchema);

module.exports = { Recruit };
