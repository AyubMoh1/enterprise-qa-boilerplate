// Dashboard page functionality

document.addEventListener('DOMContentLoaded', async () => {
    if (!requireAuth()) {
        return;
    }

    const userEmailNav = document.getElementById('user-email');
    const dashboardEmail = document.getElementById('dashboard-email');
    const logoutBtn = document.getElementById('logout-btn');

    const email = getUserEmail();
    if (email) {
        userEmailNav.textContent = email;
        dashboardEmail.textContent = email;
    }

    logoutBtn.addEventListener('click', () => {
        logout();
    });

    try {
        const response = await apiRequest('/api/users');

        if (response && response.ok) {
            const data = await response.json();
            console.log('Users data loaded:', data);
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
});