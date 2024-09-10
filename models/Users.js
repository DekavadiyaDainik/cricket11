const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      trim: false,
      // required: true,
    },
    phone: {
      type: String,
      trim: false,
      required: true,
    },
    profile_img: {
      type: String,
      trim: false,
      required: false,
    },
    gender: {
      type: String,
      trim: false,
      required: false,
    },
    playing_role: {
      type: String,
      trim: false,
      required: false,
    },
    betting_style: {
      type: String,
      trim: false,
      required: false,
    },
    bowling_style: {
      type: String,
      trim: false,
      required: false,
    },
    birth_date: {
      type: String,
      trim: false,
      required: false,
    },
    email: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = { Users };
