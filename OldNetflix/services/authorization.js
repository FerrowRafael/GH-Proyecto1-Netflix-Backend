const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Signature = require('./signature')

const secret = process.env.JWT_SECRET || Signature;
console.log(Signature);
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function createJWT(data) {
  return jwt.sign(data, secret, {
    expiresIn: '48h',
  });
}

async function decodeJWT(token) {
  return jwt.verify(token, secret);

}

module.exports = {
  hashPassword,
  comparePassword,
  createJWT,
  decodeJWT,
};