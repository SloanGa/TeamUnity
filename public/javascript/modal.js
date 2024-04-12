document.addEventListener("DOMContentLoaded", () => {
  const profil = document.getElementById("profil");
  const editProfil = document.getElementById("editProfil");
  const deleteProfil = document.getElementById("deleteProfil");
  const addScore = document.getElementById("addScore");
  const modalEdit = document.getElementById("modalEdit");
  const modalDelete = document.getElementById("modalDelete");
  const closeModalEdit = document.getElementById("closeModalEdit");
  const closeModalDelete = document.getElementById("closeModalDelete");

  editProfil.addEventListener("click", () => {
    modalEdit.style.display = "block";
  });

  deleteProfil.addEventListener("click", () => {
    modalDelete.style.display = "block";
  });

  closeModalEdit.addEventListener("click", () => {
    modalEdit.style.display = "none";
  });

  closeModalDelete.addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
});
