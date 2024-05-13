import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import flatpickr from "flatpickr";
import chart01a from "./components/chart-01a";
import chart01b from "./components/chart-01b";
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
    queryDates[myID] = selectedDates;
    // console.log(myID);
  },
});

//Live mode init kasi wala pa
const liveSelector = document.querySelectorAll(".live");
liveSelector.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Live mode not implemented yet, sorry");
  });
});

//Log out handler
const logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
  localStorage.removeItem("account");
  window.location.href = "index.html";
});

// Demo accounts
let accounts = [
  {
    email: "Regulatory@bogies.com",
    password: "SSL124DWyn1",
    username: "RegulatorPerson",
    role: "Regulatory",
  },
  {
    email: "Concessionaire@bogies.com",
    password: "SSL124DWyn2",
    username: "ConcessionPerson",
    role: "Concessionaire",
  },
  {
    email: "Consumer1@bogies.com",
    password: "SSL124DWyn3",
    username: "Consumer1",
    role: "Consumer",
  },
  {
    email: "Consumer2@bogies.com",
    password: "SSL124DWyn4",
    username: "Consumer2",
    role: "Consumer",
  },
  { email: "1", password: "1", username: "Tester", role: "Testyman" },
];

//load all graphs
const loadGraphs = () => {
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
};

// Document Loaded
window.addEventListener("DOMContentLoaded", () => {
  const account = JSON.parse(localStorage.getItem("account"));

  // There's an account logged in
  if (account) {
    loadGraphs();
    console.log(account);
    // alert(`An account called ${account.username} is logged in!`);
    const accountIcon = document.getElementById("accountIcon");
    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");
    const WSN1 = document.getElementById("WSN1");
    const WSN2 = document.getElementById("WSN2");
    const WSN3 = document.getElementById("WSN3");
    const WSN4 = document.getElementById("WSN4");
    const WSN5 = document.getElementById("WSN5");

    accountIcon.classList.remove("hidden");
    userRole.innerText += account.role;
    userName.innerText += account.username;

    switch (account.username) {
      case "RegulatorPerson":
        WSN3.classList.add("hidden");
        WSN4.classList.add("hidden");
        WSN5.classList.add("hidden");
        break;

      case "ConcessionPerson":
        WSN4.classList.add("hidden");
        WSN5.classList.add("hidden");
        break;

      case "Consumer1":
        WSN1.classList.add("hidden");
        WSN2.classList.add("hidden");
        WSN3.classList.add("hidden");
        WSN5.classList.add("hidden");
        break;

      case "Consumer2":
        WSN1.classList.add("hidden");
        WSN2.classList.add("hidden");
        WSN3.classList.add("hidden");
        WSN4.classList.add("hidden");
        break;

      default:
        break;
    }

    // There's no account logged in
  } else {
    // alert("no account");
    const signIn = document.getElementById("signInSubmit");
    const inpEmail = document.getElementById("signInEmail");
    const inpPass = document.getElementById("signInPass");
    let emailValue;
    let passValue;

    inpEmail.addEventListener("input", () => {
      emailValue = inpEmail.value;
    });
    inpPass.addEventListener("input", () => {
      passValue = inpPass.value;
    });

    signIn.addEventListener("click", (e) => {
      e.preventDefault();
      let allowed = false;
      accounts.forEach((item) => {
        if (emailValue === item.email) {
          if (passValue === item.password) {
            allowed = true;
            localStorage.setItem("account", JSON.stringify(item));
            switch (item.username) {
              case "RegulatorPerson":
                window.location.href = "WSN1.html";
                break;
              case "ConcessionPerson":
                window.location.href = "WSN1.html";
                break;
              case "Consumer1":
                window.location.href = "WSN4.html";
                break;
              case "Consumer2":
                window.location.href = "WSN5.html";
                break;
              default:
                window.location.href = "WSN1.html";
                break;
            }
          }
        }
      });
      if (!allowed) {
        alert("You are not welcome");
      }
      return false;
    });
  }
});

export default queryDates;
