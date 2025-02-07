document.addEventListener("DOMContentLoaded", function () {
    const pages = ["main-page", "login-page", "sign-up-page", "forget-password-page", "forget-code-insert-page", "code-insert-page", "Landing-page"];
    
    function navigateTo(page) {
        pages.forEach(p => {
            document.querySelector(`.${p}`).style.display = (p === page) ? "flex" : "none";
        });
    }

    // Sayfa başlangıcında ana sayfa görünsün
    navigateTo("main-page");

    // Butonlara yönlendirme ekle
    document.querySelector(".login-button").addEventListener("click", () => navigateTo("login-page"));
    document.querySelector(".primary-cta-button").addEventListener("click", () => navigateTo("sign-up-page"));
    
    // Giriş ve kayıt sayfaları arasında geçiş
    function MainToLogin() { navigateTo("login-page"); }
    function MainToSignUp() { navigateTo("sign-up-page"); }
    function LoginToSignin() { navigateTo("sign-up-page"); }
    function SigninToLogin() { navigateTo("login-page"); }
    function LoginToForgetpassword() { navigateTo("forget-password-page"); }
    function ForgetpasswordToLogin() { navigateTo("login-page"); }
    function LandingToAccount() { navigateTo("Landing-page"); }
    
    // HTML içinde onclick kullanıyorsan, bunları global yap
    window.MainToLogin = MainToLogin;
    window.MainToSignUp = MainToSignUp;
    window.LoginToSignin = LoginToSignin;
    window.SigninToLogin = SigninToLogin;
    window.LoginToForgetpassword = LoginToForgetpassword;
    window.ForgetpasswordToLogin = ForgetpasswordToLogin;
    window.LandingToAccount = LandingToAccount;
});
