// אם לוחץ על התנתקות
function openDisconnection()
{
   let c=confirm('are you sure that you want to disconnection')
  //  אם לחץ שרוצה להתנתק
   if(c)
  {
    // תפיסת מערך המשתמשים 
    let arrUser=JSON.parse(localStorage.getItem('arrUsers'))
    // המשתמש הנוכחי
    let user = JSON.parse(sessionStorage.getItem('currentUser'))
  // מיקום המשתמש הנוכחי במערך
    let i=arrUser.findIndex(x=>x.email==user.email)
  //  מחיקה ממערך המשתמשים
    arrUser.splice(i,1)
    // שמירה מחדש של מערך המשתמשים
   localStorage.setItem('arrUsers',JSON.stringify(arrUser))
 
    let c=JSON.parse(localStorage.getItem('winner'))
    if(user.email==c.email)
    {
      let arr=JSON.parse(localStorage.getItem('arrUsers')),maxUser=arr[0]
      for(let i=1;i<arr.length;i++)
      {
           if(arr[i].pointWin>maxUser.pointWin)
           {
            maxUser=arr[i]
           }
      }
      localStorage.setItem('winner',JSON.stringify(maxUser))
    }
  }
   //  ניתוב לדף הכניסה
   window.location='../html/enter.html'

}
// ניתוב לדף הוראות
function openInstruction(){
    window.location='../html/instruction.html'
}
// ניתוב לדף שיאים
function openRecords()
{
    window.location='../html/winner.html'
}
// ניתוב לדף המשחק
function openGame()
{
    window.location='../html/game.html'
}