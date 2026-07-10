const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeBtn.innerHTML = theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode";
}

themeBtn.onclick = () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
};

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
});
