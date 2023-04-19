import User from "../models/userModel.js";
import LeaveQuota from "./../models/leaveQuotaModel.js";
import asyncHandler from "express-async-handler";

//Description: Get all leave quotas
//Route: Get/api/leaveQuotas
//Access: Private/Admin
const getQuotas = asyncHandler(async (req, res) => {
  const quotas = await LeaveQuota.find({});
  res.json(quotas);
});

//Description: Create or update leave quotas
//Route: Put/api/leaveQuotas
//Access: Private/Admin
const updateQuotas = asyncHandler(async (req, res) => {
  const leaveQuotas = req.body.leaveQuotas;

  const existingLeaveQuotas = await LeaveQuota.find();
  const users = await User.find({});

  //If there are no documents in the collection, create new documents
  if (existingLeaveQuotas.length === 0) {
    await LeaveQuota.insertMany(leaveQuotas);

    //Populate leaveQuota field in the user collection
    const updatePromises = users.map((user) => {
      user.leaveQuota = leaveQuotas;
      return user.save();
    });
    await Promise.all(updatePromises);
    return res.status(200).json({ message: "Leave Quotas added" });
  }

  //Update existing leave quotas
  const updatePromises = leaveQuotas.map(async (leaveQuota) => {
    const existingLeaveQuota = existingLeaveQuotas.find(
      (lq) => lq.leaveType === leaveQuota.leaveType
    );
    if (existingLeaveQuota) {
      existingLeaveQuota.leaveCount = leaveQuota.leaveCount;
      await existingLeaveQuota.save();
    } else {
      await LeaveQuota.create(leaveQuota);
    }
  });
  await Promise.all(updatePromises);

  //Populate updated quotas in user collection
  const updateLeaveQuota = users.map((user) => {
    user.leaveQuota = leaveQuotas;
    return user.save();
  });
  await Promise.all(updateLeaveQuota);
  return res.status(200).json({ message: "Leave quotas updated" });
});

export { getQuotas, updateQuotas };
