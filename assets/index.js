const saveDataToLocalStorage = (data) => {
  localStorage.setItem("dataArray", JSON.stringify(data));
};

const loadDataFromLocalStorage = () => {
  const storedData = localStorage.getItem("dataArray");
  return storedData ? JSON.parse(storedData) : [];
};

const displayData = () => {
  const dataArray = loadDataFromLocalStorage();
  const tableBody = document.querySelector("#outputData tbody");
  tableBody.innerHTML = ""; 

  dataArray.forEach((item, index) => {
    const newRow = document.createElement("tr");
    
    const namaJudulTd = document.createElement("td");
    namaJudulTd.textContent = item.namaJudul;
    newRow.appendChild(namaJudulTd);

    const kategoriTd = document.createElement("td");
    kategoriTd.textContent = item.kategori;
    newRow.appendChild(kategoriTd);

    const catatanTd = document.createElement("td");
    catatanTd.textContent = item.catatan;
    newRow.appendChild(catatanTd);

    // Tambahkan kolom aksi
    const aksiTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      if (confirm("Anda yakin ingin menghapus catatan ini?")) {
        hapusData(index);
      }
    };
    aksiTd.appendChild(deleteButton);

    newRow.appendChild(aksiTd);
    tableBody.appendChild(newRow);
  });
};

const btnTambah = () => {
  const namaJudul = document.getElementById("inputNamaJudul").value.trim();
  const kategori = document.getElementById("inputKategori").value.trim();
  const catatan = document.getElementById("inputCatatan").value.trim();

  if (namaJudul !== "" && kategori !== "" && catatan !== "") {
    const dataArray = loadDataFromLocalStorage();
    dataArray.push({ namaJudul, kategori, catatan });
    saveDataToLocalStorage(dataArray);

    displayData();
    document.getElementById("inputNamaJudul").value = "";
    document.getElementById("inputKategori").value = "";
    document.getElementById("inputCatatan").value = "";

    alert("Data '" + namaJudul + "' berhasil ditambahkan ke tabel.");
  } else {
    alert("Mohon isi semua data sebelum menambahkannya.");
  }
};

const hapusData = (index) => {
  const dataArray = loadDataFromLocalStorage();
  dataArray.splice(index, 1); // Hapus data berdasarkan index
  saveDataToLocalStorage(dataArray);
  displayData();
};

const hapusSemua = () => {
  if (confirm("Anda yakin ingin menghapus semua data?")) {
    localStorage.clear();
    alert("Data berhasil dihapus");
    displayData();
  }
};

window.onload = displayData;
