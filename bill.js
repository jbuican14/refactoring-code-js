module.exports = function statement(invoice, plays) {  console.log(`data :: \n`);console.log(invoice)
 console.log(plays); console.log(' ')
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `statement for ${invoice.customer} 🧜‍♀️\n`;

  result += '------------------------ \n';  // console.log(result.performances);
  const format = new Intl.NumberFormat('en-US', 
  {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2
  }).format;

// CALC
  function amountFor(aPerformance) {
  let result = 0;
 
  switch(playFor(aPerformance).type) {
    case 'tragedy':
    result = 40000;
    if(aPerformance.audience > 30) {
      result += 1000 * (aPerformance.audience - 30); 
    }
    break;
    case 'comedy': 
    result = 30000;
    if(aPerformance.audience > 20) {
      result += 1000 + 500 * (aPerformance.audience - 20); 
    }
    result += 300 * aPerformance.audience; 
    break;
    default:
    throw new Error(`unknown type: ${playFor(aPerformance).type}`);
  }
  return result; 
}

// GET Play
function playFor(aPerformance) {
  return plays[aPerformance.playID]
}
  // loop to each performance
  for(let perf of invoice.performances) {
    // let thisAmount = amountFor(perf); 

    // add volume volume volumeCredits
    volumeCredits += Math.max(perf.audience - 30, 0); 

    // add extra** credit for every 10 comedy attendees
    if('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // PRINT line for this order
    result += `${playFor(perf).name} :: ${format(amountFor(perf)/100)}
    (${perf.audience} seats) \n`;
    totalAmount += amountFor(perf);

  }
  result += '\n';
  result += `Amount owned is :: ${format(totalAmount/100)}\n`;
  result += ` You earned ${volumeCredits} credits 🎊🎊🎊\n`;

  return result; 
}
