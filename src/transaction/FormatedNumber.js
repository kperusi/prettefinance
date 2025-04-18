export const formatedNumber=(values)=>{
    let val = values.replace(/\W/g, "");
    let val2 = val.match(/(\w{0,3})?(\w{0,3})?(\w{0,3})?(\w{0,3})/);

    let result = "";
    if (val2[1]) {
      result = val2[1];
    }

    if (val2[2]) {
      result = result.concat(" " + val2[2]);
    }
    if (val2[3]) {
      result = result.concat(" " + val2[3]);
    }
    if (val2[4]) {
      result = result.concat(" " + val2[4]);
    }
    return result;
}