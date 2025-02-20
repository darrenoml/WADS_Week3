// Menu data structure
const menuItems = [
    {
        title: 'About',
        submenu: ['School Profile', 'Vision & Mission', 'Facilities', 'Staff Directory']
    },
    {
        title: 'Academics',
        submenu: ['Curriculum', 'Programs', 'Calendar', 'Student Life']
    },
    {
        title: 'Admissions',
        submenu: ['Process', 'Requirements', 'Tuition', 'Scholarships']
    },
    {
        title: 'News & Events',
        submenu: ['School News', 'Upcoming Events', 'Gallery', 'Newsletter']
    }
];

// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const desktopMenu = document.getElementById('desktop-menu');

// State
let activeDropdown = null;
let isMobileMenuOpen = false;

// Create desktop menu
function createDesktopMenu() {
    menuItems.forEach((item, index) => {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'relative group';

        const button = document.createElement('button');
        button.className = 'flex items-center text-gray-700 hover:text-blue-900';
        button.innerHTML = `
            ${item.title}
            <i class="fas fa-chevron-down ml-1 text-sm"></i>
        `;
        button.onclick = () => toggleDropdown(index);

        const dropdown = document.createElement('div');
        dropdown.className = 'absolute z-50 left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden';
        dropdown.setAttribute('data-dropdown-index', index);

        item.submenu.forEach(subItem => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50';
            link.textContent = subItem;
            dropdown.appendChild(link);
        });

        menuContainer.appendChild(button);
        menuContainer.appendChild(dropdown);
        desktopMenu.appendChild(menuContainer);
    });

    // Add Portal Login button
    const loginButton = document.createElement('button');
    loginButton.className = 'bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800';
    loginButton.textContent = 'Portal Login';
    desktopMenu.appendChild(loginButton);
}

// Create mobile menu
function createMobileMenu() {
    menuItems.forEach((item, index) => {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'py-2';

        const button = document.createElement('button');
        button.className = 'w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50';
        button.textContent = item.title;
        button.onclick = () => toggleMobileDropdown(index);

        const submenu = document.createElement('div');
        submenu.className = 'hidden pl-8';
        submenu.setAttribute('data-mobile-dropdown-index', index);

        item.submenu.forEach(subItem => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'block py-2 text-gray-600 hover:text-blue-900';
            link.textContent = subItem;
            submenu.appendChild(link);
        });

        menuContainer.appendChild(button);
        menuContainer.appendChild(submenu);
        mobileMenu.appendChild(menuContainer);
    });

    // Add Portal Login button to mobile menu
    const loginButton = document.createElement('button');
    loginButton.className = 'w-full bg-blue-900 text-white px-4 py-2 my-2';
    loginButton.textContent = 'Portal Login';
    mobileMenu.appendChild(loginButton);
}

// Alumni Section Hover Effects
document.querySelectorAll('.alumni-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('transform', 'scale-105', 'transition-transform');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('transform', 'scale-105', 'transition-transform');
    });
});

// Toggle desktop dropdown
function toggleDropdown(index) {
    const dropdowns = document.querySelectorAll('[data-dropdown-index]');
    dropdowns.forEach((dropdown, i) => {
        if (i === index) {
            dropdown.classList.toggle('hidden');
        } else {
            dropdown.classList.add('hidden');
        }
    });
}

// Toggle mobile dropdown
function toggleMobileDropdown(index) {
    const submenu = document.querySelector(`[data-mobile-dropdown-index="${index}"]`);
    const allSubmenus = document.querySelectorAll('[data-mobile-dropdown-index]');
    
    allSubmenus.forEach((menu, i) => {
        if (i === index) {
            menu.classList.toggle('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.innerHTML = isMobileMenuOpen ? 
        '<i class="fas fa-times text-2xl"></i>' : 
        '<i class="fas fa-bars text-2xl"></i>';
}

// Event listeners
mobileMenuButton.addEventListener('click', toggleMobileMenu);

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative.group')) {
        const dropdowns = document.querySelectorAll('[data-dropdown-index]');
        dropdowns.forEach(dropdown => dropdown.classList.add('hidden'));
    }
});

// Initialize menus
createDesktopMenu();
createMobileMenu();