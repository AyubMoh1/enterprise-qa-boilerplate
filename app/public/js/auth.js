
const AUTH_TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

function setToken(token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

function removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
}

function setUserEmail(email) {
    localStorage.setItem(USER_EMAIL_KEY, email);
}

function getUserEmail() {
    return localStorage.getItem(USER_EMAIL_KEY);
}

function isAuthenticated() {
    return !!getToken();
}

function logout() {
    removeToken();
    window.location.href = '/login.html';
}

function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

async function apiRequest(url, options = {}) {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        removeToken();
        window.location.href = '/login.html';
        return null;
    }

    return response;
}