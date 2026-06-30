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

function submitApplication(answer,candidate,storedApplications) {
    if (answer === "yes") {
        candidate.candidateScore = calculateCandidateScore(candidate);
        storedApplications.push(candidate);
        printMessage("\nApplication submitted successfully!");
        return true;
    } else {
        printMessage("\nApplication cancelled.");
        return false;
    }
}
function calculateCandidateScore(candidate) {
    return candidate.weeklyStudyHours + candidate.experienceYears + candidate.motivationLevel;
}
function printTheFinalResult(candidate, storedApplications,vacancyNumber) {

    printMessage("\nCandidate Score:");
    printMessage(`${candidate.candidateName} score: ${candidate.candidateScore}`);

    printMessage("\nStored Applications Scores:");
    for(let applicationIndex = 0; applicationIndex < storedApplications.length; applicationIndex++) {
        storedApplications[applicationIndex].candidateScore  = calculateCandidateScore(storedApplications[applicationIndex]);
        printMessage(`${storedApplications[applicationIndex].candidateName}  score: ${storedApplications[applicationIndex].candidateScore}`);
    }

    // const acceptedApplications = [];
    for(let i = 0; i< storedApplications.length; i++){
        for(let j = i+1; j < storedApplications.length;j++){
            if(storedApplications[j].candidateScore > storedApplications[i].candidateScore){
                let temp = storedApplications[i];
                storedApplications[i] = storedApplications[j];
                storedApplications[j] = temp;
            }
        }
    }
    printMessage(storedApplications)
    const acceptedApplications = storedApplications.slice(0, vacancyNumber);

    if (acceptedApplications.includes(candidate)) {
        printMessage("\nCongratulations! Your application has been accepted.");
    } else {
        printMessage("\nSorry, your application has been rejected.");
    }

/*    if(vacancyNumber> 0) {
        //Do the job
        printMessage("Show The Results");
        const orderedApplications = []

        for(let i = vacancyNumber; i >= vacancyNumber; i--){
            printMessage(`Show The Results ${i}`);
            acceptedApplications.push(storedApplications[i]);
        }
        printMessage(acceptedApplications)
    }else{
        printMessage("No More Applications Available");
    }*/
}

async function main() {

    let vacancies = 2;
    const storedApplications = [{
            candidateName: "Sara",
            fieldOfInterest: "Web Development",
            experienceYears: 1,
            motivationLevel: 8,
            weeklyStudyHours: 25,
            englishLevel: "B1",
            laptopAvailability: true,
            candidateScore: 34

    },
        {
            candidateName: "Ali",
            fieldOfInterest: "Mobile Development",
            experienceYears: 2,
            motivationLevel: 7,
            weeklyStudyHours: 20,
            englishLevel: "A2",
            laptopAvailability: true,
            candidateScore: 29
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
        candidateScore: 0
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

    const submitAnswer = (await ask("\nDo you want to submit this application? yes/no ")).toLowerCase().trim();

    const isSubmitted = submitApplication(submitAnswer,candidate,storedApplications);

    if (isSubmitted) printTheFinalResult(candidate, storedApplications,vacancies);

    //We close the input when the app finished
    finish();
}
main();

