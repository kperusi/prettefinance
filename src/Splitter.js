export const Splitter=(values)=>{
   const number=values?.toLocaleString('en-US',{
    useGrouping:true,
    style:'decimal'
   }).replace(/,/g, ' ');
   
    return number;
}