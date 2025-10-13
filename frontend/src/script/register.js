document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    const registerBTN = document.getElementById("registerBTN");

    registerBTN.style.cursor = "wait";
    registerBTN.innerText = "Registering...";

    try {
      const res = await axios.post(
        `${BASE_URL_USER}/register`,
        { name, email, role, password },
        { withCredentials: true }
      );

      if (res.data.statusCode === 201) {
        message.innerText = res.data.message;
        message.classList.add("text-success");

        setInterval(() => {
          window.location.href = "../html/login.html";
        }, 1000);
      }
    } catch (error) {
      message.innerText =
        error.response?.data?.message || "Failed to register user";
      message.classList.add("text-danger");
      console.log(error);
    }
  });
