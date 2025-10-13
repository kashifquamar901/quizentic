document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginBtn = document.getElementById("loginBtn");

      loginBtn.style.cursor = "wait";
    loginBtn.innerText = "Loging...";

  try {
    const res = await axios.post(
      `${BASE_URL_USER}/login`,
      { email, password },
      { withCredentials: true }
    );


    if (res.data.statusCode === 200) {
      localStorage.setItem("user", res.data);
      window.location.href = "../../index.html";
    }
  } catch (error) {
    console.log(error);
  }
});
