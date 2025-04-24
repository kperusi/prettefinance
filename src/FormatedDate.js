export const FormatedDate = (date) => {

  const newDate = new Date(date).toDateString().slice(3).split(" ");

  return newDate[1] +' '+ newDate[2] + "," +' ' + newDate[3];
};
