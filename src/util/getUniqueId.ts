export const getUniqueId = () => {

    const date = new Date();

    const randomNumber = Math.floor(Math.random() * 1000);

    return `${date.getTime()}-uniqueu-${randomNumber}`;
}