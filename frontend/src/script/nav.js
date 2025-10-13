const user = localStorage.getItem("user")
const dropdown = document.getElementById("dropdown")
const login = document.getElementById("login")

if (user) {
    dropdown.style.display = "block"
    login.style.display = "none"
    
    document.getElementById("logoutBtn").addEventListener("click",async() => {
        localStorage.clear()
        await axios.post(`${BASE_URL_USER}/logout`, { withCredentials: true })
        setTimeout(() => {
            location.reload()
        },1000)

    })

}