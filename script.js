function signup() {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(() => msg.innerText = "Account created!")
    .catch(err => msg.innerText = err.message);
}
function login() {
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => msg.innerText = err.message);
}
function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}
function uploadFile() {
  const file = fileInput.files[0];
  storage.ref("uploads/" + file.name).put(file).then(() => alert("Uploaded"));
}
function addSale() {
  db.collection("sales").add({
    month: month.value,
    amount: parseFloat(amount.value),
    createdAt: new Date()
  }).then(() => loadSales());
}
function loadSales() {
  salesList.innerHTML = "";
  db.collection("sales").get().then(s => {
    s.forEach(doc => {
      const d = doc.data();
      salesList.innerHTML += `<p>${d.month}: ₹${d.amount}</p>`;
    });
  });
}
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged(u => { if (!u) location.href = "index.html"; else loadSales(); });
}