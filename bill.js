module.exports = function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `statement for ${customer} \n`;
  const format = new Intl.NumberFormat('en-US', 
  {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2
  }).format;
}





