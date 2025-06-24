console.log("Footer.js loaded");

const footerPlaceholder = document.getElementById('footer-placeholder');
console.log("Footer placeholder element:", footerPlaceholder);

if (footerPlaceholder) {
    console.log("Fetching footer.html...");
    fetch('./footer.html')
        .then(response => {
            console.log("Footer response status:", response.status);
            return response.text();
        })
        .then(html => {
            console.log("Footer HTML loaded, length:", html.length);
            footerPlaceholder.innerHTML = html;
            console.log("Footer content inserted");
        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });
} else {
    console.error("Footer placeholder element not found");
}
