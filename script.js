let selectedSeats = [];
const seatPrice = 150;

/* ================= MOVIE ================= */

function bookMovie(name){
localStorage.setItem("movie", name);
location.href = "seats.html";
}

/* ================= CREATE SEATS ================= */

const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const seating = document.getElementById("seating");

if(seating){
rows.forEach(row=>{
let rowDiv = document.createElement("div");
rowDiv.className = "row";

let label = document.createElement("div");
label.className = "row-label";
label.innerText = row;

let left = document.createElement("div");
left.className = "block";
for(let i=1;i<=10;i++) left.appendChild(createSeat(row+i));

let gap = document.createElement("div");
gap.className = "gap";

let right = document.createElement("div");
right.className = "block";
for(let i=11;i<=20;i++) right.appendChild(createSeat(row+i));

rowDiv.append(label,left,gap,right);
seating.appendChild(rowDiv);
});
}

function createSeat(name){
let seat = document.createElement("div");
seat.className = "seat free";
seat.innerText = name;

if(Math.random() < 0.2) seat.className = "seat booked";

seat.onclick = () => {
if(seat.classList.contains("booked")) return;

if(seat.classList.contains("selected")){
seat.className = "seat free";
selectedSeats = selectedSeats.filter(s => s !== name);
}else{
if(selectedSeats.length >= 6){
alert("Only 6 seats allowed");
return;
}
seat.className = "seat selected";
selectedSeats.push(name);
}
updateTotal();
};

return seat;
}

/* ================= TOTAL ================= */

function updateTotal(){
if(document.getElementById("seatCount"))
seatCount.innerText = "Seats: " + selectedSeats.length;

if(document.getElementById("totalAmount"))
totalAmount.innerText = "Total: ₹" + (selectedSeats.length * seatPrice);
}

/* ================= TIMER + AUTO REFRESH ================= */

let timeLeft = 300;

function startTimer(){
setInterval(()=>{
let m = Math.floor(timeLeft / 60);
let s = timeLeft % 60;

if(document.getElementById("timer")){
timer.innerText =
`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

timeLeft--;

if(timeLeft < 0){
timeLeft = 300;
refreshSeats();
}
},1000);
}

function refreshSeats(){
document.querySelectorAll(".seat").forEach(seat=>{
if(!seat.classList.contains("selected")){
seat.className = "seat free";
if(Math.random() < 0.25) seat.className = "seat booked";
}
});
}

if(document.getElementById("timer")) startTimer();

/* ================= PAYMENT ================= */

function finish(){
if(document.getElementById("custName")){
localStorage.setItem("customer", custName.value);
localStorage.setItem("mobile", mobile.value);
}

if(document.getElementById("pay")){
localStorage.setItem("payment", pay.value);
}

location.href = "bill.html";
}

function goPayment(){
localStorage.setItem("seats", selectedSeats.join(", "));
location.href = "payment.html";
}

/* ================= BILL PAGE ================= */

if(document.getElementById("custName")){

document.getElementById("custName").innerText =
localStorage.getItem("customer") || "";

document.getElementById("custMobile").innerText =
localStorage.getItem("mobile") || "";

document.getElementById("movie").innerText =
localStorage.getItem("movie") || "";

document.getElementById("date").innerText =
localStorage.getItem("date") || "";

document.getElementById("time").innerText =
localStorage.getItem("time") || "";

document.getElementById("theatre").innerText =
localStorage.getItem("theater") || "";

document.getElementById("seats").innerText =
localStorage.getItem("seats") || "";

document.getElementById("payment").innerText =
localStorage.getItem("payment") || "";

document.getElementById("ticketId").innerText =
"BMS" + Math.floor(Math.random() * 100000);
}

/* ================= PRINT ================= */

function printTicket(){
window.print();
}

/* ================= HOME ================= */

function home(){
location.href = "index.html";
}
