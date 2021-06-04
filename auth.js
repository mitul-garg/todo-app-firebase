
auth.onAuthStateChanged(user=>{
    getTodos();
    setupUI(user);
})


// logout
const logout_a = document.querySelector("#logout");
logout_a.addEventListener("click", function(e){
    e.preventDefault();
    auth.signOut();
})


// login
const loginForm_form = document.getElementById("login-form");
loginForm_form.addEventListener("submit", e=>{
    e.preventDefault();
    const email = loginForm_form['login-email'].value;
    const password = loginForm_form['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(()=>{
        const modal = document.querySelector(".modal-container-login");
        modal.classList.remove("show-login-modal");
        loginForm_form.querySelector(".error").innerHTML = "";
        loginForm_form.reset();
    }).catch(err=>{
        loginForm_form.querySelector(".error").innerHTML = err.message;
    })
})

// signup
const signupForm_form = document.getElementById("signup-form");
signupForm_form.addEventListener("submit", e=>{
    e.preventDefault();
    const email = signupForm_form['signup-email'].value;
    const password = signupForm_form['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(()=>{
        const modal = document.querySelector(".modal-container-signup");
        modal.classList.remove("show-signup-modal");
        signupForm_form.querySelector(".error").innerHTML = "";
        signupForm_form.reset();
    }).catch(err=>{
        signupForm_form.querySelector(".error").innerHTML = err.message;
    })
})