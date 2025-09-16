// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const html = document.documentElement

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark"
  html.classList.toggle("dark", currentTheme === "dark")

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.contains("dark")
    html.classList.toggle("dark", !isDark)
    localStorage.setItem("theme", !isDark ? "dark" : "light")

    // Update icon
    const icon = themeToggle.querySelector("svg")
    if (!isDark) {
      // Switch to moon icon for dark mode
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>'
    } else {
      // Switch to sun icon for light mode
      icon.innerHTML =
        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'
    }
  })

  // Navigation functionality
  const navButtons = document.querySelectorAll(".nav-btn")
  navButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      navButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      // You can add navigation logic here
      console.log(`Navigation ${index} clicked`)
    })
  })

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  // Contact Form Handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Simple validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        showNotification("Please fill in all required fields.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        showNotification("Please enter a valid email address.", "error")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.querySelector("span").textContent
      submitBtn.querySelector("span").textContent = "SENDING..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        showNotification("Message sent successfully! I'll get back to you soon.", "success")
        contactForm.reset()
        submitBtn.querySelector("span").textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Smooth scroll for buttons
  document.querySelector('button[class*="MORE ABOUT ME"]')?.addEventListener("click", () => {
    // Add your navigation logic here
    console.log("More about me clicked")
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 15, 0.95)"
      navbar.style.backdropFilter = "blur(20px)"
      navbar.style.borderBottom = "1px solid rgba(79, 172, 254, 0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 15, 0.9)"
      navbar.style.backdropFilter = "blur(20px)"
      navbar.style.borderBottom = "1px solid rgba(79, 172, 254, 0.2)"
    }
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(
      ".service-card, .testimonial-card, .qual-card, .package-card, .faq-item, .skill-category, .project-card, .contact-item, .feature-item",
    )
    .forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })

  // Particle System
  function createParticles() {
    const particlesContainer = document.getElementById("particles")
    const particleCount = 60

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = Math.random() * 15 + 15 + "s"

      // Random colors for particles
      const colors = ["var(--neon-blue)", "var(--neon-pink)", "var(--neon-cyan)"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.background = randomColor
      particle.style.boxShadow = `0 0 10px ${randomColor}`

      particlesContainer.appendChild(particle)
    }
  }

  // Mobile Navigation
  function initMobileNav() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        })
      })
    }
  }

  // Smooth Scrolling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // Active Navigation
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }

  // Tilt Effect
  function initTiltEffect() {
    const tiltElements = document.querySelectorAll("[data-tilt]")

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 15
        const rotateY = (centerX - x) / 15

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
      })

      element.addEventListener("mouseleave", () => {
        element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      })
    })
  }

  // Skill Progress Animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target.getAttribute("data-progress")
            entry.target.style.width = progress + "%"
          }
        })
      },
      { threshold: 0.5 },
    )

    skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  // Notification System
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "var(--accent-gradient)" : "var(--secondary-gradient)"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Close functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    })

    // Auto close
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification)
          }
        }, 300)
      }
    }, 5000)
  }

  // Cursor Effect
  function initCursorEffect() {
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--neon-cyan);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease, background 0.1s ease;
      opacity: 0;
    `
    document.body.appendChild(cursor)

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX - 10 + "px"
      cursor.style.top = e.clientY - 10 + "px"
      cursor.style.opacity = "1"
    })

    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0"
    })

    // Scale cursor on hover
    document.querySelectorAll("a, button, [data-tilt]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)"
        cursor.style.background = "var(--neon-pink)"
      })
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)"
        cursor.style.background = "var(--neon-cyan)"
      })
    })
  }

  // Typing Effect for Hero
  function initTypingEffect() {
    const heroTitle = document.querySelector(".hero-title")
    if (heroTitle) {
      const spans = heroTitle.querySelectorAll("span")
      spans.forEach((span, index) => {
        span.style.opacity = "0"
        span.style.animation = `fadeInUp 0.8s ease-out ${index * 0.3}s forwards`
      })
    }
  }

  // Initialize all functions
  createParticles()
  initMobileNav()
  initSmoothScroll()
  updateActiveNav()
  initTiltEffect()
  animateSkillBars()
  initCursorEffect()
  initTypingEffect()

  // Add loading animation
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  // Add some easter eggs
  console.log(`
    ╔══════════════════════════════════════╗
    ║          GENZEN NOJA PORTFOLIO       ║
    ║                                      ║
    ║    🎨 Designed with passion          ║
    ║    ⚡ Built with modern tech         ║
    ║    🚀 Optimized for performance      ║
    ║                                      ║
    ║    Thanks for checking the console!  ║
    ╚══════════════════════════════════════╝
  `)
})

// Performance monitoring
window.addEventListener("load", () => {
  // Log performance metrics
  const perfData = performance.getEntriesByType("navigation")[0]
  console.log("🚀 Site loaded in:", Math.round(perfData.loadEventEnd - perfData.fetchStart), "ms")
})

// Performance optimization - Preload critical images
window.addEventListener("DOMContentLoaded", () => {
  const criticalImages = [
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

// Add some interactive sound effects (optional)
function playClickSound() {
  // You can add Web Audio API sound effects here
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = 800
  oscillator.type = "sine"

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

// Add click sound to buttons (optional)
document.addEventListener("click", (e) => {
  if (e.target.matches("button, .btn")) {
    // playClickSound() // Uncomment to enable sound effects
  }
})