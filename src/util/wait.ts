export const wait = async (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}