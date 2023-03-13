function validateEmail(email){
    var emailReg = new RegExp(/^[A-Za-z0-9._+]+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/i);
    return emailReg.test(email);
}

export default validateEmail;