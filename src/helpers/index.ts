export const colors = {
	grey: "#f5f6f7",
	darkGrey: "#999",
	black: "#444",
	darkBlack: "#101010",
	white: "#ffffff",
	green: "#F4FFE6",
	darkGreen: "#96D14B",
	red: "#FFD2C9",
	darkRed: "#FF5733",
	blue: "#BFEEFF",
	darkBlue: "#4BACD1",
};

export const shuffle = array => [...array].sort(() => Math.random() - 0.5);

export const formatAddress = (address, l = 6) => `${address.slice(0, l+2)}...${address.slice(address.length-l, address.length)}`

export const formatNumber = number => Math.floor(number*100)/100;

export const validateInputAddresses = address => (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));

export const formatAmount = amount => parseFloat(amount.replace(",","."));

export const hexEncode = (str) => {
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

export const hexDecode = (hex) => {
    var j;
    var hexes = hex.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

export const formatDate = date => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
