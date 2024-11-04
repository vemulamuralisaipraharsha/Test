var current_emoji = "";

const Set_emoji = (emoji)=> {
    current_emoji = emoji;
}

const Get_emoji = () =>{
    return current_emoji;
}

export {Set_emoji, Get_emoji, current_emoji}