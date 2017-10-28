var Register = {
    accountAlreadyInUse: false,
    emailAlreadyInUse: false,
    passwordsDontMatch: false,
    inputs: [
        document.querySelector("#register-input-naam"),
        document.querySelector("#register-input-email"),
        document.querySelector("#register-input-wachtwoord"),
        document.querySelector("#register-input-herhaal-wachtwoord")
    ],
    form: document.querySelector("#register-form"),
    validateInfo: function(){
        Register.accounts = getAccounts();
        Register.values = [];
        Register.values.push(Register.inputs[0].value, Register.inputs[1].value, Register.inputs[2].value, Register.inputs[3].value);
        console.log(Register.accounts);
        if (Register.values[2] !== Register.values[3]){
            Register.passwordsDontMatch = true;
        }
        Register.accounts.forEach(function(account){
            if (account.name.toLowerCase() === Register.values[0].toLowerCase()){
                Register.accountAlreadyInUse = true;
            } else if (account.email.toLowerCase() === Register.values[1].toLowerCase()){
                Register.emailAlreadyInUse = true;
            }
        });
        if (Register.accountAlreadyInUse){
            Register.nameTaken();
        } else if (Register.emailAlreadyInUse){
            Register.emailTaken();
        } else if (Register.passwordsDontMatch){
            Register.passNotMatching();
        } else {
            Register.newAcc();
        }
    },
    nameTaken: function(){
        Register.inputs[0].classList.add("invalid");
        Register.accountAlreadyInUse = false;
    },
     emailTaken: function(){
         Register.inputs[0].classList.remove("invalid");
        Register.inputs[1].classList.add("invalid");
        Register.emailAlreadyInUse = false;
    },
    passNotMatching: function(){
        Register.inputs[3].classList.add("invalid");
        Register.passwordsDontMatch = false;
    },
    newAcc: function(){
        Register.inputs[0].classList.remove("invalid");
        Register.inputs[1].classList.remove("invalid");
        Register.accounts.push({name: Register.values[0], email: Register.values[1], ww: Register.values[2]});
        postAccounts();
        logIn("register.html", {name: Register.values[0], email: Register.values[1], ww: Register.values[2]});
    }
}
if (localStorage.getItem("Accounts") === null){
    Register.accounts = [];
    localStorage.setItem("Accounts", JSON.stringify(Register.accounts));
}


var Login = {
    accountExists: false,
    passwordMatches: false,
    inputs: [
        document.querySelector("#login-input-naam"),
        document.querySelector("#login-input-wachtwoord")
    ],
    form: document.querySelector("#login-form"),
    validateInfo: function(){
        Register.accounts = getAccounts();
        Login.values = [];
        Login.values.push(Login.inputs[0].value, Login.inputs[1].value);
        console.log(Login.values);
        Register.accounts.forEach(function(account){
            if (account.name.toLowerCase() === Login.values[0].toLowerCase()){
                Login.accountExists = true;
                if (account.ww === Login.values[1]){
                    Login.passwordMatches = true;
                    Login.curAcc = account;
                }
            }
        });
        if (Login.accountExists && Login.passwordMatches){
            Login.succes();
        } else if (Login.accountExists){
            Login.incorrectPassword();
        } else {
            Login.incorrectName();
        }
    },
    incorrectPassword: function(){
        Login.inputs[0].classList.remove("invalid");
        Login.inputs[1].classList.add("invalid");
    },
    incorrectName: function(){
        Login.inputs[0].classList.add("invalid");
    },
    succes: function(){
        Login.accountExists = false;
        Login.passwordMatches = false;
        Login.inputs[0].classList.remove("invalid");
        Login.inputs[1].classList.remove("invalid");
        logIn("login.html", Login.curAcc);
    }
}



function getAccounts() {
    return JSON.parse(localStorage.getItem("Accounts"));
}

function postAccounts(){
    localStorage.setItem("Accounts", JSON.stringify(Register.accounts));
}

function logIn(currentPage, account){
    window.location.href = window.location.href.split(currentPage).join("index.html");
    loggedin = true;
    localStorage.setItem("Logged", JSON.stringify(loggedin));
    localStorage.setItem("curAcc", JSON.stringify(account));
}


if (Register.form){
    Register.form.addEventListener("submit", function(e){
        e.preventDefault();
        Register.validateInfo();
    });
}
if (Login.form){
    Login.form.addEventListener("submit", function(e){
        e.preventDefault();
        Login.validateInfo();
    });

}
