
let currentPage = 1;

const totalPages = 7;
const pages = document.querySelectorAll(".page");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");


// NAVIGASI HALAMAN

function nextPage(page) {
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    updatePage();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

function updatePage() {
    pages.forEach((page, index) => {
        const isActive = index + 1 === currentPage;

        page.classList.toggle("active", isActive);

        if (isActive) {
            page.scrollTop = 0;
        }
    });

    pageIndicator.textContent =
        currentPage + " / " + totalPages;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    if (currentPage === 3) {
        startTyping();
    }
}


// SURAT ANIMASI MENGETIK

const letter = `Selamat ulang tahun yang ke-19, Bebe! ❤️

Semoga hari spesial ini membawa banyak kebahagiaan untukmu.

Terima kasih sudah menjadi bagian dari cerita yang indah.

Semoga semua impianmu tercapai, selalu diberikan kesehatan, dan setiap langkahmu dipenuhi hal-hal baik.

Jangan pernah berhenti tersenyum dan teruslah menjadi dirimu sendiri.

Once again, Happy Birthday, Bebe! 💙`;

let typingStarted = false;

function startTyping() {
    if (typingStarted) return;

    typingStarted = true;

    const element = document.getElementById("typingText");
    let index = 0;

    function type() {
        if (index < letter.length) {
            if (letter[index] === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.appendChild(
                    document.createTextNode(letter[index])
                );
            }

            index++;

            setTimeout(type, 35);
        }
    }

    type();
}


// KEJUTAN TERAKHIR

function showSurprise() {
    const box = document.getElementById("surpriseBox");

    box.classList.toggle("show");

    if (box.classList.contains("show")) {
        createConfetti();
    }
}


// ANIMASI CONFETTI

function createConfetti() {
    const colors = [
        "#ffffff",
        "#9bd5ff",
        "#4da8ff",
        "#d6edff"
    ];

    for (let i = 0; i < 70; i++) {
        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.width = "8px";
        confetti.style.height = "12px";
        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.zIndex = "999";
        confetti.style.borderRadius = "3px";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const animation = confetti.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: 2000 + Math.random() * 2000,
                easing: "ease-out"
            }
        );

        animation.onfinish = () => confetti.remove();
    }
}


// ANIMASI HATI MELAYANG

const particleContainer =
    document.getElementById("particles");

function createParticles() {
    const symbols = ["♡", "♥", "💙", "✦", "✧"];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + "%";

        particle.style.fontSize =
            12 + Math.random() * 20 + "px";

        particle.style.animationDuration =
            7 + Math.random() * 10 + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particleContainer.appendChild(particle);
    }
}

createParticles();


// MUSIK

// MUSIK OTOMATIS

const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

// Mencoba memutar musik otomatis
async function playMusic() {
    try {
        await music.play();

        musicPlaying = true;
        musicBtn.textContent = "♫ Musik ON";
    } catch (error) {
        musicPlaying = false;
        musicBtn.textContent = "♫ Putar Musik";
    }
}

// Coba otomatis saat website dibuka
window.addEventListener("load", () => {
    playMusic();
});

// Tombol untuk play dan pause
musicBtn.addEventListener("click", async () => {
    try {
        if (!musicPlaying) {
            await music.play();

            musicPlaying = true;
            musicBtn.textContent = "♫ Musik ON";
        } else {
            music.pause();

            musicPlaying = false;
            musicBtn.textContent = "♫ Putar Musik";
        }
    } catch (error) {
        console.log("Musik gagal diputar:", error);
    }
});

// KONDISI AWAL

updatePage();
