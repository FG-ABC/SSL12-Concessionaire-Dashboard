import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import chart01a from "./components/chart-01a";
import chart01b from './components/chart-01b';
import chart02a from "./components/chart-02a";
import chart02b from "./components/chart-02b";
import chart02c from "./components/chart-02c";
import chart03a from "./components/chart-03a";
import chart03b from "./components/chart-03b";
import chart03c from "./components/chart-03c";
import chart04a from "./components/chart-04a";
import chart04b from "./components/chart-04b";
import chart04c from "./components/chart-04c";
import chart05a from "./components/chart-05a";
import chart05b from "./components/chart-05b";
import chart05c from "./components/chart-05c";


Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();

var queryDates = {};
// Init flatpickr
flatpickr(".form-datepicker", {
  mode: "single",
  static: true,
  enableTime: true,
  enableSeconds: true,
  monthSelectorType: "static",
  dateFormat: "M j, Y H i S",
  prevArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
  nextArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
  onChange: (selectedDates, dateStr, instance) => {
    // eslint-disable-next-line no-param-reassign
    var myID = instance.element.id; 
    queryDates[myID] = (selectedDates);
    // console.log(myID);
  },

  });

//Live mode init kasi wala pa
const liveSelector = document.querySelectorAll(".live");
liveSelector.forEach((button)=>{
  button.addEventListener('click', () => {
    alert("Live mode not implemented yet, sorry");
  })
})


// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  chart01a();
  chart01b();
  chart02a();
  chart02b();
  chart02c();
  chart03a();
  chart03b();
  chart03c();
  chart04a();
  chart04b();
  chart04c();
  chart05a();
  chart05b();
  chart05c();
});

export default queryDates;