import React, {useState, useEffect} from 'react'

const animSpd = .4;
const dRad = 50;
const dbcolor = "rgb(30, 30, 30)";
const freq = 1;
const bigDot = 10;
const smallDot = 5;
const cellSize = 20;


const rand = (n: number) => {
    return Math.floor(Math.random() * n);
}
const isValid = (r: number, c: number, 
        rdim: number, cdim: number) => {
    return (0 <= r && r < rdim
            && 0 <= c && c < cdim);
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
const addShape = (dotArr: boolean[][]) => {
    var rows = dotArr.length;
    var cols = dotArr[0].length;

    var shape = ['glider', 'blinker', 'toad'][rand(3)];
    const indexArr = getShape(shape);
    var rowDisp = rand(rows);
    var colDisp = rand(cols);

    for (var i = 0; i < indexArr.length; i++) {
        var r = indexArr[i][0] + rowDisp;
        var c = indexArr[i][1] + colDisp;
        if (isValid(r, c, rows, cols)) {
            dotArr[r][c] = true;
        }
    }
    return dotArr;
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
    const initMultiShapes = (num: number) => {
        var rows = getRows();
        var cols = getCols();
        var dotArr = Array(rows).fill(null).map(
            () => Array(cols).fill(false));
        for (var n = 0; n < num; n++) {
            dotArr = [...addShape(dotArr)];
        }
        return dotArr;
    }

    const [dots, setDots] = useState(initMultiShapes(40));
    const [rows, setRows] = useState(getRows());
    const [cols, setCols] = useState(getCols());
    const [t, setT] = useState(0);
    
    const getNB = (r: number, c: number) => {
        if (0 <= r && r < dots.length
                && 0 <= c && c < dots[0].length) {
            return dots[r][c];
        } else {
            return 0;
        }
    }
    const updateDots = () => {
        const newDots = [...dots];
        for (var i = 0; i < newDots.length; i++) {
            for (var j = 0; j < newDots[0].length; j++) {
                var neighbors = 
                    getNB(i, j+1) + getNB(i, j-1) +
                    getNB(i-1, j) + getNB(i+1, j) +
                    getNB(i+1, j+1) + getNB(i+1, j-1) +
                    getNB(i-1, j+1) + getNB(i-1, j-1)
                if (dots[i][j]) {
                    newDots[i][j] = (neighbors == 2 || neighbors == 3)
                } else {
                    newDots[i][j] = (neighbors == 3)
                }
            }
        }
        setDots([...newDots]);
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
                setDots(addShape(dots));
                updateDots();
            }
            setT(t + 1);
        }, 1000/freq);
    }, [t])   

    return (
        <div style={{position: "fixed"}}>
            {dots.map((dotRow, rowNum) => 
                <div 
                    key={rowNum}
                    style={{
                        display: "flex",
                        justifyContent:"center",
                        height: cellSize
                    }}
                >
                    {dotRow.map((dot, colNum) => {
                        return (
                            <div
                                key={colNum} 
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <div
                                    style={{
                                        width: smallDot,
                                        height: smallDot,
                                        transition: 'transform ' + animSpd + 's',
                                        background: dbcolor,
                                        borderRadius: dRad + '%',
                                        transform: 'Scale(' + (dot? bigDot/smallDot : 1) + ')'
                                    }}
                                />
                            </div>
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
