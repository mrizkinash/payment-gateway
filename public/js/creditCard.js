function processInput() {
    let cardNumber = document.getElementById("ccNumber").value ? document.getElementById("ccNumber").value : document.getElementById("ccNumber").placeholder;
    let exp_date = document.getElementById("ccExp").value.split("/");
    let exp_month = parseInt(exp_date[0]) ? parseInt(exp_date[0]) : 2;
    let exp_year = parseInt(exp_date[1]) ? parseInt(exp_date[1]) : 2025;
    let cvv = document.getElementById("ccCVV").value ? document.getElementById("ccCVV").value : document.getElementById("ccCVV").placeholder

    let cardData = {
        "card_number": cardNumber,
        "card_exp_month": exp_month,
        "card_exp_year": exp_year,
        "card_cvv": cvv,
    }

    console.log(cardData);

    return cardData;
}

let options = {
    onSuccess: function(response) {
        let token_id = response.token_id;
        document.getElementById("ccToken").value = token_id;
        document.getElementById("message").innerHTML = "Credit Card Verification Succeeded"
    },
    onFailure: function(response) {
        console.log("Failure in obtaining card token");
        console.log("Error: ", response);
        document.getElementById("message").innerHTML = "An error occured during verification"
    }
}

document.getElementById("transactionButton").addEventListener("click", () => {
    MidtransNew3ds.getCardToken(processInput(), options);
})