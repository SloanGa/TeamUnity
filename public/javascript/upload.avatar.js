document.addEventListener("DOMContentLoaded", () => {
    const formAvatar = document.getElementById('formAvatar') 
    const uploadFile = document.getElementById('uploadFile')

    formAvatar.addEventListener('click',()=>{
      uploadFile.click()
    })

    uploadFile.addEventListener('change', () => {
      formAvatar.submit();
    });
  });