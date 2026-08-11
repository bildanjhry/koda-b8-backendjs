var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _cart = require("./cart");
var _cart_items = require("./cart_items");
var _categories = require("./categories");
var _categories_products = require("./categories_products");
var _checkout_address = require("./checkout_address");
var _checkout_histories = require("./checkout_histories");
var _colors = require("./colors");
var _delivery_method = require("./delivery_method");
var _events = require("./events");
var _favorite = require("./favorite");
var _order_items = require("./order_items");
var _order_status = require("./order_status");
var _orders = require("./orders");
var _payment_method = require("./payment_method");
var _products = require("./products");
var _products_events = require("./products_events");
var _products_variants = require("./products_variants");
var _profile = require("./profile");
var _reviews = require("./reviews");
var _sizes = require("./sizes");
var _user_permissions = require("./user_permissions");
var _users = require("./users");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var cart = _cart(sequelize, DataTypes);
  var cart_items = _cart_items(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var categories_products = _categories_products(sequelize, DataTypes);
  var checkout_address = _checkout_address(sequelize, DataTypes);
  var checkout_histories = _checkout_histories(sequelize, DataTypes);
  var colors = _colors(sequelize, DataTypes);
  var delivery_method = _delivery_method(sequelize, DataTypes);
  var events = _events(sequelize, DataTypes);
  var favorite = _favorite(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var order_status = _order_status(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var payment_method = _payment_method(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var products_events = _products_events(sequelize, DataTypes);
  var products_variants = _products_variants(sequelize, DataTypes);
  var profile = _profile(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var sizes = _sizes(sequelize, DataTypes);
  var user_permissions = _user_permissions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  cart_items.belongsTo(cart, { as: "id_cart_cart", foreignKey: "id_cart"});
  cart.hasMany(cart_items, { as: "cart_items", foreignKey: "id_cart"});
  profile.belongsTo(cart, { as: "id_cart_cart", foreignKey: "id_cart"});
  cart.hasMany(profile, { as: "profiles", foreignKey: "id_cart"});
  categories_products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(categories_products, { as: "categories_products", foreignKey: "id_category"});
  checkout_histories.belongsTo(checkout_address, { as: "id_checkout_address_checkout_address", foreignKey: "id_checkout_address"});
  checkout_address.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_checkout_address"});
  products_variants.belongsTo(colors, { as: "id_color_color", foreignKey: "id_color"});
  colors.hasMany(products_variants, { as: "products_variants", foreignKey: "id_color"});
  checkout_histories.belongsTo(delivery_method, { as: "id_delivery_method_delivery_method", foreignKey: "id_delivery_method"});
  delivery_method.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_delivery_method"});
  products_events.belongsTo(events, { as: "id_event_event", foreignKey: "id_event"});
  events.hasMany(products_events, { as: "products_events", foreignKey: "id_event"});
  profile.belongsTo(favorite, { as: "id_favorite_favorite", foreignKey: "id_favorite"});
  favorite.hasMany(profile, { as: "profiles", foreignKey: "id_favorite"});
  checkout_histories.belongsTo(order_status, { as: "id_order_status_order_status", foreignKey: "id_order_status"});
  order_status.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_order_status"});
  checkout_address.belongsTo(orders, { as: "id_order_order", foreignKey: "id_order"});
  orders.hasMany(checkout_address, { as: "checkout_addresses", foreignKey: "id_order"});
  checkout_histories.belongsTo(orders, { as: "id_order_order", foreignKey: "id_order"});
  orders.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_order"});
  order_items.belongsTo(orders, { as: "id_order_order", foreignKey: "id_order"});
  orders.hasMany(order_items, { as: "order_items", foreignKey: "id_order"});
  checkout_histories.belongsTo(payment_method, { as: "id_payment_method_payment_method", foreignKey: "id_payment_method"});
  payment_method.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_payment_method"});
  categories_products.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(categories_products, { as: "categories_products", foreignKey: "id_product"});
  products_events.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(products_events, { as: "products_events", foreignKey: "id_product"});
  products_variants.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(products_variants, { as: "products_variants", foreignKey: "id_product"});
  reviews.belongsTo(products, { as: "id_product_product", foreignKey: "id_product"});
  products.hasMany(reviews, { as: "reviews", foreignKey: "id_product"});
  cart_items.belongsTo(products_variants, { as: "id_product_products_variant", foreignKey: "id_product"});
  products_variants.hasMany(cart_items, { as: "cart_items", foreignKey: "id_product"});
  order_items.belongsTo(products_variants, { as: "id_product_products_variant", foreignKey: "id_product"});
  products_variants.hasMany(order_items, { as: "order_items", foreignKey: "id_product"});
  products_variants.belongsTo(sizes, { as: "id_size_size", foreignKey: "id_size"});
  sizes.hasMany(products_variants, { as: "products_variants", foreignKey: "id_size"});
  address.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(address, { as: "addresses", foreignKey: "id_user"});
  cart.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(cart, { as: "carts", foreignKey: "id_user"});
  checkout_histories.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(checkout_histories, { as: "checkout_histories", foreignKey: "id_user"});
  favorite.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(favorite, { as: "favorites", foreignKey: "id_user"});
  orders.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(orders, { as: "orders", foreignKey: "id_user"});
  profile.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(profile, { as: "profiles", foreignKey: "id_user"});
  reviews.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(reviews, { as: "reviews", foreignKey: "id_user"});
  user_permissions.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(user_permissions, { as: "user_permissions", foreignKey: "id_user"});

  return {
    address,
    cart,
    cart_items,
    categories,
    categories_products,
    checkout_address,
    checkout_histories,
    colors,
    delivery_method,
    events,
    favorite,
    order_items,
    order_status,
    orders,
    payment_method,
    products,
    products_events,
    products_variants,
    profile,
    reviews,
    sizes,
    user_permissions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
