// function to calcuate all week days in month less array of dates to exclude.
// return tuple of number of weekdays and string of dates

function getWeekDaysInMonth(month, year, excludeDates) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getMonth() === month) {
        if (
            date.getDay() !== 0 &&
            date.getDay() !== 6 &&
            excludeDates.indexOf(date.getDate()) === -1
        ) {
            days.push(new Date(date));
            // if day is friday push null to array to create a week break
            if (date.getDay() === 5) {
                days.push(null);
            }
        }
        date.setDate(date.getDate() + 1);
    }
    return [days.filter(d=>d!==null).length, days.map(function (day) {
        if (day === null) return "";
        const formattedDate = day.toISOString().slice(0, 10);
        const weekdayName = day.toLocaleDateString("en-US", { weekday: "short" });
        return `${formattedDate} (${weekdayName})`;
    }).join("\n")];
}


var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const currentYear = new Date().getFullYear();

rl.question("Enter month (1-12): ", function (month) {
    rl.question(`Enter year: (press enter to accept ${currentYear})`, function (year) {
        if (year === "") {
            year = currentYear;
        }
        rl.question(
            "Enter excluded dates (comma separated): ",
            function (excludedDates) {
                var excludeDates = excludedDates
                    .split(",")
                    .map(function (date) {
                        return parseInt(date);
                    });
                const [length, result] = getWeekDaysInMonth(month - 1, year, excludeDates);

                console.log(result);

                // console log in blue color
                console.log(`\x1b[34m%s\x1b[0m`, `Total Weekdays worked: ${length}`);

                //copy result to clipboard
                const { exec } = require("child_process");
                exec(`echo "${result}" | pbcopy`);

                console.log("Result copied to clipboard");
                rl.close();
            }
        );
    });
});
