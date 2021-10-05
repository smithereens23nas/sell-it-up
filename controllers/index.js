require("../config/db.connection");

module.exports = {
    product: require("./product_controllers"),
    review: require("./review_controllers"),
};