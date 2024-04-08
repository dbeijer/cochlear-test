$(document).ready(function() {
	$("#quiz-wrapper").hide();
	$("#start-quiz, #restart-quiz").click(function() {
		startQuiz();
	});
});

let currentQuestionIndex = 0;
let questions = [];
let shuffledQuestions = [];

$(".close").on("click", function() {
	currentQuestionIndex = 0;
	questions = [];
	shuffledQuestions = [];

	$("#landing-page").fadeIn();
	$("#quiz-wrapper, #result-page").fadeOut();
	$("#bgFade").attr("id", "bg");

});

function startQuiz() {

	// fade background at start
	$("#bg").attr("id", "bgFade");

	$.getJSON("https://dev-linkxzqcbhyhocf.api.raw-labs.com/mock/2", function(data) {
		currentQuestionIndex = 0;
		questions = data.questions;
		shuffledQuestions = shuffleArray([...questions]);
		displayQuestion();
		$("#landing-page").hide(); // Hide landing page
		
		$("#quiz-wrapper").show(); 
		$("#quiz-container").show(); // Show quiz container
		$("#result-page").hide(); // hide results
	}).fail(function(error) {
		console.error("Error fetching json data:", error);
	});
}

function displayQuestion() {
	if (currentQuestionIndex < shuffledQuestions.length) {
		const progressBarFill = $("#progress-bar-fill");
		const progressPercentage = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
		
		$("#progress-bar-fill").css("width", progressPercentage + "%");

		const currentQuestion = shuffledQuestions[currentQuestionIndex];
		const quizContainer = $("#quiz-container");
		quizContainer.empty(); // Clear previous question

		const questionDiv = createQuestionElement(currentQuestion);
		quizContainer.append(questionDiv);
		questionDiv.show();
	} else {
		submitQuiz();
	}
}

function createQuestionElement(questionData) {
	const questionDiv = $("<div>").addClass("question");

	const questionText = $("<h3>").text(questionData.question);
	questionDiv.append(questionText);

	questionData.options.forEach((option, optionIndex) => {
		const optionInput = $("<input>").attr({
			type: "radio",
			name: "answer",
			value: optionIndex
		});
		const optionLabel = $("<label>").text(option);
		questionDiv.append(optionInput, optionLabel, "<div class='spacer'>");
	});

	const nextButton = $("<button>").text("Next").click(nextQuestion);
	questionDiv.append(nextButton);

	return questionDiv;
}

function nextQuestion() {
	const selectedAnswer = $('input[name="answer"]:checked');
	if (selectedAnswer.length > 0) {
		removeWarning();
		const currentQuestion = shuffledQuestions[currentQuestionIndex];
		currentQuestion.selectedOptionIndex = parseInt(selectedAnswer.val());
		currentQuestionIndex++;
		displayQuestion();
	} else {
		warning('Please select an answer.');
	}
}

function submitQuiz() {
	let correctCount = 0;
	let incorrectAnswers = [];
	let correctAnswers = [];
	let ofTotal = 0;
	const incorrectList = $("#incorrectList");
	incorrectList.empty();

	shuffledQuestions.forEach(questionData => {
		const listElement = $("<li>").text(questionData.question).appendTo(incorrectList);
		ofTotal++;
		if (questionData.selectedOptionIndex === questionData.correctIndex) {
			correctCount++;
			correctAnswers.push(questionData);
			listElement.addClass("correct");
		} else {
			incorrectAnswers.push(questionData);
			listElement.addClass("wrong");
		}
	});

	$("#quiz-wrapper").hide();
	$("#result-page").show();
	$("#correctCount").text(correctCount);
	$("#ofTotal").text(ofTotal);
}

function shuffleArray(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function warning(message) {
	$('#warning').text(message);
	$('#warning-box').show();
}

function removeWarning() {
	$('#warning').empty();
	$('#warning-box').hide();
}

