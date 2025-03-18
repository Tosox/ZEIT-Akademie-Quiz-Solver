// ==UserScript==
// @name            ZEIT Akademie Quiz Solver
// @author          Tosox
// @namespace       https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver
// @homepage        https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver
// @supportURL      https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver/issues
// @updateURL       https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver/releases/latest/download/ZEIT-Akademie-Quiz-Solver.user.js
// @downloadURL     https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver/releases/latest/download/ZEIT-Akademie-Quiz-Solver.user.js
// @icon            https://github.com/Tosox/ZEIT-Akademie-Quiz-Solver/blob/master/assets/icon.png?raw=true
// @description     Shows the solutions to the current quiz questions
// @version         1.0.2
// @version         1.0.2
// @license         MIT
// @copyright       Copyright (c) 2025 Tosox
// @match           https://www.zeitakademie.de/*
// @grant           GM_registerMenuCommand
// @grant           unsafeWindow
// ==/UserScript==

(function(){
    "use strict";

    function getCurrentSolution() {
        var oQuiz = unsafeWindow.oQuiz;
        if (!oQuiz) {
            return null;
        }

        var currentIndex = oQuiz.quizSession.activeQuestionIndex;
        if (!oQuiz.quizValues.questions[currentIndex]) {
            return null;
        }

        var answers = oQuiz.quizValues.questions[currentIndex].answers;
        return answers.find(a => a.correctAnswer);
    }

    GM_registerMenuCommand("Show Solution (S)", function() {
        var solution = getCurrentSolution()
        if (!solution) {
            alert("There is no active quiz at the moment");
            return;
        }

        alert(`Answer ${solution.id + 1}: ${solution.answer}`);
    }, 's');

    GM_registerMenuCommand("Solve Quiz (Q)", function() {
        var solution = getCurrentSolution();
        if (!solution) {
            alert("There is no active quiz at the moment");
            return;
        }

        function clickAnswers() {
            setTimeout(function() {
                var solution = getCurrentSolution();
                if (!solution) {
                    return;
                }

                var btnAnswer = document.getElementById(`button${solution.id}`);
                if (btnAnswer) {
                    btnAnswer.click();
                }

                var btnNext = document.getElementById("buttonNextCard");
                if (btnNext) {
                    btnNext.click();
                }

                clickAnswers();
            }, 1500);
        }

        clickAnswers();
    }, 'q');
})()
