function convertRestaurantsToCategories(restList) {
  const catArray = []
  const result = []
  for (let i = 0; i < restList.length; i += 1){
    catArray.push(restList[i].category);
  }

  for (let i = 0; i < catArray.length; i += 1){
    if (!result[catArray[i]]) {
      result[catArray[i]] = 0;
    }
    result[catArray[i]] += 1;
  }

  const reply = Object.keys(result).map((category) => ({
    y: result[category],
    label: category

  }))
  console.log('reply',reply);
  return reply;

};


function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Resturants by Category',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [{ startValue: 40, endValue: 50, color: "orange", type: "zigzag"},
                                   { startValue: 90, endValue: 100, color: "orange", type: "zigzag"},
                                   { startValue: 140, endValue: 180, color: "orange", type: "zigzag"}

      
        
      ]} 
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});