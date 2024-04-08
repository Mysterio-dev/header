(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (function() {
        var menuActionButton = document.querySelector(".menu-action");
        var menuItems = document.querySelectorAll(".header__menu-item");
        var menu = document.querySelector(".header__menu");
        var isMenuOpened = false;
        menuActionButton.addEventListener("click", (function() {
            isMenuOpened = !isMenuOpened;
            if (isMenuOpened) {
                document.documentElement.style.setProperty("--animate-duration", ".5s");
                menu.classList.add("show", "animate__animated", "animate__fadeIn");
            } else {
                document.documentElement.style.setProperty("--animate-duration", "1s");
                menu.classList.remove("show", "animate__animated", "animate__fadeIn");
            }
            menuItems.forEach((function(item, index) {
                if (index >= 4) item.style.display = isMenuOpened ? "flex" : "none";
            }));
        }));
        var contactsItem = document.querySelector(".header__contacts-item");
        if (contactsItem) contactsItem.addEventListener("click", (function() {
            var socialLinks = document.querySelectorAll(".header__social-link");
            var topBlock = document.querySelector(".header__top");
            if (socialLinks.length > 0) socialLinks.forEach((function(link) {
                if (link.style.display === "none") link.style.display = "flex"; else link.style.display = "none";
            }));
            if (topBlock) if (topBlock.style.display === "none") topBlock.style.display = "flex"; else topBlock.style.display = "none";
        }));
    }));
    window["FLS"] = false;
    isWebp();
    menuInit();
})();