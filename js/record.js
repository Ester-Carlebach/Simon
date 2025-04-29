//בעת טעינה
function myC()
{
    // שולף את השיאן
    let c1=localStorage.getItem('winner')
    let c=JSON.parse(c1)
    let h=document.getElementsByTagName('span')[0]
    let p=document.getElementsByTagName('span')[1]
    let d=document.getElementsByTagName('span')[2]
    h.innerText='Winner:'+c.name
    p.innerText='Score:'+c.pointWin
    d.innerText='Date:'+localStorage.getItem('dateWin')
    
}