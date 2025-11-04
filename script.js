// Theme toggle
const toggleBtn = document.querySelector('.theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.setAttribute('data-theme', document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

// Sidebar navigation
const links = document.querySelectorAll('.sidebar a');
const sectionTitle = document.getElementById('section-title');
const sectionContent = document.getElementById('section-content');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const section = link.dataset.section;
        sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        loadSection(section);
    });
});

// Profile dropdown
const profileMenu = document.querySelector('.profile-menu');
const dropdown = document.querySelector('.dropdown');

profileMenu.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
});
document.addEventListener('click', () => {
    dropdown.classList.remove('show');
});

// Load section
function loadSection(section) {
    if (section === 'dashboard') {
        sectionContent.innerHTML = `
            <div class="cards">
                <div class="card"><h3>Total Users</h3><p>1,245</p></div>
                <div class="card"><h3>Active Sessions</h3><p>349</p></div>
                <div class="card"><h3>Revenue</h3><p>$12,450</p></div>
                <div class="card"><h3>Tasks Pending</h3><p>24</p></div>
            </div>
            <div class="chart-container"><canvas id="myChart"></canvas></div>
        `;
        loadChart();
    } else if (section === 'users') {
        sectionContent.innerHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>101</td>
                        <td><i class="user-icon">👤</i> Aqsa Nazir</td>
                        <td>aqsanazir7711@gmail.com</td>
                        <td>Active</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(this)">Edit</button>
                            <button class="delete-btn" onclick="deleteUser(this)">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>102</td>
                        <td><i class="user-icon">👤</i> Nimra Nazir</td>
                        <td>aroraflip@gmail.com</td>
                        <td>Inactive</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(this)">Edit</button>
                            <button class="delete-btn" onclick="deleteUser(this)">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>103</td>
                        <td><i class="user-icon">👤</i> Tanzila Nazir</td>
                        <td>fragmentsofquiet@gmail.com</td>
                        <td>Active</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(this)">Edit</button>
                            <button class="delete-btn" onclick="deleteUser(this)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    } else if (section === 'reports') {
        sectionContent.innerHTML = `
            <div class="cards">
                <div class="card"><h3>Monthly Sales</h3><p>$45,000</p></div>
                <div class="card"><h3>New Customers</h3><p>120</p></div>
            </div>
            <div class="chart-container"><canvas id="myChart"></canvas></div>
        `;
        loadChart([5000, 12000, 9000, 14000, 17000, 20000], ['Jan','Feb','Mar','Apr','May','Jun']);
    } else if (section === 'settings') {
        sectionContent.innerHTML = `
            <div class="cards">
                <div class="card"><h3>🔔 Notifications</h3><p>Manage notification preferences</p></div>
                <div class="card"><h3>🖌️ Appearance</h3><p>Toggle dark/light mode</p></div>
                <div class="card"><h3>🔒 Privacy</h3><p>Update password & privacy settings</p></div>
                <div class="card"><h3>⚙️ General</h3><p>Configure dashboard options</p></div>
            </div>
        `;
    } else if (section === 'profile') {
        sectionContent.innerHTML = `
            <div class="cards">
                <div class="card"><h3>Name</h3><p>Aqsa Nazir</p></div>
                <div class="card"><h3>Email</h3><p>aqsanazir7711@gmail.com</p></div>
                <div class="card"><h3>Status</h3><p>Active</p></div>
            </div>
        `;
    }
}

// Chart.js
function loadChart(data=[1200,1900,3000,2500,4000,4500], labels=['Jan','Feb','Mar','Apr','May','Jun']){
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx,{
        type:'line',
        data:{labels, datasets:[{label:'Revenue ($)', data, backgroundColor:'rgba(52,152,219,0.2)', borderColor:'rgba(52,152,219,1)', borderWidth:2, tension:0.4, fill:true}]},
        options:{responsive:true, plugins:{legend:{labels:{color:getComputedStyle(document.body).getPropertyValue('--text-color')}}}, scales:{x:{ticks:{color:getComputedStyle(document.body).getPropertyValue('--text-color')}},y:{ticks:{color:getComputedStyle(document.body).getPropertyValue('--text-color')}}}}
    });
}

// Edit/Delete user
function editUser(btn) {
    const row = btn.parentElement.parentElement;
    const nameCell = row.cells[1];
    const emailCell = row.cells[2];
    const statusCell = row.cells[3];
    const newName = prompt("Edit Name:", nameCell.textContent.trim());
    const newEmail = prompt("Edit Email:", emailCell.textContent.trim());
    const newStatus = prompt("Edit Status:", statusCell.textContent.trim());
    if(newName) nameCell.innerHTML = `<i class="user-icon">👤</i> ${newName}`;
    if(newEmail) emailCell.textContent = newEmail;
    if(newStatus) statusCell.textContent = newStatus;
}

// Default load
loadSection('dashboard');

// Dropdown button navigation
document.getElementById('profile-btn').addEventListener('click', e => {
    e.preventDefault();
    sectionTitle.textContent = 'Profile';
    loadSection('profile');
});
document.getElementById('settings-btn').addEventListener('click', e => {
    e.preventDefault();
    sectionTitle.textContent = 'Settings';
    loadSection('settings');
});
document.getElementById('logout-btn').addEventListener('click', e => {
    e.preventDefault();
    alert('Logout clicked! You can redirect to login page.');
});
