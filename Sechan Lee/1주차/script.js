document.addEventListener("DOMContentLoaded",
    function(e) {
        let button = document.querySelectorAll("button");

        for(let i = 0; i < button.length; i++) {
            button[i].addEventListener("mousedown",
                function(e) {
                    button[i].style.backgroundColor = "#D0D0D0"; 
                }
            )

            button[i].addEventListener("mouseup",
                function(e) {
                    button[i].style.backgroundColor = "#F0F0F0";
                }
            )
        }
    }
)