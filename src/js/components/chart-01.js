import ApexCharts from "apexcharts";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs,} from "firebase/firestore"; 
import { query, orderBy, where } from "firebase/firestore"; 

//Section: Configs
const firebaseConfig = {
  apiKey: "AIzaSyARF38KiuSgGrphoULSKslpgpY_Jz8EFzk",
  authDomain: "coe199-7c644.firebaseapp.com",
  databaseURL: "https://coe199-7c644-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coe199-7c644",
  storageBucket: "coe199-7c644.appspot.com",
  messagingSenderId: "689531537139",
  appId: "1:689531537139:web:fd3a37f44bbd964edf5986",
  measurementId: "G-Q4MPYJWKQK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const citiesRef = collection(db, "WSN1"); //Change WSN here

let start_date = new Date(2024, 3, 16, 16, 10, 0); //Date format: (year, month, day, hours, minutes, seconds)
let end_date = new Date(2025, 3, 16, 16, 11, 0);
let sensor = "Pressure"

//Section: functions
async function readFromDatabase(sensor, start_date, end_date){
  var Yvalues = [];
  var Xvalues = [];
  const querySnapshot = await getDocs(query(citiesRef, orderBy("time", "asc"), where("sensor", "==", sensor), where("time", ">=", start_date), where("time", "<=", end_date)));
  querySnapshot.forEach((doc) => {
    const date = new Date(doc.data().time.seconds * 1000);
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    Xvalues.push(date.toLocaleString("en-US", options));
    Yvalues.push(doc.data().value);
  });
  return [Xvalues,Yvalues];
};



// ===== chartOne
var chart01 = () => {
  const chartOneOptions = {
    series: [
      {
        name: "Pressure",
        data: [],
      },
    ],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },

      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    markers: {
      size: 0,
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 10,
    },
  };

  const chartSelector = document.querySelectorAll("#chartOne");

  if (chartSelector.length) {
    const chartOne = new ApexCharts(
      document.querySelector("#chartOne"),
      chartOneOptions
    );
    chartOne.render();
    
    const getDataButton = document.getElementById("getDataButton01");

    getDataButton.addEventListener('click', async function (e) {
      const data2 = await readFromDatabase(sensor, start_date, end_date);
      console.log(data2);
      chartOne.updateSeries([{
        data: data2[1]
      }]);

      chartOne.updateOptions({
        xaxis: {
          type: "category",
          categories: data2[0],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          }
        }
      })

    });
  }
};


export default chart01;
