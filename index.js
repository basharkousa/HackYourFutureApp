const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function finish() {
    rl.close();
}

function ask(question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
}

function printMessage(val){
    console.log(val);
}

async function main() {

    //Introduction
    printMessage('HackYourFuture Trainee Hub');
    printMessage('Your go-to place for all HackYourFuture resources for trainees\n');

    await ask("APPLY NOW - Press Enter to continue...");
    const studyHours = Number(await ask("How many hours can you study per week? "))
    printMessage(studyHours)
    //We close the input when the app finished
    finish();
}

main();

