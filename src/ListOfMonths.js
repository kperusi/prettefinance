export const ListOfMonths=(year)=>{
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const monthsArrAy = [
        "All",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      if(year>currentYear){
        return []
      }
      else if(year<currentYear){
        return monthsArrAy
      }
      else{
        return monthsArrAy.slice(0,currentMonth+2)
      }
}