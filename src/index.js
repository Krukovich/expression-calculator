function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, "");

    const array = expr.split("");

    if(array.includes("(") || array.includes(")")) {
        const firstCount = array.filter(item => item === "(");
        const secondCount = array.filter(item => item === ")");

        if (firstCount.length !== secondCount.length) throw new Error("ExpressionError: Brackets must be paired");

        while(expr.indexOf("(") >= 0){
            let str = expr.concat().match(/\([^()]+\)/)[0];
            let strPrepare = calculate(str.match(/[^()]+/)[0]);
            if(strPrepare < 0){
                strPrepare = "point" + strPrepare;
            }
            expr = expr.replace( str , strPrepare);
        }
    }

    return calculate(expr);
}

function calculate(expr) {
    let arrayNumbers = expr.match(/point-\d+\.*\d*|\d+\.*\d*/g);
    let arrayOperator = expr.split(/point-\d+\.*\d*|\d+\.*\d*/g);
    
    arrayOperator = arrayOperator.join().replace(/,/g,"").split("");

    for(let i = 0; i < arrayNumbers.length; i++) {
        if(arrayNumbers[i].indexOf("point") >= 0){
            arrayNumbers[i] = arrayNumbers[i].replace(/point/,"");
        }
    }

    while(arrayOperator.indexOf("*") >= 0 || arrayOperator.indexOf("/") >= 0) {
        for (let i = 0; i < arrayOperator.length; i++) {
            if (arrayOperator[i] === "/") {
                if(arrayNumbers[i + 1] !== "0"){
                    arrayNumbers[i] = Number(arrayNumbers[i]) / Number(arrayNumbers[i + 1]);
                    arrayNumbers.splice(i + 1, 1);
                    arrayOperator.splice(i, 1);
                    i--;
                }
                else {
                    throw new Error("TypeError: Division by zero.");
                }

            } else if (arrayOperator[i] === "*") {
                arrayNumbers[i] = Number(arrayNumbers[i]) * Number(arrayNumbers[i + 1]);
                arrayNumbers.splice(i + 1, 1);
                arrayOperator.splice(i, 1);
                i--;
            }
        }
    }

    arrayOperator.forEach(function (element) {
        if (element === "-") {
            arrayNumbers[0] = Number(arrayNumbers[0]) - Number(arrayNumbers[1]);
            arrayNumbers.splice(1, 1);
        } else if (element === "+") {
            arrayNumbers[0] = Number(arrayNumbers[0]) + Number(arrayNumbers[1]);
            arrayNumbers.splice(1, 1);
        }
    });

    return arrayNumbers.pop();
}

module.exports = {
    expressionCalculator
}