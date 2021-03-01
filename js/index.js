// date variables
const dateObj = new Date;
const [date, month, year] = [dateObj.getUTCDate(), dateObj.getMonth(), dateObj.getUTCFullYear()];
const fullDate = [date, month, year]

// DOM selectors
const dateSelector = document.getElementById('cycleDate');
const monthSelector = document.getElementById('cycleMonth');
const yearSelector = document.getElementById('cycleYear');
const circle = document.getElementById('moon');
const div = document.getElementById('right');

// from https://gist.github.com/john-doherty/2ad94360771902b16f459f590b833d44
function trimSvgWhitespace() {
    // get all SVG objects in the DOM
    var svgs = document.getElementsByTagName("svg");
    // go through each one and add a viewbox that ensures all children are visible
    for (var i=0, l=svgs.length; i<l; i++) {
      var svg = svgs[i],
          box = svg.getBBox(), // <- get the visual boundary required to view all children
          viewBox = [box.x, box.y, box.width, box.height].join(" ");
      // set viewable area based on value above
      svg.setAttribute("viewBox", viewBox);
    }
  }
trimSvgWhitespace();

if (div) {
    div.innerHTML = fullDate;
}

// moon cycle calculating algorythm found on: http://www.ben-daglish.net/moon.shtml
// returns values between 0 and 29
function moonCycle (year, month, day) {
    let r = year % 19;
    if (r > 9) {
        r -= 19;
    }
    r = ((r * 11) % 30) + month + day;
    if (month < 3) {
        r += 2;
    }
    r -= ((year < 2000) ? 4 : 8.3);
    r = Math.floor(r + 0.5) % 30;
    return (r < 0) ? r + 30 : r;
}

// modal offset of moon svg 
function moonOffset (year, month, day) {
    const pixelOffsetIncrement = 200 / 15;
    // let cyclePhase = moonCycle(year, month, date);
    let cyclePhase = moonCycle(year, month, day);
    if (cyclePhase > 15) {
        cyclePhase = 15 - (cyclePhase - 15);
    } 
    return Math.round(cyclePhase * pixelOffsetIncrement);
}

// modify moon position 
dateSelector.oninput = () => {
    console.log(dateSelector.value);
    if (circle) {
        circle.style.left = `calc(60% + ${moonOffset(yearSelector.value, monthSelector.value, dateSelector.value) - 200}px)`;
        console.log(moonOffset(year, month, dateSelector.value));
    }
}

monthSelector.oninput = () => {
    console.log(dateSelector.value);
    if (circle) {
        circle.style.left = `calc(60% + ${moonOffset(yearSelector.value, monthSelector.value, dateSelector.value) - 200}px)`;
        console.log(moonOffset(year, month, dateSelector.value));
    }
}

yearSelector.oninput = () => {
    console.log(dateSelector.value);
    if (circle) {
        circle.style.left = `calc(60% + ${moonOffset(yearSelector.value, monthSelector.value, dateSelector.value) - 200}px)`;
        console.log(moonOffset(year, month, dateSelector.value));
    }
}

