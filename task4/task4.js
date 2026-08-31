const searchInput = document.getElementById('searchInput');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultContainer = document.getElementById('resultContainer');

const avatarEl = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const bioEl = document.getElementById('bio');
const reposEl = document.getElementById('repos');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');
const profileLinkEl = document.getElementById('profileLink');


function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

async function fetchGitHubUser(username) {
    const trimmedUser = username.trim();
    if (!trimmedUser) {
        hideAll();
        return;
    }

    showLoading();

    try {
        const response = await fetch(`https://api.github.com/users/${trimmedUser}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('İstifadəçi tapılmadı. Zəhmət olmasa düzgün ad daxil edin.');
            } else {
                throw new Error('Məlumatı çəkən zaman xəta baş verdi.');
            }
        }

        const data = await response.json();
        displayUserData(data);
    } catch (error) {
        showError(error.message);
    }
}


function displayUserData(user) {
    hideAll();
    resultContainer.classList.remove('hidden');

    avatarEl.src = user.avatar_url;
    nameEl.textContent = user.name || user.login;
    usernameEl.textContent = `@${user.login}`;
    bioEl.textContent = user.bio || 'Məlumat yoxdur';
    reposEl.textContent = user.public_repos;
    followersEl.textContent = user.followers;
    followingEl.textContent = user.following;
    profileLinkEl.href = user.html_url;
}

function showLoading() {
    resultContainer.classList.add('hidden');
    errorEl.classList.add('hidden');
    loadingEl.classList.remove('hidden');
}

function showError(message) {
    loadingEl.classList.add('hidden');
    resultContainer.classList.add('hidden');
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

function hideAll() {
    loadingEl.classList.add('hidden');
    errorEl.classList.add('hidden');
    resultContainer.classList.add('hidden');
}


const handleSearch = debounce((e) => {
    fetchGitHubUser(e.target.value);
}, 500);

searchInput.addEventListener('input', handleSearch);