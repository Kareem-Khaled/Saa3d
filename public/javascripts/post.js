

editBtn = document.querySelector('.editBtn');
mainPost = document.querySelector('.mainPost');
editPost = document.querySelector('.editPost');
cancelEdit = document.querySelector('.cancelEdit');

function togglePost(){
    mainPost.classList.toggle("d-none");
    editPost.classList.toggle("d-none");
}

editBtn.addEventListener('click', () => { togglePost() });
cancelEdit.addEventListener('click', () => { togglePost() });


