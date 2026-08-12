// ================= FORM VALIDATION =================

(() => {
    'use strict';

    // Fetch all forms
    const forms = document.querySelectorAll('.needs-validation');

    // Apply Bootstrap validation
    Array.from(forms).forEach(form => {

        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');

        }, false);

    });

})();


// ================= DARK / LIGHT MODE =================

// Page load hote hi saved theme check karo
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


// Theme button
const themeToggle = document.getElementById("themeToggle");


// Check karo button page par exist karta hai ya nahi
if (themeToggle) {

    // Page load par correct icon show karo
    if (document.body.classList.contains("dark")) {
        themeToggle.innerHTML = "☀️";
    } else {
        themeToggle.innerHTML = "🌙";
    }


    // Button click
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");


        // Agar Dark Mode hai
        if (document.body.classList.contains("dark")) {

            themeToggle.innerHTML = "☀️";

            // Dark mode save karo
            localStorage.setItem("theme", "dark");

        }

        // Agar Light Mode hai
        else {

            themeToggle.innerHTML = "🌙";

            // Light mode save karo
            localStorage.setItem("theme", "light");

        }

    });

}