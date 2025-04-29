
// בעת יציאה מהסמן של כתיבת השם מוחק את הכותרת של השם
function del() {
    let e = document.getElementById('e')
    e.innerText = ''
}
// בעת יציאה מהפקד של כתיבת הסיסמה בודק את תקינות המייל והסיסמה
function chek() {
        // מוחק את כותרת הסיסמה
    let pas = document.getElementById('ps')
    pas.innerText = ''
    //  משתנים בוליאניים הבודקים כי הכתובת מייל והסיסמה תקינים
    // f1- בודק את תקינות המייל
    // f2- בודק את תקינות הסיסמה
    let f1 = true, f2 = true
    // קלט המייל
    let inp1 = document.getElementById('email')
    // קלט הסיסמה
    let pass1 = document.getElementById('pass')
    // הערך שכתוב בהם
    let inp = inp1.value
    let pass = pass1.value
    let p
    // אם הכתובת מייל לא תקינה
    if (inp.charAt(0) == '@' || inp.indexOf('@') == -1 || (inp.charAt(0) >= 0 && inp.charAt(0) <= 9)
        || inp.indexOf('@') > inp.indexOf('.') || inp.indexOf('@') + 1 == inp.indexOf('.') || inp.indexOf('.') == inp.length - 1 || inp.indexOf('.') == -1)
    //    inp='error'
    {
        // מרוקן את הערך הלא תקין
        inp1.value = ''
        //false הופך את המשתנה שבודק את תקינות המייל ל
        f1 = false
        // אם קיימת תגית ההערה
        if (document.getElementById('p') != null) {
            // מוסיף לה כיתוב
            document.getElementById('p').innerText = 'the email is not valid'
        }
        else {
            // אם לא קיימת התגית הזו
            // יוצר אותה ומוסיף אותה מתחת לשורת המייל
            p = document.createElement('span')
            let d = document.getElementsByClassName('inputBox')[0]
            p.innerText = 'the email is not valid'
            p.id = 'p'
            p.className = 'error'
            d.appendChild(p)
        }
    }
    // אם הכתובת מייל נכונה
    else {
        // אם תגית ההערה קיימת 
        if (document.getElementById('p') != null) {
            // מוחק את הכיתוב שלה
            document.getElementById('p').innerText = ''
        }

    }
    //

    //עובר על הסיסמה ובודק שכולה מורכבת ממספרים
    for (let i = 0; i < pass.length; i++) {
        // אם לא
        if (!(pass.charAt(i) >= 0 && pass.charAt(i) <= 9)) {
            //false הופך את המשתנה שבודק את תקינות הסיסמה 
            f2 = false
        }
    }
    // אם הסיסמה לא תקינה
    if (f2 == false) {
        // מרוקן אותה מהמסך
        pass1.value = ''
        // אם קיימת תגית ההערה
        if (document.getElementById('p1') != null) {
            // מוסיף לה כיתוב

            document.getElementById('p1').innerText = 'the password is not valid'

        }
         // אם לא קיימת התגית הזו
            // יוצר אותה ומוסיף אותה מתחת לשורת הסיסמה
        else {
            let p1 = document.createElement('span')
            let d1 = document.getElementsByClassName('inputBox')[1]

            p1.innerText = 'the password is not valid'
            p1.className = 'error'
            p1.id = 'p1'
            d1.appendChild(p1)
        }

    }
    // אם הסיסמה תקינה
    else {
        // אם קיימת תגית הערה
        if (document.getElementById('p1') != null) {
            // מרוקן אותה
            document.getElementById('p1').innerText = ''
        }

    }
// אם גם הכתובת וגם הסיסמה תקינים
    if (f1 && f2) {
        // תופס את כפתור השליחה
        let s = document.getElementById('send')
        // מוסיף אירוע של שמירה
        s.addEventListener('click', save1)
        // הוספת אירוע בעת לחיצת מקש
        document.body.addEventListener('keypress',enter)

    }

}
//enter שולח אותו לפונקציה שמתבצעת אם לוחצים על כפתור ה enter אם לחץ על 
function enter()
{
    if(event.keyCode==13)
    save1()
}
// פונקציית ששולחת לפונקצית שמירת נתונים
function save1() {
    // הערך של המייל
    let inp = document.getElementById('email').value
    // הערך של הסיסמה
    let pass = document.getElementById('pass').value
    // שליחה לפןנקצית שמיקה
    save(inp, pass)
}
// פונקצית שמירת נתונים
function save(email, pass) {  
    // מבטל את הפעולה הדפולטיבית שמרעננת את הדף
    event.preventDefault()
    // בודק אם המשתמש כבר קיים
    let flag = false
    //מציב אותו count אם לא קיים משתנה ה
    if (localStorage.getItem('count') == null)
        localStorage.setItem('count', 1)
    // שמירת משתמשים במערך
    let users = [];
    //אם לא קיים מערך משתמשים 
    if (localStorage.getItem('arrUsers') == null) {
        // יוצר מערך משתמשים
       localStorage.setItem('arrUsers', JSON.stringify(users))
    }
    else {
        //אם קיים שולף אותו מהמחסנית
        users = JSON.parse(localStorage.getItem('arrUsers'))
        // מעבר על מערך המשתמשים
        for (let i = 0; i < users.length; i++) {
            // אם קיים המשתמש קיים
            if (users[i].email == email) {
            //true הופך את המשתנה הבוליאני ל
                flag = true
                // אם הסיסמה תואמת
                if (users[i].password == pass) {
                    // שומר במחסנית את השחקן הנוכחי
                    sessionStorage.setItem('currentUser', JSON.stringify(users[i]))
                    // פותח את דף ההגדרות
                    window.location = "../html/sign.html"
                    // שומר במחסנית שהשחקן הנוכחי קיים במערכת
                    sessionStorage.setItem('f1', true)
                }
                // אם הסיסמה לא תואמת את המשתמש
                else {
                // אם קיימת תגית הערה
                    if (document.getElementById('p1') != null) {
                        // משנה לה כיתוב
                        document.getElementById('p1').innerText = 'the password is wrong'
                    }
                    // אם לא קיימת-יוצר אותה
                    else {
                        let p1 = document.createElement('span')
                        let d1 = document.getElementsByClassName('inputBox')[1]
                        p1.innerText = 'the password is wrong'
                        p1.className = 'error'
                        p1.id = 'p1'
                        d1.appendChild(p1)
                    }
                }
            }
        }
    }
    // אם המשתמש חדש
    if (flag == false) {
        // שומר את כתובת המייל ואת הסיסמה
        sessionStorage.setItem('userEmail', email)
        sessionStorage.setItem('userpass', pass)
        // פותח דף הרשמה 
        window.location = "../html/sign.html"
        // שומר שהמשתמש הנוכחי חדש
        sessionStorage.setItem('f1', false)

    }
}
