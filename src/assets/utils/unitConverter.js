import numeral from 'numeral';

let formatNumber = (number) => {
  return numeral(number).format('0.0a');
}

let reformat = (formattedNumber) => {
  let formattedNumberWithUppercase = formattedNumber.replace(/[kmb]$/, match => match.toUpperCase());
  if(formattedNumberWithUppercase.slice(-1) === '0') formattedNumberWithUppercase = formattedNumberWithUppercase.slice(0,-2)
  return formattedNumberWithUppercase;
}

export {formatNumber, reformat}