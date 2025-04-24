export const NextPage=(data,dataPerPage,currentPage)=>{
let numberOfPages = Math.ceil(data.length/dataPerPage)
let lastIndex =currentPage*dataPerPage
let startIndex =lastIndex-dataPerPage

return {numberOfPages,lastIndex,startIndex}
}