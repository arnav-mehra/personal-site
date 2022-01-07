import React, {useState, useEffect} from 'react'

const dbcolor = "rgb(15, 15, 15)";
const bigDot = 10;
const smallDot = 5;
const cellSize = 24;

const rand = (n: number) => {
    return Math.floor(Math.random() * n);
}
const getShape = (str: string) => {
    switch (str) {
        case 'block': return [[0, 0], [0, 1], [1, 0], [1, 1]];
        case 'blinker': return [[0, 0], [1, 0], [2, 0]];
        case 'glider': return [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
        case 'toad': return [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]];
        default: return [];
    }
}

const resizeDots = (currRows: number, currCols: number, 
        currDots: boolean[][]) => {
    var dotArr = Array(currRows).fill(null).map(
        () => Array(currCols).fill(false));
    var rows = Math.min(currDots.length, currRows);
    var cols = Math.min(currDots[0].length, currCols);
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            dotArr[r][c] = currDots[r][c];
        }
    }
    return dotArr;
}


const GameOfLife = () => {
    

    const getRows = () => {
        return Math.floor(window.innerHeight/cellSize);
    }
    const getCols = () => {
        return Math.floor(window.innerWidth/cellSize);
    }
    const addShape = () => {
        var rows = dots.length;
        var cols = dots[0].length;
    
        var shape = ['glider', 'blinker', 'toad'][rand(3)];
        const indexArr = getShape(shape);
        var rowDisp = rand(rows);
        var colDisp = rand(cols);
    
        for (var i = 0; i < indexArr.length; i++) {
            var r = indexArr[i][0] + rowDisp;
            var c = indexArr[i][1] + colDisp;
            if (r < rows && c < cols) {
                dots[r][c] = true;
            }
        }
    }
    const initMultiShapes = (num: number) => {
        var rows = getRows();
        var cols = getCols();
        var dotArr = Array(rows).fill(null).map(
            () => Array(cols).fill(false));
        for (var n = 0; n < num; n++) {
            var shape = ['glider', 'blinker', 'toad'][rand(3)];
            const indexArr = getShape(shape);
            var rowDisp = rand(rows);
            var colDisp = rand(cols);
            for (var i = 0; i < indexArr.length; i++) {
                var r = indexArr[i][0] + rowDisp;
                var c = indexArr[i][1] + colDisp;
                if (r < rows && c < cols) {
                    dotArr[r][c] = true;
                }
            }
        }
        return dotArr;
    }

    const [dots, setDots] = useState(initMultiShapes(30));
    const [rows, setRows] = useState(getRows());
    const [cols, setCols] = useState(getCols());
    const [t, setT] = useState(0);

    const updateDots = () => {
        const r = dots.length - 1;
        const c = dots[0].length - 1;
        const newDots = Array(r + 1).fill(null).map(
            () => Array(c + 1).fill(false));
        for (var j = 1; j < c; j++) {
            var neighbors = dots[0][j-1] + dots[0][j+1] 
                + dots[1][j]  + dots[1][j+1] + dots[1][j-1];
            if (dots[0][j]) {
                newDots[0][j] = (neighbors == 2 || neighbors == 3);
            } else {
                newDots[0][j] = (neighbors == 3);
            }
        }
        for (var j = 1; j < c; j++) {
            var neighbors = dots[r][j-1] + dots[r][j+1] 
                + dots[r][j]  + dots[r-1][j+1] + dots[r-1][j-1];
            if (dots[r][j]) {
                newDots[r][j] = (neighbors == 2 || neighbors == 3);
            } else {
                newDots[r][j] = (neighbors == 3);
            }
        }
        for (var i = 1; i < r; i++) {
            var neighbors = dots[i-1][0] + dots[i+1][0] 
                + dots[i][1]  + dots[i+1][1] + dots[i-1][1];
            if (dots[i][0]) {
                newDots[i][0] = (neighbors == 2 || neighbors == 3);
            } else {
                newDots[i][0] = (neighbors == 3);
            }
        }
        for (var i = 1; i < r; i++) {
            var neighbors = dots[i-1][c] + dots[i+1][c] 
                + dots[i][c-1]  + dots[i+1][c-1] + dots[i-1][c-1];
            if (dots[i][c]) {
                newDots[i][c] = (neighbors == 2 || neighbors == 3);
            } else {
                newDots[i][c] = (neighbors == 3);
            }
        }
        for (var i = 1; i < r; i++) {
            for (var j = 1; j < c; j++) {
                var neighbors = dots[i][j-1] + dots[i][j+1] 
                    + dots[i+1][j] + dots[i-1][j] + dots[i+1][j+1]
                    + dots[i-1][j-1] + dots[i-1][j+1] + dots[i+1][j-1];
                if (dots[i][j]) {
                    newDots[i][j] = (neighbors == 2 || neighbors == 3)
                } else {
                    newDots[i][j] = (neighbors == 3)
                }
            }
        }
        setDots(newDots);
    }
    
    useEffect(() => {
        setTimeout(() => {
            var currRows = getRows();
            var currCols = getCols();
            if (rows != currRows || cols != currCols) {
                setRows(currRows);
                setCols(currCols);
                setDots(resizeDots(currRows, currCols, dots));
            } else {
                addShape();
                updateDots();
            }
            setT(t + 1);
        }, 1000);
    }, [t])

    return (
        <div style={{position: "fixed"}}>
            {dots.map((dotRow) => 
                <div
                    style={{
                        display: "flex",
                        justifyContent:"center",
                        height: cellSize
                    }}
                >
                    {dotRow.map((dot) => {
                        return (
                            <span
                                style={{
                                    width: cellSize,
                                    height: cellSize
                                }}
                            >
                                <div
                                    style={{
                                        width: dot? bigDot : smallDot,
                                        height: dot? bigDot : smallDot,
                                        background: dbcolor,
                                        borderRadius: '50%'
                                    }}
                                />
                            </span>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default GameOfLife







{/* <div style={{marginTop:"10px"}} onClick={() => {
    updateDots()
}}>next iteration</div>
<div style={{marginTop:"10px"}} onClick={() => {
    var r = rand(rows*cols)
    var s = ['block', 'glider', 'blinker'][rand(3)]
    addShape(r + gridPad*rows + gridPad, s)
}}>add shape</div>
<div style={{marginTop:"10px"}} onClick={() => {
    addShape(15, 'glider')
}}>add blinker</div> */}
