document.addEventListener("DOMContentLoaded", function () {
    const pages = ["main-page", "login-page", "sign-up-page", "forget-password-page", "forget-code-insert-page", "code-insert-page", "Landing-page","account-container"];
    
    function navigateTo(page) {
        sessionStorage.setItem('location',page);
        pages.forEach(p => {
            document.querySelector(`.${p}`).style.display = (p === page) ? "flex" : "none";
        });
    }

    // Sayfa başlangıcında ana sayfa görünsün
    if (sessionStorage.getItem('location')) {
        if (sessionStorage.getItem('location')==='Landing-page') {
            alert(sessionStorage.getItem('email'));
            fetchProfileData(sessionStorage.getItem('email'));
            fetchFriendsData(sessionStorage.getItem('email'),true);
            const savedProfileData = sessionStorage.getItem('profileData');
            if (savedProfileData) {
                const data = JSON.parse(savedProfileData);
                updateProfileUI(data);
            }
            const savedFriendsData = sessionStorage.getItem('friendsData');
            if (savedFriendsData) {
                const data = JSON.parse(savedFriendsData);
                updateFriends(data);
            }
        }else if (sessionStorage.getItem('location')==='account-container') {  
            fetchProfileData(sessionStorage.getItem('email'),false);
            fetchProfileDataAccount(); 
        }
        navigateTo(sessionStorage.getItem('location'));
    }else {
        navigateTo("main-page");
    }


    
    // HTML içinde onclick kullanıyorsan, bunları global yap
    window.navigateTo = navigateTo;
});
