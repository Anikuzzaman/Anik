document.addEventListener('DOMContentLoaded', () => {

  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve previous settings from localStorage or check system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
  } else {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
  }

  // Handle Button Click Event
  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });

  /* --------------------------------------------------------------------------
     2. Responsive Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  };

  mobileToggle.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. Typewriter Effect (Hero Subtitle)
     -------------------------------------------------------------------------- */
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = [
    'CSE Student.',
    'Full Stack Developer.',
    'AI EXPLORER.',
    'PROBLEM SOLVER'
  ];
  
  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const performTypewriter = () => {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      
      typewriterText.textContent = currentPhrase.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50; 
    } else {
      // Write text character by character
      typewriterText.textContent = currentPhrase.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 100;
    }

    // Checking phase switches
    if (!isDeleting && characterIndex === currentPhrase.length) {
      // Pause at full word
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Delay before typing next word
    }

    setTimeout(performTypewriter, typingSpeed);
  };

  if (typewriterText) {
    performTypewriter();
  }

  /* --------------------------------------------------------------------------
     4. Intersection Observer: Scroll Reveal & Active Navigation
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.fade-in-element');
  const scrollSections = document.querySelectorAll('.scroll-section');
  const navLinksList = document.querySelectorAll('.nav-link');
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');

  // Trigger skill bar widths when visible
  const fillSkillBars = () => {
    skillBarFills.forEach(bar => {
      const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
      bar.style.width = `${targetWidth}%`;
    });
  };

  // General intersection reveal configs
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If the target is the skills section or includes visible items, fill skill bars
        if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
          fillSkillBars();
        }
        
        // Unobserve once shown
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));
  
  // Custom check to monitor skills section entry specifically (to fill progress bars)
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    revealObserver.observe(skillsSection);
  }

  // Active Link Spy Highlight
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -70% 0px' // Trigger active state when section takes up the core middle viewport
  });

  scrollSections.forEach(section => spyObserver.observe(section));

  /* --------------------------------------------------------------------------
     5. Project Categorization Filter
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on filters
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
          // Re-trigger visual animations
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     6. Back to Top Button & Sticky Nav behavior
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    // Show back-to-top button
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Shrink header look on scroll
    if (window.scrollY > 80) {
      header.style.height = '70px';
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.height = 'var(--header-height)';
      header.style.boxShadow = 'none';
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Frontend Validation & Simulation
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const successNotification = document.getElementById('form-success');
  const failureNotification = document.getElementById('form-failure');
  const submitBtn = document.getElementById('form-submit-btn');

  // Input Validation Helper Functions
  const setError = (inputElement, errorId) => {
    const parent = inputElement.parentElement;
    parent.classList.add('invalid');
  };

  const clearError = (inputElement) => {
    const parent = inputElement.parentElement;
    parent.classList.remove('invalid');
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Form Submit Handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    successNotification.style.display = 'none';
    failureNotification.style.display = 'none';

    // Name Validate
    if (nameInput.value.trim().length === 0) {
      setError(nameInput);
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validate
    if (!validateEmail(emailInput.value.trim())) {
      setError(emailInput);
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Subject Validate
    if (subjectInput.value.trim().length === 0) {
      setError(subjectInput);
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    // Message Validate
    if (messageInput.value.trim().length === 0) {
      setError(messageInput);
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      // Simulate Form submission to API
      submitBtn.disabled = true;
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

      setTimeout(() => {
        // Mock Success response
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        successNotification.style.display = 'flex';
        contactForm.reset();
      }, 1500);
    }
  });

  // Dynamic clear on typing
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      clearError(input);
    });
  });
});
