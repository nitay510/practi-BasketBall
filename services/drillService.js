const Drill = require('../models/drill');
const Users = require('../models/user');

/**
 * Adds a new drill entry to the database.
 * @param {string} drillId - Unique identifier for the drill.
 * @param {string} user - Username of the user performing the drill.
 * @param {string} missionName - Name of the mission associated with the drill.
 * @param {number} tries - Number of attempts for the drill.
 * @param {number} successes - Number of successful attempts for the drill.
 * @param {string} drillName - Name of the drill.
 * @param {string} topic - Topic of the drill.
 * @param {boolean} isSingle - Indicates whether the drill is a single-player or double-player drill.
 * @param {string} opponentName - Username of the opponent in case of a double-player drill.
 * @param {number} opponentScore - Opponent's score in case of a double-player drill.
 * @param {number} target - Target score for the drill.
 * @returns {Promise<Drill>} - Returns the created Drill object.
 */
exports.addDrill = async (drillId, user, missionName, tries, successes, drillName, topic, isSingle, opponentName, opponentScore, target) => {
  try {
    const userToFind = await Users.findOne({ username: user });

    if (!userToFind) {
      return null; // User not found
    }

    let count = await Drill.countDocuments({ drillId: drillId });
    const currentDate = new Date();

    const drill = new Drill({
      drillNumber: count,
      drillId: drillId,
      date: currentDate,
      missionName: missionName,
      tries: isSingle ? tries : undefined,
      successes: successes,
      user: userToFind.username,
      drillName: drillName,
      topic: topic,
      isSingle: isSingle,
      opponentName: isSingle ? undefined : opponentName,
      opponentScore: isSingle ? undefined : opponentScore,
      target: isSingle ? target : undefined,
    });

    await drill.save();
    return drill;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the last drill for a specific user.
 * @param {string} username - Username of the user.
 * @returns {Promise<Drill|null>} - Returns the last drill or null if no drills found.
 */
exports.getUserLastDrill = async (username) => {
  try {
    const drills = await Drill.find({ user: username }).sort({ date: -1 }).limit(1);

    if (drills.length === 0) {
      return null; // No drills found for the user
    }

    return drills[0];
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all single-player drills for a specific user.
 * @param {string} currentUser - Username of the user.
 * @returns {Promise<Drill[]>} - Returns an array of single-player drills.
 */
exports.getAllDrillsSingle = async (currentUser,category) => {
  try {
    const DrillsForUser = await Drill.find({ user: currentUser, isSingle: true,topic:category }).sort({ date: -1 });
    return DrillsForUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets all double-player drills for a specific user.
 * @param {string} currentUser - Username of the user.
 * @returns {Promise<Drill[]>} - Returns an array of double-player drills.
 */
exports.getAllDrillsDouble = async (currentUser) => {
  try {
    const DrillsForUser = await Drill.find({ user: currentUser, isSingle: false }).sort({ date: -1 });
    return DrillsForUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets the highest score for a specific user in a given mission and drill.
 * @param {string} currentUser - Username of the user.
 * @param {string} missionName - Name of the mission.
 * @param {string} drillName - Name of the drill.
 * @returns {Promise<number>} - Returns the highest score.
 */
exports.getHighScore = async (currentUser, missionName, drillName) => {
  const DrillsForUser = await Drill.find({ user: currentUser, missionName: missionName, drillName: drillName, isSingle: true }).sort({ successes: -1 });

  if (DrillsForUser.length > 0) {
    return DrillsForUser[0].successes;
  } else {
    return 0;
  }
};

/**
 * Gets the total number of unique drills for a specific user with a mission name containing "מסכם".
 * @param {string} currentUser - Username of the user.
 * @returns {Promise<number>} - Returns the total number of unique drills.
 */
exports.getHowManyDrills = async (currentUser) => {
  const uniqueDrillNames = await Drill.distinct('drillName', { user: currentUser,isSingle:true });
  const totalUniqueDrills = uniqueDrillNames.length;
  return totalUniqueDrills;
};

/**
 * Gets the number of wins against a specific opponent in double-player drills.
 * @param {string} currentUser - Username of the user.
 * @param {string} opponentName - Username of the opponent.
 * @returns {Promise<number>} - Returns the number of wins.
 */
exports.getWinLose = async (currentUser, opponentName) => {
  const DrillsForUser = await Drill.find({ user: currentUser, opponentName: opponentName, isSingle: false });

  if (DrillsForUser.length > 0) {
    let winCount = 0;

    for (const drill of DrillsForUser) {
      if (drill.successes > drill.opponentScore) {
        winCount++;
      }
    }

    return winCount;
  } else {
    return 0;
  }
};
