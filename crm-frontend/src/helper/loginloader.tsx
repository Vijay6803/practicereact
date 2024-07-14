async function setUser() {
  localStorage.setItem("user", JSON.stringify({ name: "vijay" }));
}
export default setUser;
