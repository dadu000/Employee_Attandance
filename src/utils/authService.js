// PURE FRONTEND MOCK AUTH SERVICE (LocalStorage)

export function registerUser(data) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // check if email exists
  if (users.some((u) => u.email === data.email)) {
    throw new Error("Email already exists");
  }

  const newUser = {
    ...data,
    id: Date.now(),
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return newUser;
}

export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // save active user session
  localStorage.setItem("activeUser", JSON.stringify(user));
  return user;
}

export function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser") || "null");
}

export function logoutUser() {
  localStorage.removeItem("activeUser");
}
