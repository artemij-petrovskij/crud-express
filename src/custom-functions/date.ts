export default function (d = new Date): string {
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('.')
};