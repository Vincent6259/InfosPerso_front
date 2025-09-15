export const getUserId = (): number => {
    const cookie = document.cookie
      .split(";")
      .find((str) => str.includes("access"))
      ?.substring(7);
    if(!!cookie) {
      return JSON.parse(window.atob(cookie.split(".")[1])).sub
    }
    else return 0
}