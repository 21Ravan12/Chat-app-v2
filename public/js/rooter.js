document.addEventListener("DOMContentLoaded", function () {
    const pages = ["main-page", "login-page", "sign-up-page", "forget-password-page", "forget-code-insert-page", "code-insert-page", "Landing-page"];
    
    function navigateTo(page) {
        pages.forEach(p => {
            document.querySelector(`.${p}`).style.display = (p === page) ? "flex" : "none";
        });
    }

    // Sayfa başlangıcında ana sayfa görünsün
    navigateTo("main-page");
    
    // HTML içinde onclick kullanıyorsan, bunları global yap
    window.navigateTo = navigateTo;
});
