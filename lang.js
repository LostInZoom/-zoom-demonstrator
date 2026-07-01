let langueActuelle = 'fr';

document.addEventListener('DOMContentLoaded', () => {
    const btnLang = document.getElementById('btn-lang');

    if (btnLang) {
        btnLang.addEventListener('click', () => {
            langueActuelle = langueActuelle === 'fr' ? 'en' : 'fr';
            
            btnLang.textContent = langueActuelle === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
            
            const elementsATraduire = document.querySelectorAll('[data-fr]');
            
            elementsATraduire.forEach(el => {
                const texteTraduit = el.getAttribute(`data-${langueActuelle}`);
                if (texteTraduit) {
                    el.textContent = texteTraduit;
                }
            });
        });
    }
});