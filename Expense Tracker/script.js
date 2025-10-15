const transactionsList = document.getElementById("transactions");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const pieChartCtx = document.getElementById("pieChart").getContext("2d");
const barChartCtx = document.getElementById("barChart").getContext("2d");
const toggleModeBtn = document.getElementById("toggleModeBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Edit modal
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
let editingId = null;

toggleModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateCharts();
});

closeModal.addEventListener("click", () => { editModal.style.display = "none"; });

// Update UI
function updateUI() {
    transactionsList.innerHTML = "";
    let income = 0, expense = 0;

    transactions.forEach(t => {
        if(!t.type) t.type="expense";
        const li = document.createElement("li");
        li.classList.add(t.type);

        li.innerHTML = `
            <div>
                <strong>${t.title}</strong> (${t.category})<br>
                <small>${t.date} | ${t.paymentMethod}</small><br>
                ${t.notes? `<small>📝 ${t.notes}</small><br>`:""}
                ${t.recurring? "<small>🔁 Recurring</small>":""}
            </div>
            <div>
                <span>${t.type==="income"?"+":"-"}₹${t.amount}</span>
                <button class="edit-btn" onclick="editTransaction(${t.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
            </div>
        `;

        transactionsList.appendChild(li);

        if(t.type==="income") income+=t.amount; else expense+=t.amount;
    });

    balanceEl.textContent = `₹${income-expense}`;
    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;
    updateCharts();
}

// Delete
function deleteTransaction(id){
    transactions = transactions.filter(t=>t.id!==id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

// Edit
function editTransaction(id){
    const t = transactions.find(tr=>tr.id===id);
    if(!t) return;
    editingId = id;
    document.getElementById("editTitle").value = t.title;
    document.getElementById("editAmount").value = t.amount;
    document.getElementById("editDate").value = t.date;
    document.getElementById("editCategory").value = t.category;
    document.getElementById("editPaymentMethod").value = t.paymentMethod;
    document.getElementById("editNotes").value = t.notes;
    document.getElementById("editRecurring").checked = t.recurring;
    document.getElementById("editType").value = t.type;
    editModal.style.display = "block";
}

document.getElementById("editForm").addEventListener("submit", e=>{
    e.preventDefault();
    const tIndex = transactions.findIndex(tr=>tr.id===editingId);
    if(tIndex===-1) return;
    transactions[tIndex]={
        id:editingId,
        title: document.getElementById("editTitle").value,
        amount: parseFloat(document.getElementById("editAmount").value),
        date: document.getElementById("editDate").value,
        category: document.getElementById("editCategory").value,
        paymentMethod: document.getElementById("editPaymentMethod").value,
        notes: document.getElementById("editNotes").value,
        recurring: document.getElementById("editRecurring").checked,
        type: document.getElementById("editType").value
    };
    localStorage.setItem("transactions", JSON.stringify(transactions));
    editModal.style.display = "none";
    updateUI();
});

// Charts
let pieChart, barChart;
function updateCharts(){
    // Pie Chart (Top 5 + Others)
    const categoryTotals = {};
    transactions.forEach(t=>{
        if(t.type==="expense") categoryTotals[t.category] = (categoryTotals[t.category]||0)+t.amount;
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1]);
    const topCategories = sortedCategories.slice(0,5);
    const othersTotal = sortedCategories.slice(5).reduce((sum,c)=>sum+c[1],0);
    if(othersTotal>0) topCategories.push(["Other", othersTotal]);

    const labels = topCategories.map(c=>c[0]);
    const data = topCategories.map(c=>c[1]);

    if(pieChart) pieChart.destroy();
    pieChart = new Chart(pieChartCtx,{
        type:"pie",
        data:{ labels, datasets:[{data, backgroundColor:["#FF6384","#36A2EB","#FFCE56","#8AFF33","#FF8A33","#9B33FF"]}] },
        options:{ plugins:{ legend:{ labels:{ color: document.body.classList.contains("dark")?'#fff':'#000' } } } }
    });

    // Bar Chart
    const catMap = {};
    transactions.forEach(t=>{
        if(!catMap[t.category]) catMap[t.category]={income:0, expense:0};
        catMap[t.category][t.type]+=t.amount;
    });
    const barLabels = Object.keys(catMap);
    const incomeData = barLabels.map(c=>catMap[c].income);
    const expenseData = barLabels.map(c=>catMap[c].expense);

    if(barChart) barChart.destroy();
    barChart = new Chart(barChartCtx,{
        type:"bar",
        data:{ labels:barLabels, datasets:[
            {label:"Income", data:incomeData, backgroundColor:"#28a745"},
            {label:"Expense", data:expenseData, backgroundColor:"#dc3545"}
        ]},
        options:{
            plugins:{ legend:{ labels:{ color: document.body.classList.contains("dark")?'#fff':'#000' } } },
            scales:{ x:{ ticks:{ color: document.body.classList.contains("dark")?'#fff':'#000' } }, y:{ ticks:{ color: document.body.classList.contains("dark")?'#fff':'#000' } } }
        }
    });
}

updateUI();
