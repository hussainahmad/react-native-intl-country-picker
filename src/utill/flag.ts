export const flag = (code: string) => code.replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
