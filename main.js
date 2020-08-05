
let pointer = 1

let questionOrder = []

let dim1Result = 0
let dim2Result = 0
let dim3Result = 0
let dim4Result = 0
let dim5Result = 0
let lastAnswer = 0
let dim1Percent = 0
let dim2Percent = 0
let dim3Percent = 0
let dim4Percent = 0
let dim5Percent = 0
let lastDimension


// Durstenfeld shuffle
/* function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
} */

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
}

function showResult() {

    dim1Percent = (dim1Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim2Percent = (dim2Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim3Percent = (dim3Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim4Percent = (dim4Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim5Percent = (dim5Result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)

    $('#result h2').html('Your results:')
    $('#questions').css('display', 'none')
    $('#result').css('display', 'block') 

    $('#dim1').html(dimensions.dimension1 + ': ' + dim1Percent + '%')
    $('#dim2').html(dimensions.dimension2 + ': ' + dim2Percent + '%')
    $('#dim3').html(dimensions.dimension3 + ': ' + dim3Percent + '%')
    $('#dim4').html(dimensions.dimension4 + ': ' + dim4Percent + '%')
    $('#dim5').html(dimensions.dimension5 + ': ' + dim5Percent + '%')
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
            dim1Result += parseInt(e.target.attributes.val.value)
        } else if (questions["question" + pointer].dimension == "dimension2") {
            dim2Result += parseInt(e.target.attributes.val.value)
        } else if (questions["question" + pointer].dimension == "dimension3") {
            dim3Result += parseInt(e.target.attributes.val.value)
        } else if (questions["question" + pointer].dimension == "dimension4") {
            dim4Result += parseInt(e.target.attributes.val.value)
        } else if (questions["question" + pointer].dimension == "dimension5") {
            dim5Result += parseInt(e.target.attributes.val.value)
        }
        lastDimension = `${'dim' + pointer + 'Result'}`
        lastAnswer = parseInt(e.target.attributes.val.value)
        pointer++
        pointer > Object.keys(questions).length ? showResult() : updateDom()
        console.log(lastDimension)
    })

    $('#back').click( function() {
        pointer--
        // lastDimension = `${'dim' + pointer + 'Result'}`
        lastDimension -= lastAnswer
        updateDom()
    })

    $('#reset').click( function() {
        pointer = 1
        dim1Result = 0
        dim2Result = 0
        dim3Result = 0
        dim4Result = 0
        dim5Result = 0
        lastAnswer = 0
        dim1Percent = 0
        dim2Percent = 0
        dim3Percent = 0
        dim4Percent = 0
        dim5Percent = 0
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
        }
        updateDom()
    })
})