const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Tidak Boleh Kosong Ya! Jangan seperti hati aku kosong");
    } else {
        let li = document.createElement("li");

        // Tambahkan teks tugas sebagai elemen <p>
        let p = document.createElement("p");
        p.textContent = inputBox.value;
        li.appendChild(p);

        // Tambahkan tombol silang
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Tambahkan elemen tanggal setelah tombol silang
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString(); // Format tanggal dan waktu
        let small = document.createElement("small");
        small.textContent = formattedDate;
        li.appendChild(small);

        listContainer.appendChild(li);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "P") { // Jika teks tugas diklik
        let currentText = e.target.textContent;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";

        // Sembunyikan tombol silang
        let span = e.target.parentElement.querySelector("span");
        if (span) {
            span.style.display = "none";
        }

        e.target.replaceWith(input);

        input.addEventListener("blur", function () { // Simpan perubahan saat input kehilangan fokus
            let newText = input.value.trim();
            if (newText !== "") {
                let p = document.createElement("p");
                p.textContent = newText;
                input.replaceWith(p);

                // Tampilkan kembali tombol silang
                if (span) {
                    span.style.display = "inline";
                }

                saveData();
            } else {
                alert("Teks tugas tidak boleh kosong!");
                input.focus();
            }
        });

        input.addEventListener("keydown", function (event) { // Simpan perubahan saat menekan Enter
            if (event.key === "Enter") {
                input.blur();
            }
        });

        input.focus();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();