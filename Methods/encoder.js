module.exports = (stuff)=>{
    const Base62_chars = '1234567890qwertyuioplkjhgfdsaxcvbnmQWERTYUIOPLKJHGFDSAXCVBNM'
    let convUUID = stuff.replace(/-/g,"")
    convUUID = BigInt('0x'+ convUUID)
    let encoded = ''
    const base = BigInt(Base62_chars.length)
    while(convUUID > 0n){
        rem = convUUID % base
        encoded += Base62_chars[Number(rem)]
        convUUID = convUUID / base
    }
    cor = encoded.replace(/undefined/g,"")
    let returned = ""
    for(i = 0;i < 7;i++){
         current = cor[Math.floor(Math.random() * (cor.length))]
        if(returned.includes(current)){
            i -= 1
            continue
        }
        returned += current
    }
    return returned
}