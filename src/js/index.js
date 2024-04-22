import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import chart01 from "./components/chart-01";
import chart02 from './components/chart-02';

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

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  chart01();
  chart02();
});

export default queryDates;