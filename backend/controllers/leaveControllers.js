import Leave from "./../models/leaveModel.js";
import asyncHandler from "express-async-handler";

// @desc Get leaves list
// @route GET/api/leaves
// @access Private/Admin
const getLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.find({});
  res.json(leaves);
});

export { getLeaves };
