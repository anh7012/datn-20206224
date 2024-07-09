export const handleSelectForm = (value,optionsSelect, key)=>{
    const req = optionsSelect.filter((e)=>{
        return e[key] === value
    })
   return req[0]
}