import ApexCharts from "apexcharts";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, orderBy, where, limit } from "firebase/firestore";
import queryDates from "../index";

//Section: Configs
const firebaseConfig = {
  apiKey: "AIzaSyARF38KiuSgGrphoULSKslpgpY_Jz8EFzk",
  authDomain: "coe199-7c644.firebaseapp.com",
  databaseURL:
    "https://coe199-7c644-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coe199-7c644",
  storageBucket: "coe199-7c644.appspot.com",
  messagingSenderId: "689531537139",
  appId: "1:689531537139:web:fd3a37f44bbd964edf5986",
  measurementId: "G-Q4MPYJWKQK",
};

//Section: Firebase init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const citiesRef = collection(db, "WSN2"); //Change WSN here

//Section: functions
async function readFromDatabase(sensor, start_date, end_date) {
  var Yvalues = [];
  var Xvalues = [];
  const querySnapshot = await getDocs(
    query(
      citiesRef,
      orderBy("time", "asc"),
      where("sensor", "==", sensor),
      where("time", ">=", start_date),
      where("time", "<=", end_date),
      limit(1000)
    )
  );
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
  return [Xvalues, Yvalues];
}

// ===== chartFour
var chart05 = () => {
  //Change chartname here
  const chartFiveOptions = {
    series: [
      {
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
      type: "line",
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
      max: 50,
    },
  };

  //
  const chartSelector = document.querySelectorAll("#chartFive"); //Change chart ID here

  if (chartSelector.length) {
    const chartFive = new ApexCharts( //change chartnumber here
      document.querySelector("#chartFive"),
      chartFiveOptions //change options
    );
    chartFive.render(); //change chart name

    const getDataButton = document.getElementById("getDataButton05"); //Change button ID here
    getDataButton.addEventListener("click", async function (e) {
      const sensor = "Rate"; //Change sensor
      try {
        const start_date = queryDates["WSN2c1"][0]; //Change date ID
        const end_date = queryDates["WSN2c2"][0]; //Change date ID
        console.log(start_date);
        console.log(end_date);
        if (end_date > start_date) {
          const [Xvals, Yvals] = await readFromDatabase(
            sensor,
            start_date,
            end_date
          );
          chartFive.updateSeries([
            {
              //Change chart
              name: "Rate", //Change type
              data: Yvals,
            },
          ]);
          chartFive.updateOptions({
            //Change Chart
            xaxis: {
              type: "category",
              categories: Xvals,
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
          });
        } else {
          alert("Start date must happen before end date!");
        }
      } catch (error) {
        console.log(error);
        alert("Please input start and end date first!");
      }
    });
  }
};

export default chart05;
