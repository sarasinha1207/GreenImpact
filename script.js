// Theme Toggle Functionality (common across most pages)
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });
}

// Apply saved theme or system preference on load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// Modal Toggle Function (used in multiple pages)
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

// Simulate Authentication (used in Features.html and Contact_Us.html modals)
function simulateAuth() {
    alert('Authentication simulated!');
}

// Accordion Toggle (used in Features.html and Contact_Us.html)
function toggleAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const isOpen = content.classList.contains('is-open');

    // Close all other open accordions
    document.querySelectorAll('.accordion-content.is-open').forEach(el => {
        el.classList.remove('is-open');
        el.parentElement.classList.remove('is-open');
    });

    if (!isOpen) {
        content.classList.add('is-open');
        item.classList.add('is-open');
    }
}

// How_it_works.html specific scripts
const steps = [
    { number: 1, title: "Sign Up & Start Tracking", desc: "Create an account and begin logging your daily activities easily." },
    { number: 2, title: "AI Analyzes Your Data", desc: "Our AI processes your logs using verified emission factors for accurate insights." },
    { number: 3, title: "Get Personalized Insights", desc: "Receive custom recommendations tailored to your lifestyle." },
    { number: 4, title: "Take Action & Offset", desc: "Set goals, join challenges, and offset emissions through trusted projects." },
    { number: 5, title: "Track Progress", desc: "Watch your impact decrease with real-time charts and earn rewards." },
    { number: 6, title: "Make a Global Difference", desc: "Contribute to a greener planet alongside thousands of users." }
];

function renderSteps() {
    const container = document.getElementById('steps-container');
    if (!container) return;

    steps.forEach((step, index) => {
        const card = document.createElement('div');
        card.className = 'step-card bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 text-center opacity-0';
        card.innerHTML = `
            <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <span class="text-2xl font-bold text-emerald-600">${step.number}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">${step.title}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">${step.desc}</p>
        `;
        card.onclick = () => highlightStep(index);
        container.appendChild(card);

        // Animate in sequentially
        setTimeout(() => {
            card.classList.remove('opacity-0');
            card.classList.add('animate-fade-in-up');
        }, index * 200);
    });
}

function highlightStep(index) {
    document.querySelectorAll('.step-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}

// Progress bar on scroll (How_it_works.html)
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
});

// Initialize steps on DOM load (How_it_works.html)
document.addEventListener('DOMContentLoaded', renderSteps);