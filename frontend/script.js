import * as lucide from 'lucide';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Here you would typically send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Mood tracking functionality
    const moodEmojis = document.querySelectorAll('.mood-tracker .emoji');
    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            moodEmojis.forEach(e => e.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Mood selected:', this.textContent);
        });
    });

    // Quick action buttons
    const startMeditationBtn = document.querySelector('.quick-actions button:first-child');
    const writeJournalBtn = document.querySelector('.quick-actions button:last-child');

    if (startMeditationBtn) {
        startMeditationBtn.addEventListener('click', function() {
            console.log('Starting meditation session');
            alert('Starting a meditation session. Take a deep breath...');
        });
    }

    if (writeJournalBtn) {
        writeJournalBtn.addEventListener('click', function() {
            console.log('Opening journal');
            alert('Opening your personal journal. What\'s on your mind today?');
        });
    }
});