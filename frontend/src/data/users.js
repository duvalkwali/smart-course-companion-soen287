export const users = [];

export function addUser(user) {
  users.push(user);
}

export function getLatestUser() {
  if (users.length === 0) return null;
  return users[users.length - 1];
}