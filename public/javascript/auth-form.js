window.addEventListener("DOMContentLoaded", () => {
  const forgot = document.getElementById("forgot");
  if (forgot) {
    forgot.addEventListener("click", () => {
      Swal.fire({
        title: "Renseignez votre email pour reinitialiser votre mot de passe",
        input: "email",
        inputPlaceholder: "Email",
      }).then((result) => {
        const email = result.value;
        if (email) {
          axios
            .post("/users/forgot-password", {
              email: email,
            })
            .then(() => {
              Swal.fire({
                icon: "success",
                title:
                  "Vous avez reçu un email avec les instructions pour reinitialiser votre mot de passe",
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Une erreur est survenue",
              });
            });
        }
      });
    });
  }
});
