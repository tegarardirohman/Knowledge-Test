import { parseCookies } from "nookies";

export const getCookie = (name: string) => {
    const cookies = parseCookies();
    return cookies[name];
};