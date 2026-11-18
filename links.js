window.SITE_LINKS = {
    // Внутренние разделы сайта
    home: "https://gtm-company.github.io/",
    gall: "https://gtm-company.github.io/Gall",
    coall: "https://gtm-company.github.io/Coall",
    coall_net: "https://gtm-company.github.io/Coall/net",

    // Ссылки для раздела Gold_Naget (/Gall)
    youtube: "https://www.youtube.com/@Gold_naget",
    twitch: "https://gtm-company.github.io/no-link/",      // Вставь ссылку на Twitch, когда понадобится
    telegram: "https://gtm-company.github.io/no-link/",    // Вставь ссылку на Telegram, когда включишь
    soon: "https://gtm-company.github.io/no-link/",        // Ссылка для кнопки "СКОРО"
    donate: "https://gtm-company.github.io/no-link/",      // Вставь ссылку на DonationAlerts

    // Ссылка подписки для копирования на странице /Coall/net
    vpn_sub: "https://raw.githubusercontent.com/GTm-company/GTm-company.github.io/refs/heads/main/mi-vpn-sub.txt"
};

function showToast(message) {
    let toast = document.getElementById("site-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "site-toast";
        toast.className = "site-toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function fallbackCopyText(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.top = "-9999px";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.focus();
    area.select();
    try {
        document.execCommand("copy");
    } catch (e) {
        console.error("Ошибка копирования:", e);
    }
    document.body.removeChild(area);
}

document.addEventListener("DOMContentLoaded", () => {
    const links = window.SITE_LINKS || {};

    // Автоматическая подстановка ссылок во все кнопки и иконки
    document.querySelectorAll("[data-link-key]").forEach((el) => {
        const key = el.getAttribute("data-link-key");
        const url = links[key] || "";

        if (el.tagName === "A") {
            if (url) {
                el.setAttribute("href", url);
                if (url.startsWith("http") && !url.startsWith("https://gtm-company.github.io")) {
                    el.setAttribute("target", "_blank");
                    el.setAttribute("rel", "noopener noreferrer");
                }
            } else {
                el.setAttribute("href", "#");
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    showToast("Скоро будет доступно!");
                });
            }
        }
    });

    // Логика кнопки копирования VPN-ссылки на странице /Coall/net
    const copyBtn = document.getElementById("copyVpnBtn");
    if (copyBtn) {
        const titleEl = document.getElementById("copyBtnTitle");
        const subEl = document.getElementById("copyBtnSub");
        const iconEl = document.getElementById("copyBtnIcon");

        const defaultTitle = "Нажми чтобы скопировать";
        const defaultSub = "Ссылка ускорителя интернета";
        const defaultIcon = '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>';
        const checkIcon = '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>';
        let resetTimer = null;

        copyBtn.addEventListener("click", async () => {
            const targetKey = copyBtn.getAttribute("data-copy-key") || "vpn_sub";
            const textToCopy = links[targetKey] || "";

            if (!textToCopy) {
                showToast("Ссылка не указана в links.js");
                return;
            }

            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(textToCopy);
                } catch (err) {
                    fallbackCopyText(textToCopy);
                }
            } else {
                fallbackCopyText(textToCopy);
            }

            if (titleEl) titleEl.textContent = "Скопировано!";
            if (subEl) subEl.textContent = "Вставь ссылку в клиент";
            if (iconEl) iconEl.innerHTML = checkIcon;
            copyBtn.classList.add("is-copied");

            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                if (titleEl) titleEl.textContent = defaultTitle;
                if (subEl) subEl.textContent = defaultSub;
                if (iconEl) iconEl.innerHTML = defaultIcon;
                copyBtn.classList.remove("is-copied");
            }, 2200);
        });
    }
});
              
