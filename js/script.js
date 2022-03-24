const fetchBio = async () => {
    const bio = document.getElementById("bio");

    const response = await fetch("https://api.github.com/users/battlesquid", {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    });

    if (response.ok) {
        const data = await response.json();
        bio.textContent = data.bio;
    } else {
        bio.textContent = "student studying software engineering";
    }
}

fetchBio()
