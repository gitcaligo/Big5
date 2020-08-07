
let pointer = 1

let questionOrder = []

let dimension1Result = 0, dimension2Result = 0, dimension3Result = 0, dimension4Result = 0, dimension5Result = 0

let dimension1Percent = 0, dimension2Percent = 0, dimension3Percent = 0, dimension4Percent = 0, dimension5Percent = 0

let lastAnswer = 0
let lastDimension, foo


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
    console.log('O '+dimension1Result)
    console.log('C '+dimension2Result)
    console.log('E '+dimension3Result)
    console.log('A '+dimension4Result)
    console.log('N '+dimension5Result)
    console.log('-')
    console.log(lastDimension)
    console.log('-')
}

function showResult() {

    dimension1Percent = (dimension1Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dimension2Percent = (dimension2Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dimension3Percent = (dimension3Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dimension4Percent = (dimension4Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dimension5Percent = (dimension5Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)

    $('#result h2').html('Your results:')
    $('#questions').css('display', 'none')
    $('#result').css('display', 'block') 

    $('#dim1').html(dimensions.dimension1 + ': ' + dimension1Percent + '%')
    $('#dim2').html(dimensions.dimension2 + ': ' + dimension2Percent + '%')
    $('#dim3').html(dimensions.dimension3 + ': ' + dimension3Percent + '%')
    $('#dim4').html(dimensions.dimension4 + ': ' + dimension4Percent + '%')
    $('#dim5').html(dimensions.dimension5 + ': ' + dimension5Percent + '%')
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
        if (questions["question" + pointer].dimension == "dimension1") {
            dimension1Result += parseInt(e.target.attributes.val.value)
            lastDimension = 1
        } else if (questions["question" + pointer].dimension == "dimension2") {
            dimension2Result += parseInt(e.target.attributes.val.value)
            lastDimension = 2
        } else if (questions["question" + pointer].dimension == "dimension3") {
            dimension3Result += parseInt(e.target.attributes.val.value)
            lastDimension = 3
        } else if (questions["question" + pointer].dimension == "dimension4") {
            dimension4Result += parseInt(e.target.attributes.val.value)
            lastDimension = 4
        } else if (questions["question" + pointer].dimension == "dimension5") {
            dimension5Result += parseInt(e.target.attributes.val.value)
            lastDimension = 5
        }
        lastAnswer = parseInt(e.target.attributes.val.value)
        pointer++
        pointer > Object.keys(questions).length ? showResult() : updateDom()
        
    })

    $('#back').click( function() {
        pointer--
        if (lastDimension == "1") {
            dimension1Result -= lastAnswer
        } else if (lastDimension == "2") {
            dimension2Result -= lastAnswer
        } else if (lastDimension == "3") {
            dimension3Result -= lastAnswer
        } else if (lastDimension == "4") {
            dimension4Result -= lastAnswer
        } else if (lastDimension == "5") {
            dimension5Result -= lastAnswer
        }
        // update lastDimension after BACK
        updateDom()
    })

    $('#reset').click( function() {
        pointer = 1
        dimension1Result = 0, dimension2Result = 0, dimension3Result = 0, dimension4Result = 0, dimension5Result = 0
        dimension1Percent = 0, dimension2Percent = 0, dimension3Percent = 0, dimension4Percent = 0, dimension5Percent = 0
        lastAnswer = 0
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
        }
        updateDom()
    })
})