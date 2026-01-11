window.showPage = function(pageId, title, element) {
    // 1. Update the Header Title
    const pageTitle = document.getElementById('page-title');
    pageTitle.innerText = title;

    // 2. Handle Page Transitions
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        // Remove active class to hide and reset any CSS animations
        page.classList.remove('active');
        page.style.display = 'none'; 
    });

    // Show the target page
    const targetPage = document.getElementById(pageId);
    targetPage.style.display = 'block';
    
    // Small delay ensures the browser registers the 'display: block' 
    // before the CSS animation starts
    setTimeout(() => {
        targetPage.classList.add('active');
    }, 20);

    // 3. Update Navigation Bar Icons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // If the function was called from a click (passing 'this'), highlight it
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback for initial load (highlight Home by default)
        document.querySelector('.nav-item').classList.add('active');
    }
    
    // Optional: Scroll to top of page on switch
    window.scrollTo(0, 0);
};
