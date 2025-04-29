
// מס שלב
let n = 0
//מערך צבעי הסיימון
let color = ['red', 'green', 'yellow', 'blue']
// מערך בחירות הסיימון
let level = []//new Array(10)
// מערך בחירות אישיות
let choice = []//new Array(10)
//  עד לשלב שעליו להדליק level מקדם ה-
let step = 0;
// המיקום של הכפתור הנוכחי שלחץ במערך הבחירות
let currentIndex = 0;
// מס הנקודות הנוכחי
let point = 0
// מערך המשתמשים
let arrUser = JSON.parse(localStorage.getItem('arrUsers'))
// המשתמש הנוכחי
let user = JSON.parse(sessionStorage.getItem('currentUser'))
// תוית בה כתוב מס' הנקודות
let sc = document.getElementById('sc')
// בעת טעינת הדף
function load() {
    // כל כפתורי המשחק
    let allSec = document.getElementsByTagName('section')
    // יוצר לכל צבע בסיימון אינדקס
    for (let l = 0; l < allSec.length; l++) {
        allSec[l].setAttribute('data-i', l)
    }
    // תוית בה כתוב שם השחקן
    let p = document.getElementById('player')
    // שם המשתמש הנוכחי
    let name = user.name
    // הצבע הנבחר
    let col = sessionStorage.getItem('myColor')
    // הצבה את שם המשתמש
    p.innerText = 'player:' + name
    // כותרת המשחק
    let h1 = document.getElementById('simon')
    // צביעה ע"פ הצבע הנבחר
    h1.style.color = col
}
// הכפתור המרכזי הלבן
let st = document.getElementById('display')
//start בעת לחיצה על כפתור ה
// בתחילה הפונקציה מציבה את המספר הראשון
function start() {
    // הפיכת הכפתור ללא מאופשר
    st.disabled = true
    // בחירת מספר באופן רנדומלי
    let num1 = (Math.floor(Math.random() * 4))
    // הוספת המספר למערך בחירות הסיימון
    level.push(num1);
    // שליחה לפונקציה שמאירה את הכפתורים ע"פ הבחירות
    light()
}
// הפונקציה עובדת על מערך בחירות הסיימון 
// בכל פעם עוברת על הכפתור ומאירה אותו
function light() {

    for (let i = 0; i < level.length; i++) {
        // תפיסת הדיב שאמור להאיר
        let d = document.getElementById(color[level[i]])
        //בחזרה Class ומחליפה את ה Class הפונקציה מאירה את הכפתור הניכחי ע"י החלפת 
        setTimeout(() => {
            d.className = 'active_' + d.getAttribute('data-i')

            setTimeout(() => {
                d.className = 'pad'
            }, 100 + (150))
        }, 500 * (i + 1))
    }
}
// תפיסת התגית בו נכתב השלב
let text = document.getElementsByTagName('p')[0]
let count = text.innerText.substring(0, 1)
let e = text.innerText.substring(1)
// אם לחץ על מספר מעביר אותו לפונקציה עם המספר עליו לחץ
function num() {

    if (event.keyCode == 49)
        put1(0)
    if (event.keyCode == 50)
        put1(1)

    if (event.keyCode == 51)
        put1(2);
    if (event.keyCode == 52)
        put1(3)
}
// אם לחץ על חץ מעביר אותו לפונקציה עם ערך החץ עליו לחץ 
function key() {
    if (event.keyCode == 38)
        put1(0)
    if (event.keyCode == 39)
        put1(1)

    if (event.keyCode == 40)
        put1(2);
    if (event.keyCode == 37)
        put1(3)
}
//שעל הכפתור Attribute אם לחץ על הכפתור מעביר אותו לפונקציה עם ערך  
function put() {
    put1((+event.currentTarget.getAttribute('data-i')))
}
//מציב את בחירת המשתמש במערך בחירות
function put1(value) {
    choice.push(value);
    // בו כתוב כמה לחיצות לחץ מתוך השלב text מקדם את הכיתוב על ה
    text.innerText = ++count + '/' + level.length
    // תופס את הדיב שנלחץ
    let choiseDiv = document.getElementById(color[choice[currentIndex]])
    // ןמאיר אותו
    choiseDiv.className = 'active_' + choiseDiv.getAttribute('data-i')
    setTimeout(() => {
        choiseDiv.className = 'pad'
    }, 200);
    // שולח לפונקציית בדיקה עם האנדקס הנוכחי והכפתור עליו לחצו
    chek(currentIndex, value);


}
// בדיקה האם הלחיצה של המשתמש נכונה
function chek(i, value) {
    // אם היא לא נכונה
    if (level[i] != choice[i]) {
        // שומר את הנקודות שצבר עד כאן
        sessionStorage.setItem('score', point)
        // אם הנקודות יותר גדולות ממה שצבר עד עכשיו
        if (point > user.pointWin) {
            // מעדכן את נקודות השיא שלו
            user.pointWin = point
            // תופס את המיקום של המשתמש הנוכחי במערך המשתמשים
            let i1 = arrUser.findIndex(x => x.email == user.email)
            // ומציב מחדש את המשתמש המעודכן במערך
            arrUser[i1] = user
            let c = JSON.stringify(user)
            // שמירה מחדש את העדכונים
            sessionStorage.setItem('currentUser', c)
            localStorage.setItem('arrUsers', JSON.stringify(arrUser))
        }
        // אם עבר את נצחן השיא
        let c = localStorage.getItem('winner')

        let w = JSON.parse(c)
        console.log(c.pointWin);
        if (point > w.pointWin) {
            let d = new Date()
            let d1 = d.getDate() + "/" +(d.getMonth()+1) + "/" + d.getFullYear()
            localStorage.setItem('dateWin', d1)
            // נשלח לדף שיא
            localStorage.setItem('winner', JSON.stringify(user))
            setTimeout(() => {  window.location = '../html/winner.html'}, 500)

        }
        // אם לא הגיע לשיא
        else {
            // השמע של הכשלון
            let e = document.getElementById("error")
            // הדלקה 
            e.play();
            // שליחה לדף כשלון
            setTimeout(() => { window.location = '../html/error.html' }, 500)

        }

    }
    else {
        //    אם לחץ על כפתור נכון
        // תופס את שמע הכפתורים
        let c = document.getElementById("click")
        //(לכל אחד צליל שונה) הניתוב הוא ע"פ הכפתור
        c.src = "../sounds/c_" + value + ".mp3"
        // הפעלת שמע
        c.play()
        // מעלה את הנקודות
        point++
        // מעדכן על המסך
        sc.innerText = 'score:' + point
        // אנדקס מתקדם
        currentIndex++;
        if (level.length == choice.length) {
            if (level.length % 5 == 0) {
                n++
                let h = document.getElementById('next')
                h.innerText = 'wow!!!! you finush level  ' + n + '!!!!!!!'
                setTimeout(() => { h.innerText = '' }, 2000)
            }
            //אם סיים ועדין לא הגיע לסוף המשחק
            // מוסיף נקודות כאורך השלב
            point+=level.length
            // כותב את הנקודות על המסך
            sc.innerText = 'score:' + point
            //    
            count = 0
            // מרוקן את בחירות המשתמש
            choice = [];
            // האנדקס הנוכחי מתאפס
            currentIndex = 0;
            // נבחר מס רנדומלי נוסף
            let num1 = (Math.floor(Math.random() * 4))
            //    מוסיף לבחירות הסיימון
            level.push(num1);
            // שולח לפונקציה שמאירה אותו
            light();
            // if(level.length%5==0)
            // {
            //     window.location = '../html/win.html'
            //     setTimeout(()=>{window.close()},2000)

            // }
            // אם הגיע לסיום המשחק
            if (level.length == 100) {
                //   נוסף לו 20 
                point += 20
                // כותב במסך
                sc.innerText = 'score:' + point
                //    שומר את הנקודות
                sessionStorage.setItem('score', point)
                // פותח דף נצחון
                window.location = '../html/win.html'
                if (point > user.pointWin) {
                    // מעדכן את נקודות השיא שלו
                    user.pointWin = point
                    // תופס את המיקום של המשתמש הנוכחי במערך המשתמשים
                    let i1 = arrUser.findIndex(x => x.email == user.email)
                    // ומציב מחדש את המשתמש המעודכן במערך
                    arrUser[i1] = user
                    let c = JSON.stringify(user)
                    // שמירה מחדש את העדכונים
                    sessionStorage.setItem('currentUser', c)
                    localStorage.setItem('arrUsers', JSON.stringify(arrUser))
                }
                if (point > w.pointWin) {
                    let d = new Date()
                    let d1 = d.getDate() + "/" +(d.getMonth()+1) + "/" + d.getFullYear()
                    localStorage.setItem('dateWin', d1)
                    // נשלח לדף שיא
                    localStorage.setItem('winner', JSON.stringify(user))
                    window.location = '../html/winner.html'
        
                }

            }

        }
    }
}
