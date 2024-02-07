let submitBtn = document.querySelector('.submitBtn')
let userName = document.querySelector('.userName')
submitBtn.addEventListener('click', () => {
    localStorage.setItem('user', userName.value)
    if(userName.value.length > 0){
        window.location.href = "http://localhost:3000/blogs"
    }else {
        alert('Вы должны что то написать')
    }
})