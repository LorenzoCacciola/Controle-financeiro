
const transictionsUl = document.querySelector('#transactions');
const receitas = document.querySelector('#money-plus');
const despesas= document.querySelector('#money-minus');
const saldoAtual = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransactions = id => {
    transactions = transactions.filter(transections => transections.id !== id);
    
    updateLocalStorage();

    init();
}


function addTransictionIntoDom(transictions) {
    const operator = transictions.valor < 0 ? '-' : '+';
    const cssClass = transictions.valor < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');


    li.classList.add(cssClass);
    li.innerHTML = `
    ${transictions.name} <span>${operator} R$ ${Math.abs(transictions.valor)}</span><button class="delete-btn" onClick='removeTransactions(${transictions.id})'>x</button>`

    transictionsUl.prepend(li);

}

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.valor);

    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2); 

    const income = transactionsAmounts.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2);

    const expense = transactionsAmounts.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2);

   saldoAtual.textContent = `R$ ${total}`;
    receitas.textContent = `R$ ${income}`;
    despesas.textContent = `R$ ${Math.abs(expense)}`;

}

const init = () => {
    transictionsUl.innerHTML = ''

    transactions.forEach(addTransictionIntoDom);
    updateBalanceValues();
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount === ''){
        alert('Complete os dois campos obrigatorios!');
        return //se for vdd o return vai parar a reprodução
    }

    const transaction =  {
        id: generateId(), 
        name: transactionName, 
        valor: Number(transactionAmount)
    }
    

    transactions.push(transaction)
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
})


