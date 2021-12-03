export function budgetCalc(points) {
  const totalBudget = points.map((point) => {
    return point.price;
  });

  let sum = 0;

  totalBudget.forEach(price => {
    if (price != undefined) {
      sum += price.length;
    }
  });

  const average = sum / totalBudget.length;
  
  if (average % 1 == 0) {    
    return ('$'.repeat(average));
  } else {    
    return `${('$'.repeat(Math.floor(average)))} - ${('$'.repeat(Math.ceil(average)))}`;
  }
}