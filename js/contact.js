// ========================================
// CONTACT FORM WITH EMAILJS + reCAPTCHA v3
// ========================================

// SETUP INSTRUCTIONS:
// 1. Sign up at https://www.emailjs.com/ (Free tier: 200 emails/month)
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with these variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
// 4. Get your PUBLIC_KEY, SERVICE_ID, and TEMPLATE_ID
// 5. Sign up at https://www.google.com/recaptcha/admin for reCAPTCHA v3
// 6. Add your domain and get SITE_KEY
// 7. Replace the values below:

// ========================================
// CONTACT FORM WITH EMAILJS + reCAPTCHA v3
// ========================================

const EMAILJS_PUBLIC_KEY = 'wO8vbiOCEKStKJeC-';  // ✅ from Account → General
// 🔴 Replace ONLY this with your real Public Key (user_xxxxx)

const EMAILJS_SERVICE_ID = 'service_0x6r3bs';     // ✅ UPDATED
const EMAILJS_TEMPLATE_ID = 'template_0dvh2fc';  // ✅ UPDATED

const RECAPTCHA_SITE_KEY = '6LfQclIsAAAAACLVLDp84s6vRpqsiyOgSIEDy5zF'; 
// 🔴 Replace ONLY this with your real reCAPTCHA v3 Site Key

// ========================================
// EMAILJS INITIALIZATION
// ========================================
(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ========================================
// RECAPTCHA v3 SCRIPT LOADING
// ========================================
const recaptchaScript = document.createElement('script');
recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
document.head.appendChild(recaptchaScript);

// ========================================
// CONTACT FORM HANDLER
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
      const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

      const formData = {
        from_name: contactForm.querySelector('input[name="from_name"]').value,
        from_email: contactForm.querySelector('input[name="from_email"]').value,
        phone: contactForm.querySelector('input[name="phone"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value,
        'g-recaptcha-response': token
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData
      );

      showMessage('success', 'Thank you! Your message has been sent successfully. 😊');
      contactForm.reset();

    } catch (error) {
      showMessage('error', 'Something went wrong. Please try again.');
      console.error(error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

// ========================================
// MESSAGE DISPLAY FUNCTION
// ========================================
function showMessage(type, text) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
  alertDiv.innerText = text;
  contactForm.after(alertDiv);

  setTimeout(() => alertDiv.remove(), 5000);
}

// ========================================
// EMAILJS TEMPLATE EXAMPLE
// ========================================
/*
Create this template in your EmailJS dashboard:

Subject: New Inquiry from {{from_name}}

---
You have received a new inquiry from your website:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the Gayatri Rubbers & Chemicals Ltd website contact form.
*/