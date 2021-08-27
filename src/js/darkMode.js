const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
let isDark = false;

// New toggle for modes
const toggleDarkLightMode = isDark => {
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
  isDark
    ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
};

// Switch Theme Dynamically
const switchTheme = event => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', DARK_THEME);
    localStorage.setItem('theme', DARK_THEME);
    isDark = true;
    toggleDarkLightMode(isDark);
  } else {
    document.documentElement.setAttribute('data-theme', LIGHT_THEME);
    localStorage.setItem('theme', LIGHT_THEME);
    isDark = false;
    toggleDarkLightMode(isDark);
  }
};

// Event listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    toggleDarkLightMode(DARK_THEME);
  }
}
