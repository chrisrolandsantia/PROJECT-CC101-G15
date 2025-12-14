document.addEventListener("DOMContentLoaded", () => {

    /* search bar */
    const searchBar = document.getElementById("searchBar");
    const games = document.querySelectorAll(".game-card");

    if (searchBar) {
        searchBar.addEventListener("keyup", () => {
            const searchText = searchBar.value.toLowerCase();

            games.forEach(game => {
                const title = game.querySelector(".game-title")
                                  .textContent.toLowerCase();

                game.style.display =
                    title.includes(searchText) ? "flex" : "none";
            });
        });
    }

    /* image click pop up*/
    const clickimage = document.getElementById("clickimage");
    const screenshots = document.querySelectorAll(".screenshot-item");

    screenshots.forEach(img => {
        img.addEventListener("click", () => {
            if (!clickimage) return;
            clickimage.innerHTML = `<img src="${img.src}">`;
            clickimage.style.display = "flex";
        });
    });

    if (clickimage) {
        clickimage.addEventListener("click", () => {
            clickimage.style.display = "none";
            clickimage.innerHTML = "";
        });
    }

    /* login popup */
    const loginPopup = document.getElementById("loginPopup");
    const loginBtn = document.querySelector(".login-btn");
    const closeLogin = document.getElementById("closeLogin");

    if (localStorage.getItem("loggedIn") !== "true") {
        loginPopup.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");

    loginBtn?.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "admin" && password === "1234") {
        localStorage.setItem("loggedIn", "true");
        loginPopup.classList.remove("active");
        document.body.style.overflow = "auto";
        loginError.style.display = "none";
    } else {
        loginError.style.display = "block";
    }
});

    closeLogin?.addEventListener("click", () => {
        loginPopup.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    /* profile popup */
    const profileBtn = document.getElementById("profileBtn");
    const profilePopup = document.getElementById("profilePopup");
    const closeProfile = document.getElementById("closeProfile");

    const profileName = document.getElementById("profileName");
    const profilePreview = document.getElementById("profilePreview");
    const nameInput = document.getElementById("nameInput");
    const avatarInput = document.getElementById("avatarInput");
    const saveProfile = document.getElementById("saveProfile");
    const logoutBtn = document.getElementById("logoutBtn");

    /* ----- Load saved profile ----- */
    const savedName = localStorage.getItem("username");
    const savedAvatar = localStorage.getItem("avatar");

    if (savedName) profileName.textContent = savedName;
    if (savedAvatar) {
        profilePreview.src = savedAvatar;
        profileBtn.src = savedAvatar;
    }

    /* ----- Open profile ----- */
    profileBtn?.addEventListener("click", () => {
        if (localStorage.getItem("loggedIn") === "true") {
            profilePopup.classList.add("active");
        }
    });

    /* ----- Close profile ----- */
    closeProfile?.addEventListener("click", () => {
        profilePopup.classList.remove("active");
    });

    /* ----- Save name ----- */
    saveProfile?.addEventListener("click", () => {
        if (nameInput.value.trim() !== "") {
            localStorage.setItem("username", nameInput.value);
            profileName.textContent = nameInput.value;
        }
        profilePopup.classList.remove("active");
    });

    /* ----- Change avatar ----- */
    avatarInput?.addEventListener("change", () => {
        const file = avatarInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem("avatar", reader.result);
            profilePreview.src = reader.result;
            profileBtn.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    /* ----- Logout ----- */
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        profilePopup.classList.remove("active");
        loginPopup.classList.add("active");
        document.body.style.overflow = "hidden";
    });

});
