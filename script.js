document.addEventListener('DOMContentLoaded', () => {

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked or outside the menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
     document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });


    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });
    
    // Contact Form Submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = form.querySelector('button');
        button.textContent = 'Sending...';
        button.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                 button.textContent = 'Message Sent!';
                 button.style.background = 'linear-gradient(90deg, var(--accent-color), #1abc9c)';
                 form.reset();
                 setTimeout(() => {
                    button.textContent = 'Send Message';
                    button.disabled = false;
                    button.style.background = '';
                 }, 3000);
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "))
                    } else {
                        button.textContent = 'Error!';
                        button.style.background = '#e74c3c'; // Error color
                    }
                     setTimeout(() => {
                        button.textContent = 'Send Message';
                        button.disabled = false;
                        button.style.background = '';
                     }, 3000);
                })
            }
        }).catch(error => {
            console.error('Form submission error:', error);
            button.textContent = 'Error!';
            button.style.background = '#e74c3c';
        });
    });
});
