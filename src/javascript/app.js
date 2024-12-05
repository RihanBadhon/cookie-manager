'use strict';



const dialogOne = document.querySelector('.dlg1');
const dialogTwo = document.querySelector('.dlg2');
const acceptBtn = document.querySelector('#acceptBtn');
const settingsBtn = document.querySelector('#settingsBtn');
const preferencesBtn = document.querySelector('#preferencesBtn');
const cookieOne = document.querySelector('#cookie-one');
const cookieTwo = document.querySelector('#cookie-two');
const cookieThree = document.querySelector('#cookie-three');
const cookieFour = document.querySelector('#cookie-four');


if (navigator.cookieEnabled) {
    if (!document.cookie) {
        console.log('No cookies set')
        setTimeout(() => {
            dialogOne.showModal();
        }, 1000);
    } else {
        console.log('Cookies set')
        getCookie('Browser');
        getCookie('Operating System');
        getCookie('Screen Width');
        getCookie('Screen Height');
    }
}

acceptBtn.addEventListener('click', function() {
    dialogOne.close();
    setCookie('Browser', `${getBrowser()}`, 15);
    setCookie('Operating System', `${getOS()}`, 15);
    setCookie('Screen Width', `${screen.width}`, 15);
    setCookie('Screen Height', `${screen.height}`, 15);
})

settingsBtn.addEventListener('click', function() {
    dialogTwo.showModal();
})

preferencesBtn.addEventListener('click', function() {
    dialogOne.close();
    dialogTwo.close();
    createChecked();
})



function createChecked() {
    const cookies = [
        { el: cookieOne, name: 'Browser', value: getBrowser() },
        { el: cookieTwo, name: 'Operating System', value: getOS() },
        { el: cookieThree, name: 'Screen Width', value: screen.width },
        { el: cookieFour, name: 'Screen Height', value: screen.height }
    ];

    cookies.forEach(cookie => {
        setCookie(cookie.name, cookie.el.checked ? cookie.value : 'rejected', 15);
    });
}

// Set a cookie
function setCookie(ckey, cVal, expSecs) {
    const date = new Date();
    date.setTime(date.getTime() + (expSecs*1000))
    let expires = "expires=" + date.toUTCString();
    document.cookie = encodeURIComponent(ckey) + "=" + encodeURIComponent(cVal) + ";" + expires + ";path=/";
}

// Get a cookie
function getCookie(cname) {
    let name = cname + '=';
    let decodedCookies = decodeURIComponent(document.cookie);
    let cookieList = decodedCookies.split('; ');
    cookieList.forEach((elem) => {
        while (elem.charAt(0) == ' ') {
            elem = elem.substring(1);
        }
        if (elem.indexOf(name) == 0) {
            console.log(elem);
        }
    })
}


// Get Browser
function getBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("Opera") || ua.includes('OPR')) return 'Opera';
    if (ua.includes("Edg")) return 'Edge';
    if (ua.includes("Chrome") && !ua.includes("Chromium") && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("Chromium")) return 'Safari';
    if (ua.includes("Firefox") && !ua.includes("Seamonkey")) return 'Firefox';
}

function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "Mac/iOS";
    if (ua.includes("Linux")) return "Linux";
}