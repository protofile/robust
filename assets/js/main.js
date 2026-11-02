/**
 * Robust Logistics - Main JavaScript
 * PT Robust Celebes Indonesia
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Owl Carousel for Logistics Solutions (4 on desktop, 1 on mobile)
  // ------------------------------------------------------------------------
  if (window.jQuery && typeof jQuery.fn.owlCarousel !== 'undefined') {
    var $servicesCarousel = jQuery('#rbServicesCarousel');

    if ($servicesCarousel.length) {
      $servicesCarousel.owlCarousel({
        items: 4,
        loop: true,
        rewind: true,
        margin: 24,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 450,
        responsive: {
          0: {
            items: 1,
            margin: 16
          },
          576: {
            items: 2,
            margin: 20
          },
          992: {
            items: 3,
            margin: 22
          },
          1200: {
            items: 4,
            margin: 24
          }
        }
      });

      // Custom Navigation Controls
      jQuery('#rbSliderNext').on('click', function () {
        $servicesCarousel.trigger('next.owl.carousel');
      });

      jQuery('#rbSliderPrev').on('click', function () {
        $servicesCarousel.trigger('prev.owl.carousel');
      });
    }
  // ------------------------------------------------------------------------
  // 2. Sticky Header Scroll Effect
  // ------------------------------------------------------------------------
  const headerElem = document.querySelector('.rb-header');
  if (headerElem) {
    const handleHeaderScroll = function () {
      if (window.scrollY > 15) {
        headerElem.classList.add('rb-header-scrolled');
      } else {
        headerElem.classList.remove('rb-header-scrolled');
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // ------------------------------------------------------------------------
  // 3. Smooth Navigation Links
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Close offcanvas if opened on mobile
          const offcanvasElem = document.getElementById('rbMobileMenu');
          if (offcanvasElem && bootstrap.Offcanvas.getInstance(offcanvasElem)) {
            bootstrap.Offcanvas.getInstance(offcanvasElem).hide();
          }
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll (Intersection Observer)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.rb-nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const isAboutPage = window.location.pathname.endsWith('about.html');
    const isServicesPage = window.location.pathname.endsWith('our-services.html');
    const isExpertisePage = window.location.pathname.endsWith('expertise.html');
    const isContactPage = window.location.pathname.endsWith('contact-us.html');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          const matchingLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${currentId}`);
          if (matchingLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            matchingLink.classList.add('active');
          } else if (isAboutPage) {
            navLinks.forEach(link => {
              if (link.getAttribute('href') === 'about.html') {
                link.classList.add('active');
              } else if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
              }
            });
          } else if (isServicesPage) {
            navLinks.forEach(link => {
              if (link.getAttribute('href') === 'our-services.html') {
                link.classList.add('active');
              } else if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
              }
            });
          } else if (isExpertisePage) {
            navLinks.forEach(link => {
              if (link.getAttribute('href') === 'expertise.html') {
                link.classList.add('active');
              } else if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
              }
            });
          } else if (isContactPage) {
            navLinks.forEach(link => {
              if (link.getAttribute('href') === 'contact-us.html') {
                link.classList.add('active');
              } else if (!link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
              }
            });
          }
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // ------------------------------------------------------------------------
  // 4. Services Sidebar Tab Switcher (our-services.html)
  // ------------------------------------------------------------------------
  const serviceNavItems = document.querySelectorAll('.rb-services-nav-item[data-service-target]');
  const servicePanes = document.querySelectorAll('.rb-service-pane');

  if (serviceNavItems.length > 0 && servicePanes.length > 0) {
    serviceNavItems.forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-service-target');
        
        // Update active nav button
        serviceNavItems.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Update active content pane
        servicePanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.remove('d-none');
            pane.classList.add('d-block');
          } else {
            pane.classList.remove('d-block');
            pane.classList.add('d-none');
          }
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Approach Accordion Interactivity (expertise.html)
  // ------------------------------------------------------------------------
  const approachHeaders = document.querySelectorAll('.rb-approach-header');

  if (approachHeaders.length > 0) {
    approachHeaders.forEach(header => {
      header.addEventListener('click', function (e) {
        e.preventDefault();
        const parentItem = this.closest('.rb-approach-item');
        const bodyElem = parentItem.querySelector('.rb-approach-body');
        const iconElem = this.querySelector('.rb-approach-icon i');
        const isCurrentlyActive = parentItem.classList.contains('active');

        // Close all items
        document.querySelectorAll('.rb-approach-item').forEach(item => {
          item.classList.remove('active');
          const itemBody = item.querySelector('.rb-approach-body');
          const itemIcon = item.querySelector('.rb-approach-icon i');
          if (itemBody) itemBody.classList.add('d-none');
          if (itemIcon) {
            itemIcon.className = 'bi bi-plus-circle';
          }
        });

        // If it was not active, open it
        if (!isCurrentlyActive) {
          parentItem.classList.add('active');
          if (bodyElem) bodyElem.classList.remove('d-none');
          if (iconElem) {
            iconElem.className = 'bi bi-dash-circle';
          }
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. Quote Form Submission Simulation
  // ------------------------------------------------------------------------
  const quoteForm = document.getElementById('rbQuoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your quote request has been received. Our team will contact you shortly.');
        quoteForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        const modalElem = document.getElementById('rbQuoteModal');
        if (modalElem && bootstrap.Modal.getInstance(modalElem)) {
          bootstrap.Modal.getInstance(modalElem).hide();
        }
      }, 900);
    });
  }

  // ------------------------------------------------------------------------
  // 6. Contact Page Form Submission
  // ------------------------------------------------------------------------
  const contactPageForm = document.getElementById('rbContactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactPageForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for reaching out! Your message has been sent successfully. We will get back to you soon.');
        contactPageForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 900);
    });
  }
});
