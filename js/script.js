const bioElement = document.getElementById("bio");

const fetchBio = async () => {
    try {
        const response = await fetch("https://api.github.com/users/battlesquid", {
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.bio;
        }
    } catch (_) {
        return "Software Engineer";
    }
}

const scrambleText = (text) => {
    return [...text].map(() => String.fromCharCode(48 + Math.floor(Math.random() * 50))).join("");
}

const load = async () => {
    const interval = setInterval(() => {
        const text = scrambleText("00000000000");
        bioElement.textContent = text;
    }, 100);

    const bio = await fetchBio();
    setTimeout(() => {
        clearInterval(interval);
        bioElement.textContent = bio;
    }, 1000);
}

load();
