module.exports = function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `statement for ${invoice.customer} 🧜‍♀️\n`;

  result += '------------------------ \n'; 

  // console.log(result.performances);

  const format = new Intl.NumberFormat('en-US', 
  {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2
  }).format;

  // loop to each performance
  for(let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch(play.type) {
      case 'tragedy':
      thisAmount = 40000;
      if(perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30); 
      }
      break;

      case 'comedy': 
      thisAmount = 30000;
      if(perf.audience > 20) {
        thisAmount += 1000 + 500 * (perf.audience - 20); 
      }
      thisAmount += 300 * perf.audience; 
      break;

      default:
      throw new Error(`unknown type: ${play.type}`);
    }

    // add volume volume volumeCredits
    volumeCredits += Math.max(perf.audience - 30, 0); 

    // add extra** credit for every 10 comedy attendees
    if('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);


    // PRINT line for this order
    result += `${play.name} :: ${format(thisAmount/100)}
    (${perf.audience} seats) \n`;
    totalAmount += thisAmount;

  }
  result += '\n';
  result += `Amount owned is :: ${format(totalAmount/100)}\n`;
  result += ` You earned ${volumeCredits} credits 🎊🎊🎊\n`;

  return result; 
}
