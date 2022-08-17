const bord = document.getElementById('bord');

function changeColor(){
    for (let e of bord.children){
        for (let che of e.children){
            che.style.backgroundColor = "white";
            che.classList.remove('at');
        }
    }
    let element = this;
    element.style.backgroundColor = "lightblue";
    element.classList.add('at');
}

const elements = document.getElementsByClassName('sudoku-col')
for (let e of elements){
    e.addEventListener('click', changeColor);
}

document.addEventListener('keydown', (event) => {
    let k = event.key;
    const numLst = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let e of bord.children){
        for (let che of e.children){
            if(che.classList.contains('at') && numLst.includes(Number(k))){
                che.innerHTML = k;
            }else if(che.classList.contains('at')){
                che.innerHTML = '';
            }
        }
    }
})


function generateMatrix(){
    let out = []
    let counter = 0
    for (let e of bord.children){
        out.push([])
        for (let che of e.children){
            out[counter].push(che.textContent)
        }
        counter++
    }
    return out
}

function findFree(brd){
    for(let row = 0; row < brd.length; row++){
        for(let col = 0; col < brd[0].length; col++){
            if(brd[row][col] == ''){
                return [row, col]
            }
        }
    }
}

function validate(brd, row, col, num){
    for(let i = 0; i < brd[0].length; i++){
        if(brd[row][i] == num && col != i){
            return false
        }
    }
    for(let i = 0; i < brd.length; i++){
        if(brd[i][col] == num && row != i){
            return false
        }
    }
    for(let i = row - row % 3; i < row - row % 3 + 3; i++){
        for(let j = col - col % 3; j < col - col % 3 + 3; j++){
            if(brd[i][j] == num){
                return false
            }
        }
    }
    return true
}

let cnt = 0
function solveSudoku(brd=generateMatrix()){
    let find = findFree(brd);
    if(!find){
        return true
    }
    let [row, col] = find;
    for(let num = 1; num < 10; num++){
        if(validate(brd, row, col, num)){
            brd[row][col] = num;
            cnt++
            if(cnt == 500000){
                cnt = 0
                window.alert("No solutions!");
                throw 'No solution';
            }
            if(solveSudoku(brd)){
                return brd
            }
            brd[row][col] = '';
        }
    }
    return false
}

function play(){
    let solvedSudoku = solveSudoku();
    let row = 0;
    for (let e of bord.children){
        let col = 0;
        for (let che of e.children){
            if(che.textContent == ''){
                che.innerHTML = solvedSudoku[row][col];
            }
            col++;
        }
        row++;
    }
}

