$( document ).ready(function() {
    console.log( "ready!" );
    $( "#generateBtn" ).click(function() {
        var difficultyLevel = getValueFromSelect('#difficultyLevel')
        var numberOfPuzzles = getValueFromSelect('#numberOfPuzzles')
        var showAnswer = getValueFromSelect('#showAnswer')

        var puzzleQuestion = []
        var puzzleAnswer = []

        // generate puzzle
        for (let i = 1; i <= numberOfPuzzles; i++) {
            let question = sudoku.generate(difficultyLevel);
            let answer = sudoku.solve(question);

            puzzleQuestion.push({
                puzzleNumber: i,
                puzzleQuestion: question,
            }) 
            renderPuzzle(question,i,'#questions')

            if(showAnswer == 'yes'){
                // $('.header').css({display:'block'})
                renderPuzzle(answer,i,'#answers')
            }
          }
      });
});

// functions

function getValueFromSelect(selector){
    return $(selector).val();
}

function renderPuzzle(puzzle,index,selector){
        var ret = `
        <div class="outer no-break">
        <p class="puzzle-number">Puzzle Number : ${index}</p>
        <table class='no-break' ><tr>`;
        for (var i in puzzle) {
          if (puzzle[i] == '.') {
            ret = ret + "<td>" + '' + "</td>";
          }
          else {
            ret = ret + "<td>" + puzzle[i] + "</td>";
          }
          if (i % 9 == 8) {
            ret = ret + "</tr><tr>"
          }
        }
        ret + "</tr></table></div>";
          $(selector).append(ret);
}