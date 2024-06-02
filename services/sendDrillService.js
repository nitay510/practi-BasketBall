
const SendDrill = require('../models/sendDrill');
const Users = require('../models/user');

exports.addDrill = async (drillId, user,coach, drillName, topic) => {
    try {
      const userToFind = await Users.findOne({ username: user });
      const coachToFind = await Users.findOne({ username: coach });
      if (!userToFind || !coachToFind) {
        return null; // User not found
      }
  
      const currentDate = new Date();
  
      const drill = new SendDrill({
        drillId: drillId,
        date: currentDate,
        userPlayer: userToFind.username,
        userCoach: coachToFind.username,
        drillName: drillName,
        topic: topic,
      });
  
      await drill.save();
      return drill;
    } catch (error) {
      throw error;
    }
  };

  // New deleteDrill function
exports.deleteDrill = async (drillId) => {
    try {
      const result = await SendDrill.deleteOne({ drillId });
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  };
  
  // New getDrillsByUser function
  exports.getDrillsByUser = async (username) => {
    try {
      const drills = await SendDrill.find({ userPlayer: username });
      return drills;
    } catch (error) {
      throw error;
    }
  };
  
  // New getDrillsByCoach function
  exports.getDrillsByCoach = async (username) => {
    try {
      const drills = await SendDrill.find({ userCoach: username });
      return drills;
    } catch (error) {
      throw error;
    }
  };