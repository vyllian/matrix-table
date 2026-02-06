export const generateAmount = ()=> {
    const min = 100;
    const max = 1000;
    return Math.floor(Math.random() * (max - min) + min);
}