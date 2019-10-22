const S = requiere("sequelize");
const db = require("./index");

class User extends S.Model {}
User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: S.STRING,
      allowNull: false,
      set() {
        this.setDataValue("password").this.getDataValue("salt");
      }
    },
    salt: {
      type: S.STRING,
      set() {
        return crypto.randomBytes(20).toString("hex");
      }
    }
  },
  { sequelize: db, modelName: "user" }
);

User.prototype.validate = password => {
  crypto
    .createHmac("sha1", this.salt)
    .update(password)
    .digest("hex") === this.password;
};

module.exports = { User };
