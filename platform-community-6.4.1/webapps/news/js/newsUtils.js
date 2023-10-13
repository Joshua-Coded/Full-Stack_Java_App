export function convertDate(date) {
  return `${
    pad(date.getMonth()+1) }/${
    pad(date.getDate()) }/${
    pad(date.getFullYear()) } ${
    pad(date.getHours())  }:${
    pad(date.getMinutes())  }:${
    pad(date.getSeconds()) }`;
}

export function pad(n) {
  return n < 10 && `0${n}` || n;
}