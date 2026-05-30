const CACHE_VERSION = "mobile-1";

const buddyGroups = document.querySelector("#buddy-groups");
const windowLayer = document.querySelector("#window-layer");

let siteData;
let topZ = 20;
const openWindows = new Map();
const mobileMediaQuery = window.matchMedia("(max-width: 700px)");

function isMobileLayout() {
    return mobileMediaQuery.matches;
}

function setMobileReadingMode(isReading) {
    document.querySelector(".desktop").classList.toggle("mobile-reading", isReading);
}

function statusClass(status) {
    return `buddy-icon buddy-icon--${status || "online"}`;
}

function renderBuddyList(data) {
    buddyGroups.innerHTML = "";

    data.groups.forEach((group) => {
        const groupElement = document.createElement("section");
        groupElement.className = "buddy-group";

        const title = document.createElement("h2");
        title.className = "buddy-group__title";
        title.innerHTML = `<span class="twisty">▾</span> ${group.name} <span class="buddy-count">(${group.items.length}/${group.items.length})</span>`;
        groupElement.append(title);

        const list = document.createElement("ul");
        list.className = "buddy-group__list";

        group.items.forEach((item) => {
            const row = document.createElement("li");
            const buddyElement = item.kind === "link" ? document.createElement("a") : document.createElement("button");
            buddyElement.className = "buddy";
            buddyElement.dataset.writingId = item.id;
            buddyElement.innerHTML = `<span class="${statusClass(item.status)}"></span><span class="buddy__name">${item.title}</span>`;

            if (item.kind === "link") {
                buddyElement.href = item.url;
                buddyElement.target = item.url.startsWith("mailto:") ? "_self" : "_blank";
                buddyElement.rel = "noopener noreferrer";
                buddyElement.setAttribute("aria-label", `${item.title} contact link`);
            } else {
                buddyElement.type = "button";
                buddyElement.addEventListener("click", () => openWriting(item));
            }

            row.append(buddyElement);
            list.append(row);
        });

        groupElement.append(list);
        buddyGroups.append(groupElement);
    });
}

function focusWindow(id) {
    document.querySelectorAll(".chat-window").forEach((windowElement) => {
        windowElement.classList.remove("is-active");
    });

    const windowElement = openWindows.get(id);
    if (!windowElement) return;

    topZ += 1;
    windowElement.style.setProperty("--window-z", topZ);
    windowElement.classList.add("is-active");
}

function closeWindow(id) {
    const windowElement = openWindows.get(id);
    if (!windowElement) return;

    windowElement.remove();
    openWindows.delete(id);

    if (isMobileLayout()) {
        setMobileReadingMode(false);
    }
}

function closeAllWindows() {
    openWindows.forEach((windowElement) => windowElement.remove());
    openWindows.clear();
}

function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function textToParagraphs(text) {
    return text
        .trim()
        .split(/\n{2,}/)
        .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
        .join("");
}

async function loadText(file) {
    const response = await fetch(`${file}?v=${CACHE_VERSION}`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Could not load ${file}`);
    }
    return response.text();
}

async function openWriting(item) {
    if (isMobileLayout()) {
        closeAllWindows();
    } else if (openWindows.has(item.id)) {
        focusWindow(item.id);
        return;
    }

    const sourceLink = item.sourceUrl
        ? `<a class="source-link" href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer">original post</a>`
        : "";
    const windowNumber = openWindows.size;
    const windowElement = document.createElement("article");
    windowElement.className = "window chat-window";
    windowElement.style.setProperty("--window-top", `${84 + windowNumber * 28}px`);
    windowElement.style.setProperty("--window-left", `${310 + windowNumber * 34}px`);
    windowElement.setAttribute("aria-labelledby", `${item.id}-title`);

    windowElement.innerHTML = `
        <header class="title-bar">
            <button class="mobile-back-button" type="button" aria-label="Back to Buddy List">Back</button>
            <div class="title-bar__label">
                <img class="runner-icon" src="assets/runner-glyph.svg" alt="">
                <span id="${item.id}-title">${item.title}</span>
            </div>
            <div class="window-controls">
                <span class="window-button" aria-hidden="true">_</span>
                <span class="window-button" aria-hidden="true">□</span>
                <button class="window-button" type="button" aria-label="Close ${item.title}">x</button>
            </div>
        </header>

        <nav class="menu-bar" aria-label="${item.title} menus">
            <span>File</span>
            <span>Edit</span>
            <span>Insert</span>
            <span>People</span>
        </nav>

        <div class="chat-tool-row" aria-hidden="true">
            <button type="button">Warn</button>
            <button type="button">Block</button>
            <button type="button">Add Buddy</button>
            <button type="button">Get Info</button>
        </div>

        <div class="chat-window__body">
            <div class="transcript">
                <p class="message-meta">${siteData.author}&nbsp;&nbsp;<span>${item.timestamp}</span>${sourceLink}</p>
                <div class="message-text"><p>Loading message...</p></div>
            </div>
        </div>

        <div class="format-row" aria-hidden="true">
            <button type="button">A</button>
            <button type="button">B</button>
            <button type="button">I</button>
            <button type="button">:-)</button>
            <span class="format-row__hint">Read-only writing window</span>
        </div>

        <footer class="chat-input-preview" aria-hidden="true">
            <div class="fake-input">This site is read-only: the writing is the message.</div>
            <button type="button" disabled>Send</button>
        </footer>
    `;

    windowElement.addEventListener("pointerdown", () => focusWindow(item.id));
    windowElement.querySelector("button[aria-label^='Close']").addEventListener("click", () => closeWindow(item.id));
    windowElement.querySelector(".mobile-back-button").addEventListener("click", () => closeWindow(item.id));

    windowLayer.append(windowElement);
    openWindows.set(item.id, windowElement);
    focusWindow(item.id);

    if (isMobileLayout()) {
        setMobileReadingMode(true);
    }

    try {
        const text = await loadText(item.file);
        windowElement.querySelector(".message-text").innerHTML = textToParagraphs(text);
    } catch (error) {
        windowElement.querySelector(".message-text").innerHTML = `<p class="error-note">${error.message}</p>`;
    }
}

async function initializeSite() {
    try {
        const response = await fetch(`data/writings.json?v=${CACHE_VERSION}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Could not load writing list.");
        }

        siteData = await response.json();
        renderBuddyList(siteData);
        const firstWriting = siteData.groups[0]?.items[0];
        if (firstWriting && !isMobileLayout()) {
            openWriting(firstWriting);
        }
    } catch (error) {
        buddyGroups.innerHTML = `<p class="error-note">${error.message}</p>`;
    }
}

initializeSite();


mobileMediaQuery.addEventListener("change", () => {
    if (!isMobileLayout()) {
        setMobileReadingMode(false);
        return;
    }

    if (openWindows.size > 1) {
        const newestWindow = Array.from(openWindows.entries()).at(-1);
        closeAllWindows();
        if (newestWindow) {
            openWindows.set(newestWindow[0], newestWindow[1]);
            windowLayer.append(newestWindow[1]);
        }
    }

    setMobileReadingMode(openWindows.size > 0);
});
