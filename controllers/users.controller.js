const { UserSchema } = require("../schema/user.schema");
const { readJsonDB, writeJsonDB } = require("../util");
const { v4: uuid } = require("uuid");

// Hent ut alle ansatte fra DB (JSON)
function getUsers() {
  const users = readJsonDB("users");

  return users;
}

function getUserById(id) {
  const users = readJsonDB("users");
  const index = users.map((e) => e.id).indexOf(id);

  if (index === -1) {
    throw new Error(`User with id ${id} doesn't exist!`, { cause: 404 });
  }

  return users[index];
}

async function createUser(userData) {
  delete userData.id;

  const validUserData = UserSchema.parseAsync(userData).catch(error => ({success: false, error}));

  if (validUserData.success === false) {
    return validUserData;
  }
  const users = readJsonDB("users");

  // userData.id = uuid();
  users.push(validUserData);

  writeJsonDB("users", JSON.stringify(users));

  return { success: true, _created: validUserData };
}

function updateUser() {
  const users = readJsonDB("users");
  const index = users.map((e) => e.id).indexOf(id);

  if (index === -1) {
    throw new Error(`User with id ${id} doesn't exist!`, { cause: 404 });
  }

  // ... Inndatavalidering ...

  delete updatedUserData.id;

  const _old = { ...users[index] };
  const user = { ...users[index], ...updatedUserData };
  users[index] = user;

  writeJsonDB("users", JSON.stringify(users));

  return { success: true, _updated: user, _old };
}

function deleteUser(id) {
  const users = readJsonDB("users");
  const index = users.map((e) => e.id).indexOf(id);

  if (index === -1) {
    // Eksisterer ikke, send 404
    throw new Error(`User with id ${id} doesn't exist!`, { cause: 404 });
  }

  users.splice(index, 1);

  writeJsonDB("users", JSON.stringify(users));

  return { success: true, status: 204, _deletedId: id };
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
