export const TruncateTex=(text,max)=>{
    if(text==''){
        return
    }
   else {
    return text.length>max?text.substring(0,max)+ '...':text
   }
}