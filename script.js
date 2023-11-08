const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Apple Macbook Pro" },
  { minDegree: 31, maxDegree: 90, value: "Iphone 15" },
  { minDegree: 91, maxDegree: 150, value: "Samsung S23 Ultra" },
  { minDegree: 151, maxDegree: 210, value: "Microsoft Surface X" },
  { minDegree: 211, maxDegree: 270, value: "Meta Quest 3" },
  { minDegree: 271, maxDegree: 330, value: "X-box" },
  { minDegree: 331, maxDegree: 360, value: "Apple Macbook Pro" },
];

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
  "green",
  "teal",
  "orange",
  "red",
  "lightblue",
  "indigo",
];

let myChart = new Chart(wheel, {
  
  plugins: [ChartDataLabels],
  
  type: "pie",
  data: {
    
    labels: ["Iphone 15", "Apple Macbook Pro", "X-box", "Meta Quest 3", "Microsoft Surface X", "Samsung S23 Ultra"],
    
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      
      tooltip: false,
      legend: {
        display: false,
      },
      
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 12 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>You Won: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};


let count = 0;

let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  
  let rotationInterval = window.setInterval(() => {
    
   
    myChart.options.rotation = myChart.options.rotation + resultValue;
    
    myChart.update();
    
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});