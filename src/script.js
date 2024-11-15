const boards = [
    "003020600900305001001806400008102900700000008006708200002609500800203009005010300".split(""),
    "200080300060070084030500209000105408000000000402706000301007040720040060004010003".split(""),
    "000000907000420180000705026100904000050000040000507009920108000034059000507000000".split(""),
    "030050040008010500460000012070502080000603000040109030250000098001020600080060020".split(""),
    "020810740700003100090002805009040087400208003160030200302700060005600008076051090".split(""),
    "100920000524010000000000070050008102000000000402700090060000000000030945000071006".split(""),
    "043080250600000000000001094900004070000608000010200003820500000000000005034090710".split(""),
    "480006902002008001900370060840010200003704100001060049020085007700900600609200018".split(""),
    "000900002050123400030000160908000000070000090000000205091000050007439020400007000".split(""),
    "001900003900700160030005007050000009004302600200000070600100030042007006500006800".split(""),
    "000125400008400000420800000030000095060902010510000060000003049000007200001298000".split(""),
    "062340750100005600570000040000094800400000006005830000030000091006400007059083260".split(""),
    "300000000005009000200504000020000700160000058704310600000890100000067080000005437".split(""),
    "630000000000500008005674000000020000003401020000000345000007004080300902947100080".split(""),
    "000020040008035000000070602031046970200000000000501203049000730000000010800004000".split(""),
    "361025900080960010400000057008000471000603000259000800740000005020018060005470329".split(""),
    "050807020600010090702540006070020301504000908103080070900076205060090003080103040".split(""),
    "080005000000003457000070809060400903007010500408007020901020000842300000000100080".split(""),
    "003502900000040000106000305900251008070408030800763001308000104000020000005104800".split(""),
    "000000000009805100051907420290401065000000000140508093026709580005103600000000000".split("")
]

var board

function findEmptySquare() {
    for (let i=0; i<81; i++) {
        const box = document.getElementById(String(i+1));
        if (box.value === "") {
            return i;
        }
    }
    return false;
}

function chooseBoard() {
    const b = boards[Math.floor(Math.random()*20)]
    for (let i=1; i<82; i++) {
        let box = document.getElementById(String(i));
        if (b[i-1] === "0") {
            box.value = "";
            continue;
        } 
        box.value = b[i-1];
    }
    setBoard(b);
}

function setBoard(b) {
    board = b;
    console.log(board);
}

function resetBoard() {
    for (let i=1; i<82; i++) {
        let box = document.getElementById(String(i));
        if (board[i-1] === "0") {
            box.value = "";
            continue;
        } 
        box.value = board[i-1];
    }
    console.log("Board reset");
}

function validRow(num, idx) {
    const row = Math.floor(idx/9);
    for (let i=row*9+1; i<row*9+10; i++) {
        if (document.getElementById(String(i)).value === String(num)) {
            console.log("False")
            return false;
        }
    }
    console.log("True")
    return true;
}

function validCol(num, idx) {
    let temp = idx % 9;
    // if (0 !== 0) {
        // if (temp === 0) {
        //     temp = 8;
        // }
        for (let i=0; i<9; i++) {
            if (document.getElementById(String((9*i)+temp+1)).value === String(num)) {
                console.log("False");
                return false;
            }
        }
        console.log("True");
        return true;
    // }
    // for (let i=0; i<9; i++) {
    //     if (document.getElementById(String((9*i)+1)).value === String(1)) {
    //         console.log("False");
    //         return false;
    //     }
    // }
    // console.log("True");
    // return true;
}

function validSquare(num, idx) {
    let col = Math.floor(((idx-1) % 9)/3)*3+1;
    let row = Math.floor(idx/9);
    console.log(col)
    console.log(row)
    if (row < 3) {
        row = 0;
    } else if (row < 6) {
        row = 3;
    } else {
        row = 6;
    }
    for (let x=row*9; x<(row*9)+27; x=x+9) {
        console.log("x: "+String(x))
        for (let y=col; y<col+3; y++) {
            console.log("y: "+String(y))
            console.log("x+y="+String(x+y))
            if (document.getElementById(String(x+y)).value === String(num)) {
                console.log("False")
                return false;
            }
        }
    }
    console.log("True")
    return true;
}

function isValid(num, idx) {
    const rowValid = validRow(num, idx);
    const colValid = validCol(num, idx);
    const squareValid = validSquare(num, idx);
    return rowValid && colValid && squareValid;
}

function checkBoard() {
    for (let x=0; x<81; x++) {
        const val = document.getElementById(String(x+1)).value
        if (!(isValid(val, x))) {
            return false;
        }
    }
    return true;
}

function solve() {
    while (true) {
        const idx = findEmptySquare();
        if (idx === false) {
            break;
        }
        for (let x=1; x<10; x++) {
            if (isValid(x, idx)) {
                const square = document.getElementById(String(idx+1));
                square.value = x;
                if (solve()) {
                    return true;
                }
                square.value = "";
            }
        }
    }
    return false
}
