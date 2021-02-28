// date variables
const dateObj = new Date;
const [date, month, year] = [dateObj.getUTCDate(), dateObj.getMonth(), dateObj.getUTCFullYear()];
const fullDate = [date, month, year]

// DOM selectors
const dateSelector = document.getElementById('cycleDate');
const circle = document.getElementById('moon');
const div = document.getElementById('right')

dateSelector.oninput = () => {
    console.log(dateSelector.value);

    if (circle) {
        circle.style.left = `calc(60% + ${moonOffsetVar}px)`;
        console.log(moonOffsetVar);
    }
}

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

// WIP - needs to be converted to modal with 11 as the full moon and 0 and 29 as the new moon 
function moonOffset () {
    const pixelOffsetIncrement = 200 / 15;
    // let cyclePhase = moonCycle(year, month, date);
    let cyclePhase = moonCycle(year, month, dateSelector.value);
    if (cyclePhase > 15) {
        cyclePhase = 15 - (cyclePhase - 15);
    } 
    return Math.round(cyclePhase * pixelOffsetIncrement);
}

let moonOffsetVar = moonOffset();


if (circle) {
    circle.style.left = `calc( 60%  + ${moonOffsetVar}px)`;
}
