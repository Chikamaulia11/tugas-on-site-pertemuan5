const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const errorMessage = document.getElementById("errorMessage");
const list = document.getElementById("daftar");

document.addEventListener("DOMContentLoaded", loadTasks);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = input.value.trim();

    if (text === "") {
            errorMessage.textContent = "Field tidak boleh kosong";
            input.classList.add("invalid");
            input.classList.remove("valid");
            return;
    } 

    errorMessage.textContent = "";
        input.classList.remove("invalid");
        input.classList.add("valid");
    const li = document.createElement("li");
    li.textContent = text;

    list.append(li);
    tambahTugas(text);
    simpanKeLocalStorage(text);
    input.value = "";

 });

 function tambahTugas(teks, selesai = false) {
  const li = document.createElement("li");
  li.textContent = teks;

if (selesai) li.classList.add("selesai");

  list.appendChild(li);
}

function simpanKeLocalStorage(teks) {
  const tugas = ambilDariLocalStorage();
  tugas.push({ teks, selesai: false });
  localStorage.setItem("tugas", JSON.stringify(tugas));
}

function ambilDariLocalStorage() {
  return JSON.parse(localStorage.getItem("tugas")) || [];
}


function loadTasks() {
  const tugas = ambilDariLocalStorage();
  tugas.forEach(t => tambahTugas(t.teks, t.selesai));
}


function perbaruiLocalStorage() {
  const items = document.querySelectorAll("#daftar li");
  const data = Array.from(items).map(li => ({
    teks: li.childNodes[0].nodeValue,
    selesai: li.classList.contains("selesai")
  }));
  localStorage.setItem("tugas", JSON.stringify(data));
}