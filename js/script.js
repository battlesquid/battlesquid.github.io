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

const scrambleText = (text, len = 0) => {
    const prefix = text.substring(0, len);
    const rest = text.substring(len, text.length);
    const scrambled = [...rest].map(() => String.fromCharCode(48 + Math.floor(Math.random() * 50))).join("");
    return `${prefix}${scrambled}`;
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const load = async () => {
    const loadInterval = setInterval(() => {
        bioElement.textContent = scrambleText("00000000000");
    }, 100);

    const bio = await fetchBio();
    clearInterval(loadInterval);
    for (let i = 1; i < bio.length + 1; i++) {
        bioElement.textContent = scrambleText(bio, i);
        await sleep(75);
    }
}

load();
