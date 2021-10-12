require("../config/db.connection");

module.exports = {
  // Our original product model
  Product: require("./Product"),
  // our new review model
  Review: require("./Review"),
  // Our final user model
  User: require('./User'),
};