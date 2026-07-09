

let langueActuelle = 'fr';

document.addEventListener('DOMContentLoaded', () => {
    const btnLang = document.getElementById('btn-lang');

    if (btnLang) {
        btnLang.addEventListener('click', () => {
            langueActuelle = langueActuelle === 'fr' ? 'en' : 'fr';
            
            btnLang.textContent = langueActuelle === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
            
            document.body.className = `lang-${langueActuelle}`;
            
            const elementsATraduire = document.querySelectorAll('[data-fr]');
            elementsATraduire.forEach(el => {

                if (!el.classList.contains('tooltip-help')) {
                    const texteTraduit = el.getAttribute(`data-${langueActuelle}`);
                    if (texteTraduit) {
                        el.textContent = texteTraduit;
                    }
                }
            });
        });
    }
});