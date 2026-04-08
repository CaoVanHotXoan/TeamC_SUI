const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight;
    
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        
        // If next card is rising towards the sticky point
        if (index < cards.length - 1) {
            const nextCard = cards[index + 1];
            const nextRect = nextCard.getBoundingClientRect();
            
            // Map distance to a scale value
            const distance = nextRect.top - rect.top;
            
            if (distance < viewportHeight && distance > 0) {
                const isMobile = window.innerWidth <= 768;
                const maxShrink = isMobile ? 0.95 : 0.90;
                
                const factor = (1 - maxShrink) / viewportHeight;
                const scale = 1 - (viewportHeight - distance) * factor;
                
                // Clamp values
                const finalScale = Math.max(maxShrink, Math.min(1, scale));
                
                card.style.transform = `scale(${finalScale})`;
                card.style.filter = `brightness(${finalScale})`;
            } else if (distance <= 0) {
                // Fully covered
                const isMobile = window.innerWidth <= 768;
                const maxShrink = isMobile ? 0.95 : 0.90;
                card.style.transform = `scale(${maxShrink})`;
                card.style.filter = `brightness(${maxShrink})`;
            } else {
                // Not covered yet
                card.style.transform = `scale(1)`;
                card.style.filter = `brightness(1)`;
            }
        }
    });
});
