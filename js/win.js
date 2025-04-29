
// בעת טעינה
function loud(){
// sessionStorage-מס הנקודות מה
let p=sessionStorage.getItem('score')
let t=document.getElementsByClassName('prize')[0]
let br=document.createElement('br')
t.appendChild(br)
// מעדכן את מס הנקודות
t.innerText+='your score:'+p
}

