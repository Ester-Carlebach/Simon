//התואמת label אחרי שיוצא מהפקד מוחק את תגית ה  input  לכל 
function del() {
    let level = document.getElementById(event.currentTarget.id.charAt(0))
    level.innerText = ''
}
// בעת טעינה
function load() {
    let f = sessionStorage.getItem('f1')
    // בודק אם במחסנית שמור משתמש חדש 
    if (f == 'false')
        // שולח לפןנקציה מתאימה
        signIn()
    // אחרת- שולח לפונקציה מתאימה
    else
        defination()
}
// פונקציית הרשמה למשתמש חדש
function signIn() {
    //   label יוצר תגיות קלט ןתגיות 
    // של שם, כתובת, טלפון
    let h = document.getElementsByTagName('h2')[0]
    h.innerText = 'sign in'
    let allD = document.getElementById('sign')
    let d1 = document.createElement('div')
    d1.className = 'inputBox'
    allD.appendChild(d1)
    let u = document.createElement('input')
    u.id = 'userName'
    u.addEventListener('blur', del)
    d1.appendChild(u)
    let l1 = document.createElement('label')
    l1.id = 'u'
    l1.innerText = 'userName'
    d1.appendChild(l1)
    let d2 = document.createElement('div')
    d2.className = 'inputBox'
    allD.appendChild(d2)
    let p = document.createElement('input')
    p.id = 'phone'
    p.addEventListener('blur', del)
    d2.appendChild(p)
    let l2 = document.createElement('label')
    l2.id = 'p'
    l2.innerText = 'phone'
    d2.appendChild(l2)
    let d3 = document.createElement('div')
    d3.className = 'inputBox'
    allD.appendChild(d3)
    let a = document.createElement('input')
    a.id = 'adress'
    a.addEventListener('blur', del)
    d3.appendChild(a)
    let l3 = document.createElement('label')
    l3.id = 'a'
    l3.innerText = 'adress'
    d3.appendChild(l3)
    // כפתור השליחה
    let b = document.getElementById('send')
    // מוסיף לכפתור זה אירוע
    b.addEventListener('click', saveDetails)
    document.body.addEventListener('keypress', enter)


}
// שמירת פרטי המשתמש החדש
function saveDetails() {
    // ביטול הפעולה הדפולטיבית
    event.preventDefault()
    // קליטה מהמחסנית
    let arr = localStorage.getItem('arrUsers')
    let email = sessionStorage.getItem('userEmail')
    let pass = sessionStorage.getItem('userpass')
    //  קליטה מהקלט בדף זה
    let name = document.getElementById('userName').value
    let phone = document.getElementById('phone').value
    let adress = document.getElementById('adress').value
    let color = document.getElementById('myColor').value
    let usersArr = JSON.parse(arr)
    // שמירה במחסנית את הצבע שבחר המשתמש למשחק זה
    sessionStorage.setItem('myColor', color)
    //  כדי ליצור שם משתמש ייחודי count שליפה מהמחסנית את ה
    let cUsers = +localStorage.getItem('count')
    let p = []
    // המשתמש החדש
    let newUser = {
        email: email,
        password: pass,
        name: name,
        phone: phone,
        adress: adress,
        pointWin: 0

    }
    // המרה למחרוזת
    let uJson = JSON.stringify(newUser)
    debugger
    if(cUsers==1){
               localStorage.setItem('winner',uJson)
                let d=new Date()
               let d1=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
               localStorage.setItem('dateWin',d1)

    }
    // קידום האנדקס
    localStorage.setItem('count', ++cUsers)
    // הוספה למערך
    usersArr.push(newUser)
    // שמירת המערך
    localStorage.setItem('arrUsers', JSON.stringify(usersArr))
    sessionStorage.setItem('currentUser', uJson)
    // פתיחת המשחק
    window.location = "../html/game.html"
}
// שינוי הגדרות למשתמש קיים
function defination() {
    // תפיסת כפתור השליחה
    let b = document.getElementById('send')
    // הוספת אירןע עדכון
    b.addEventListener('click', update)
    document.body.addEventListener('keypress', enter)

}


//enter שולח אותו לפונקציה שמתבצעת אם לוחצים על כפתור ה enter אם לחץ על 
function enter() {
    if (event.keyCode == 13)
    if(sessionStorage.getItem('f1')=='false')
         saveDetails()
    else
        update()
}

// עדכון הגדרות
function update() {
    // ביטול הפעולה הדפולטיבית
    event.preventDefault()
    // שליפת הערך שנבחר כצבע
    let color = document.getElementById('myColor').value
    // שמירה במחסנית
    sessionStorage.setItem('myColor', color)
    // פתיחת המשחק
    window.location = "../html/game.html"
}
