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
function printMessage(val) {
    console.log(val);
}

function printCandidateReview(candidate) {
    printMessage("\nApplication Review:");
    printMessage("Name: " + candidate.candidateName);
    printMessage("Field of Interest: " + candidate.fieldOfInterest);
    printMessage("Experience Years: " + candidate.experienceYears);
    printMessage("Weekly Study Hours: " + candidate.weeklyStudyHours);
    printMessage("Motivation Level: " + candidate.motivationLevel);
    printMessage("English Level: " + candidate.englishLevel);
    printMessage("Laptop Available: " + candidate.laptopAvailability);
}

function submitApplication(answer) {
    if (answer === "yes") {
        printMessage("\nApplication submitted successfully!");
    } else {
        printMessage("\nApplication cancelled.");
    }
}
function calculateCandidateScore(candidate) {
    return candidate.weeklyStudyHours + candidate.experienceYears + candidate.motivationLevel;
}
function printCandidateScoreComparison(candidate, storedApplications) {
    const candidateScore = calculateCandidateScore(candidate);

    printMessage("\nCandidate Score:");
    printMessage(candidate.candidateName + " score: " + candidateScore);

    printMessage("\nStored Applications Scores:");

    for (const application of storedApplications) {
        const storedScore = calculateCandidateScore(application);
        printMessage(application.candidateName + " score: " + storedScore);
    }
}

async function main() {

    const storedApplications = [{
            candidateName: "Sara",
            fieldOfInterest: "Web Development",
            experienceYears: 1,
            motivationLevel: 8,
            weeklyStudyHours: 25,
            englishLevel: "B1",
            laptopAvailability: true,
        },
        {
            candidateName: "Ali",
            fieldOfInterest: "Mobile Development",
            experienceYears: 2,
            motivationLevel: 7,
            weeklyStudyHours: 20,
            englishLevel: "A2",
            laptopAvailability: true,
        },
    ];

    //Introduction
    printMessage('HackYourFuture Trainee Hub');
    printMessage('Your go-to place for all HackYourFuture resources for trainees\n');

    //Filling out the form
    await ask("APPLY NOW - Press Enter to continue...\n");
    const  candidate = {
        candidateName: "",
        fieldOfInterest: "",
        experienceYears: 0,
        motivationLevel: 0,
        weeklyStudyHours: 0,
        englishLevel: "A1",
        laptopAvailability: false,
    }
    printMessage("Fill Out This Form Please ..\n");
    candidate.candidateName = await ask("What is your name? ");
    candidate.fieldOfInterest = await ask("What is your field of interest? ex: Web Development, Mobile Development Development ");
    candidate.experienceYears = Number( await ask("Experience Years? "));
    candidate.weeklyStudyHours = Number(await ask("What is your weekly study hours? "));
    candidate.motivationLevel = Number(await ask("What is your motivation level? (out of 10) "));
    const laptopAnswer = await ask("Do you have a laptop? yes/no ");
    candidate.laptopAvailability =  laptopAnswer === "yes";

    candidate.englishLevel = await ask("What is your english level? ");

    printCandidateReview(candidate)

    const submitAnswer = await ask("\nDo you want to submit this application? yes/no ");

    submitApplication(submitAnswer);

    printCandidateScoreComparison(candidate, storedApplications);

    //We close the input when the app finished
    finish();
}
main();

