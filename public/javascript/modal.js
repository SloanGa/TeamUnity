document.addEventListener("DOMContentLoaded", () => {
  const profil = document.getElementById("profil");
  const editProfil = document.getElementById("editProfil");
  const deleteProfil = document.getElementById("deleteProfil");
  const addScore = document.getElementById("addScore");
  const modalAddScore = document.getElementById("modalAddScore");
  const modalEdit = document.getElementById("modalEdit");
  const modalDelete = document.getElementById("modalDelete");
  const closeModalEdit = document.getElementById("closeModalEdit");
  const closeModalDelete = document.getElementById("closeModalDelete");

  editProfil.addEventListener("click", () => {
    modalEdit.style.display = "block";
    modalDelete.style.display = "none";
    modalAddScore.style.display = "none";
  });

  deleteProfil.addEventListener("click", () => {
    modalDelete.style.display = "block";
    modalAddScore.style.display = "none";
    modalEdit.style.display = "none";
  });

  addScore.addEventListener("click", () => {
    modalAddScore.style.display = "block";
    modalEdit.style.display = "none";
    modalDelete.style.display = "none";
  });

  closeModalEdit.addEventListener("click", () => {
    modalEdit.style.display = "none";
  });

  closeModalDelete.addEventListener("click", () => {
    modalDelete.style.display = "none";
  });
});
