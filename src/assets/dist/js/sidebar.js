$(document).ready(function() {
    const navLink = document.getElementsByClassName("nav-item-customer");
    const navLinkRemoveActive = document.getElementsByClassName("nav-link");
    for (let i = 0; i < navLink.length; i++) {

        const y = navLink[i].getElementsByClassName("pl-1-custom");
       

        for (let j = 0; j < y.length; j++) { 
            y[j].addEventListener("click", function() {
                for (let k = 0; k < navLinkRemoveActive.length; k++) {
                    navLinkRemoveActive[k].classList.remove("active");
                }
                navLink[i].getElementsByClassName("nav-link")[0].classList.add("active")
                this.classList.add("active");
                 
               });
        }
    }
    const dashbot = document.getElementsByClassName("dashboard")[0];
    
    dashbot?.addEventListener("click", function() {
       if(!dashbot.className.includes("active")){
        for (let k = 0; k < navLinkRemoveActive.length; k++) {
            navLinkRemoveActive[k].classList.remove("active");
            // navLinkRemoveActive[k].classList.remove("menu-is-opening")
        }
        }
        this.classList.add("active");
       });
});
