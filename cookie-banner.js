document.addEventListener('DOMContentLoaded', function() {
    // Cookie-Banner Elemente
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('accept-all-cookies');
    const essentialOnlyBtn = document.getElementById('essential-only-cookies');
    const cookieSettingsBtn = document.getElementById('cookie-settings');
    const cookieSettingsModal = document.getElementById('cookie-settings-modal');
    const closeModalBtn = document.getElementById('close-settings-modal');
    const saveSettingsBtn = document.getElementById('save-cookie-settings');
    
    // Cookie-Status abrufen
    const cookieConsent = getCookie('cookie_consent');
    
    // Banner beim ersten Besuch anzeigen, wenn noch keine Cookie-Entscheidung getroffen wurde
    if (!cookieConsent) {
        cookieBanner.style.display = 'block';
    }
    
    // Event Listener für "Alle akzeptieren" Button
    acceptAllBtn.addEventListener('click', function() {
        // Alle Cookies akzeptieren
        setCookie('cookie_consent', 'all', 365);
        setCookie('cookie_analytics', 'true', 365);
        setCookie('cookie_marketing', 'true', 365);
        // Banner ausblenden
        cookieBanner.style.display = 'none';
        
        // Hier könnten Tracking-Skripte aktiviert werden
        activateTracking();
    });
    
    // Event Listener für "Nur essenzielle" Button
    essentialOnlyBtn.addEventListener('click', function() {
        // Nur essenzielle Cookies akzeptieren
        setCookie('cookie_consent', 'essential', 365);
        setCookie('cookie_analytics', 'false', 365);
        setCookie('cookie_marketing', 'false', 365);
        // Banner ausblenden
        cookieBanner.style.display = 'none';
    });
    
    // Event Listener für "Einstellungen" Button
    cookieSettingsBtn.addEventListener('click', function() {
        // Modal anzeigen
        cookieSettingsModal.style.display = 'flex';
        
        // Checkboxen basierend auf aktuellen Einstellungen setzen
        document.getElementById('analytics-cookies').checked = getCookie('cookie_analytics') === 'true';
        document.getElementById('marketing-cookies').checked = getCookie('cookie_marketing') === 'true';
    });
    
    // Event Listener für Schließen-Button im Modal
    closeModalBtn.addEventListener('click', function() {
        cookieSettingsModal.style.display = 'none';
    });
    
    // Klick außerhalb des Modals schließt es
    cookieSettingsModal.addEventListener('click', function(event) {
        if (event.target === cookieSettingsModal) {
            cookieSettingsModal.style.display = 'none';
        }
    });
    
    // Event Listener für "Einstellungen speichern" Button
    saveSettingsBtn.addEventListener('click', function() {
        // Cookie-Einstellungen basierend auf Checkboxen speichern
        const analyticsEnabled = document.getElementById('analytics-cookies').checked;
        const marketingEnabled = document.getElementById('marketing-cookies').checked;
        
        setCookie('cookie_consent', 'custom', 365);
        setCookie('cookie_analytics', analyticsEnabled.toString(), 365);
        setCookie('cookie_marketing', marketingEnabled.toString(), 365);
        
        // Modal und Banner ausblenden
        cookieSettingsModal.style.display = 'none';
        cookieBanner.style.display = 'none';
        
        // Tracking basierend auf Einstellungen aktivieren/deaktivieren
        if (analyticsEnabled) {
            activateTracking();
        }
    });
    
    // Hilfsfunktion: Cookie setzen
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Lax';
    }
    
    // Hilfsfunktion: Cookie auslesen
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Hilfsfunktion: Tracking aktivieren (Beispiel)
    function activateTracking() {
        // Hier können Sie Code zum Aktivieren von Tracking-Skripten einfügen
        // Zum Beispiel Google Analytics aktivieren
        console.log('Tracking aktiviert');
        
        // Beispiel für Google Analytics (in der Produktion anpassen)
        /*
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
        */
    }
});
