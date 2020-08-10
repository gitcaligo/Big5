
let pointer = 1

let questionOrder = []

let results = []
let answerCount = [0,0,0,0,0]
let answerPercent = [0,0,0,0,0]

// Durstenfeld shuffle
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

function updateDom() {
    
    // toggle visibility of elements
    if (pointer == 1) {
        $('#back').css('display', 'none')
        $('#questions').css('display', 'block')
        $('#result').css('display', 'none')
    } else if (pointer > 1 && pointer <= Object.keys(questions).length) {
        $('#back').css('display', 'block')
    }
    // update question related elements
    $('#questions h2').html('Question ' + questionOrder[pointer-1])
    $('#questions p').html(questions["question" + questionOrder[pointer-1]].questionText)
    $('#bar span').html(((pointer - 1) / Object.keys(questions).length * 100).toFixed(0) + ' %')
    $('#progress').css("width", ((pointer - 1) / Object.keys(questions).length * 100).toFixed(0)+"%")

    // debug
    // console.log(results)
}

function showResult() {

    for (const prop in results) {
        if (`${results[prop].answerDimension}` == 'dimension1') {
            answerCount[0] += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension2') {
            answerCount[1] += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension3') {
            answerCount[2] += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension4') {
            answerCount[3] += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension5') {
            answerCount[4] += parseInt(`${results[prop].answerValue}`)
        } 
    }

    for (let i = 0; i < Object.keys(dimensions).length; i++) {
        answerPercent[i] = (answerCount[i] / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    }

    $('#result h2').html('Your results:')
    $('#questions').css('display', 'none')
    $('#result').css('display', 'block') 

    $('#dim1').html(dimensions.dimension1 + ': ' + answerPercent[0] + '%')
    $('#dim2').html(dimensions.dimension2 + ': ' + answerPercent[1] + '%')
    $('#dim3').html(dimensions.dimension3 + ': ' + answerPercent[2] + '%')
    $('#dim4').html(dimensions.dimension4 + ': ' + answerPercent[3] + '%')
    $('#dim5').html(dimensions.dimension5 + ': ' + answerPercent[4] + '%')
}

$(document).ready( function() {

    // question order and start up
    for (let i = 1; i <= Object.keys(questions).length; i++) {
        questionOrder.push(i)
        if (i == Object.keys(questions).length) {
            if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
            }
        updateDom()
        }
    }

    // button event listeners
    $('.answer').click( function(e) {
        answer = {
            answerDimension : questions['question' + pointer].dimension,
            answerValue : parseInt(e.target.attributes.val.value)  
        }
        results.push(answer)
        pointer++
        pointer > Object.keys(questions).length ? showResult() : updateDom()
        
    })

    $('#back').click( function() {
        pointer--
        results.pop()
        updateDom()
    })

    $('#reset').click( function() {
        pointer = 1
        results = []
        answerCount = [0,0,0,0,0]
        answerPercent = [0,0,0,0,0]
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
        }
        updateDom()
    })
})