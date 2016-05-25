if((!!window.chrome && !!window.chrome.webstore) || (typeof InstallTrigger !== 'undefined')) {
    var executedOpen = false;
    executedClose = false;
    hasOpened = false;

window.addEventListener("scroll", function(event) {
    var top = this.scrollY,
        left = this.scrollX;
    
    if(top < 10) {
        document.getElementById("logoAppear").style.visibility = 'hidden';
    } else if (top >= 500) {
        openHeader();
    } else {
        closeHeader();
    }

    function openHeader() {
        if (!executedOpen) {
            executedOpen = true;
            var headerHeight = 0;
            var logoMargin = -25;
            var rightNav = 0;
            var headerOpenFunction = window.setInterval(openHeaderInterval, 5);

            function openHeaderInterval() {
                headerHeight = headerHeight + 5;
                logoMargin = logoMargin + 3;
                rightNav = rightNav + 3;
                if(rightNav < 57) {
                    document.getElementById("rightNavAppear").style.marginTop = rightNav + 'px';
                    document.querySelector(".btnAppear").style.visibility = 'visible';
                    document.querySelector(".ulSettingsAppear").style.visibility = 'visible';
                }
                if (logoMargin < 32) {
                    document.getElementById("logoAppear").style.top = logoMargin + 'px';
                    document.getElementById("logoAppear").style.visibility = 'visible';
                } else {

                }
                if (headerHeight <= 100) {
                    document.getElementById("headerAppear").style.height = headerHeight + 'px';
                    document.getElementById("headerAppear").style.visibility = 'visible';
                } else {

                }
                if (headerHeight > 100 && logoMargin >= 32 && rightNav >= 57) {
                    hasOpened = true;
                    executedClose = false;
                    clearInterval(headerOpenFunction);
                } else {

                }
            }
        }
    }

    function closeHeader() {
        if (!executedClose) {
            if (hasOpened) {
                executedClose = true;
                var headerHeight = 100;
                var logoMargin = 37;
                var rightNav = 57;
                var headerCloseFunction = window.setInterval(closeHeaderInterval, 5);

                function closeHeaderInterval() {
                    headerHeight = headerHeight - 5;
                    logoMargin = logoMargin - 3;
                    rightNav = rightNav - 3;
                    if(rightNav >= -20) {
                        document.getElementById("rightNavAppear").style.marginTop = rightNav + 'px';
                    }
                    if (logoMargin >= -25) {
                        document.getElementById("logoAppear").style.top = logoMargin + 'px';
                    } else {

                    }
                    if (headerHeight >= 0) {
                        document.getElementById("headerAppear").style.height = headerHeight + 'px';
                    } else {

                    }
                    if (headerHeight < 0 && logoMargin < -25 && rightNav < -20) {
                        clearInterval(headerCloseFunction);
                        document.getElementById("logoAppear").style.visibility = 'hidden';
                        document.getElementById("headerAppear").style.visibility = 'hidden';
                        document.querySelector(".btnAppear").style.visibility = 'hidden';
                        document.querySelector(".ulSettingsAppear").style.visibility = 'hidden';
                        executedOpen = false;
                    } else {

                    }
                }
            }
        }
    }



}, false);
} else {

}