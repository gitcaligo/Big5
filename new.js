
let pointer = 1

let questionOrder = []

let results = []

let dim1result = 0, dim2result = 0, dim3result = 0, dim4result = 0, dim5result = 0
let dim1percent = 0, dim2percent = 0, dim3percent = 0, dim4percent = 0, dim5percent = 0


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
    console.log(results)
}

function calcPercent() {

    for (const prop in results) {
        if (`${results[prop].answerDimension}` == 'dimension1') {
            dim1result += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension2') {
            dim2result += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension3') {
            dim3result += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension4') {
            dim4result += parseInt(`${results[prop].answerValue}`)
        } else if (`${results[prop].answerDimension}` == 'dimension5') {
            dim5result += parseInt(`${results[prop].answerValue}`)
        } 
    }

    for (let i = 1; i <= Object.keys(dimensions).length; i++) {
        let a = `dim${i}percent`
        let b = `dim${i}result`
        `${a}` = (`${b}` / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
        console.log(a)
        console.log(b)
    }

    /* dim1percent = (dim1result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim2percent = (dim2result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim3percent = (dim3result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim4percent = (dim4result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0)
    dim5percent = (dim5result / (Object.keys(questions).length / Object.keys(dimensions).length * 4) * 100).toFixed(0) */
}

function showResult() {

    calcPercent()

    $('#result h2').html('Your results:')
    $('#questions').css('display', 'none')
    $('#result').css('display', 'block') 

    $('#dim1').html(dimensions.dimension1 + ': ' + dim1percent + '%')
    $('#dim2').html(dimensions.dimension2 + ': ' + dim2percent + '%')
    $('#dim3').html(dimensions.dimension3 + ': ' + dim3percent + '%')
    $('#dim4').html(dimensions.dimension4 + ': ' + dim4percent + '%')
    $('#dim5').html(dimensions.dimension5 + ': ' + dim5percent + '%')
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
        dim1result = 0, dim2result = 0, dim3result = 0, dim4result = 0, dim5result = 0
        dim1percent = 0, dim2percent = 0, dim3percent = 0, dim4percent = 0, dim5percent = 0
        if (config.randomizeQuestions) {
            shuffleArray(questionOrder)
        }
        updateDom()
    })
})