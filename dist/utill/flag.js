export const flag = (code) => code.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
