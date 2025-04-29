        function onloud()
{
    // תופס את התגית עליה נכתב הנקודות
    let s=document.getElementsByClassName('score')[0]
    // כותב את מספר הנקודות
    s.innerText='score: '+sessionStorage.getItem('score')
    // יצירת תגית השיא
    let c=document.createElement('p')
    let h=document.getElementsByTagName('header')[0]
    // כיתוב השיא
    c.innerText='your c:'+JSON.parse(sessionStorage.getItem('currentUser')).pointWin
    // הוספה לעמוד
    h.appendChild(c)
}
// בעת לחיצה על משחק חדש
function loc()
{
    // פותח את דף המשחק
    window.location="../html/game.html"
}
