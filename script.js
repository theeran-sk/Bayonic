document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll("[data-animate='fade-up']");
    const rows = document.querySelectorAll("tr");
    const selectedColor = "RGB(162, 235, 157)";
    const idleColor = "white";
    let selected = false;

    function selectTableRow(){
        rows.forEach(row => {
            row.addEventListener("click", () => {
                selected = !selected;
                if(selected)
                    row.style.backgroundColor = selectedColor;
                else if(!selected)
                    row.style.backgroundColor =idleColor;
            });
        });
    }
    function checkVisibility() {
        const viewportHeight = window.innerHeight;
        
        elements.forEach(element => {
            const { top, bottom } = element.getBoundingClientRect();
            if (top < viewportHeight && bottom >= 0) {
                element.classList.add("in-viewport");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    checkVisibility();
    selectTableRow();

    (function () {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init({
            publicKey: "5zq6f7D59OKBmFVKX",
        });
    })();

    window.onload = function () {
        document.getElementById("submit").addEventListener('click', function (event) {
            event.preventDefault();
            // these IDs from the previous steps
            if(selected){
                
                emailjs.send('service_xq84la8', 'template_ao4npzc', {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value
                })
                    .then(() => {
                        console.log('SUCCESS!');
                        document.getElementById("alert-text").innerText = "Email sent successfully, Check spam if needed";
                    }, (error) => {
                        console.log('FAILED...', error);
                        document.getElementById("alert-text").innerText = "Please fill out both sections";
                    });
            }
            else
                console.log("Table Row is not selected")
                document.getElementById("alert-text").innerText = "Select a table row to apply";
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 700;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });
});
