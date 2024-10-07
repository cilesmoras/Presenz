export function authSession() {
  return JSON.parse(localStorage.getItem("auth"));
}
