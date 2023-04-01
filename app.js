const loanForm = document
  .getElementById("loan-form")
  .addEventListener("submit", function (e) {
    //hide resualt
    document.getElementById("resualt").style.display = "none";
    //hide loading
    document.getElementById("loading").style.display = "none";
    //show loading
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResult, 2000);
    e.preventDefault();
  });

function calculateResult(e) {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-peyment");
  const totalPayment = document.getElementById("Total-peyment");
  const totalInterest = document.getElementById("Total-interest");

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculateInterest, calculatedPayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //show resualt
    document.getElementById("resualt").style.display = "block";
    //hide loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(error) {
  //hide resualt
  document.getElementById("resualt").style.display = "none";
  //create div
  const errorDiv = document.createElement("div");
  //get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  //add class
  errorDiv.className = "alert alert-danger";
  //create text node and append
  errorDiv.appendChild(document.createTextNode(error));
  //hide loading
  document.getElementById("loading").style.display = "none";
  //insert error above heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
