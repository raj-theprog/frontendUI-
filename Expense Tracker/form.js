const form = document.getElementById("form");

form.addEventListener("submit", e=>{
    e.preventDefault();
    const title=document.getElementById("title").value;
    const amount=parseFloat(document.getElementById("amount").value);
    const category=document.getElementById("category").value;
    const date=document.getElementById("date").value;
    const paymentMethod=document.getElementById("paymentMethod").value;
    const notes=document.getElementById("notes").value;
    const type=document.getElementById("type").value;

    const transaction={id:Date.now(), title, amount, category, date, paymentMethod, notes, type};
    const transactions=JSON.parse(localStorage.getItem("transactions"))||[];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert("Transaction added!");
    window.location.href="index.html";
});
