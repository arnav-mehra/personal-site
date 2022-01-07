import React, {useState, useEffect} from 'react'

const gridPad = 3;
const animSpd = .4;
const dRad = 50;
const dbcolor = "rgb(15, 15, 15)";
const freq = 1;
const bigDot = 10;
const smallDot = 5;
const bordered = false;
const minDotCount = 100;
const newShapePeriod = 1;
const cellSize = 20;


const GameOfLife = () => {
    const [rows, setRows] = useState(Math.floor(window.innerHeight/cellSize));
    const [cols, setCols] = useState(Math.floor(window.innerWidth/cellSize));
    const [timeLock, setTimeLock] = useState(false);
   

    const rand = (n: number) => {
        return Math.floor(Math.random() * n);
    }
    const getShape = (str: string) => {
        switch (str) {
            case 'block': return [0, 1, cols, cols+1]
            case 'blinker': return [0, cols, cols*2]
            case 'glider': return [cols, cols*2+1, 2, cols+2, cols*2+2]
            case 'toad': return [1, 2, 3, cols, cols+1, cols+2]
            default: return []
        }
    }
    const initMultiShapes = (num: number) => {
        var dotArr = Array(rows).fill(null).map(
            () => Array(cols).fill(false));
        for (var n = 0; n < num; n++) {
            var r = rand((rows - 2) * (cols - 2));
            var s = ['glider', 'blinker', 'toad'][rand(3)];
            const indexArr = getShape(s);

            for (var i = 0; i < indexArr.length; i++) {
                var ind = indexArr[i] + r;
                dotArr[Math.floor(ind / cols)][ind % cols] = true;
            }
        }
        return dotArr;
    }
    const rescaleDots = (rowNum: number, colNum: number) => {
        var dotArr = Array(rowNum).fill(null).map(
            () => Array(colNum).fill(false));
        var comRows = Math.min(rowNum, dots.length)
        var comCols = Math.min(colNum, dots[0].length)
        for (var r = 0; r < comRows; r++) {
            for (var c = 0; c < comCols; c++) {
                dotArr[r][c] = dots[r][c];
            }
        }
        setDots(dotArr);
    }

    const [dots, setDots] = useState(initMultiShapes(40));
    const [t, setT] = useState(0);

    window.addEventListener('resize', () => {
        setTimeLock(true);
        setTimeout(() => {
            var r = Math.floor(window.innerHeight/cellSize)
            var c = Math.floor(window.innerWidth/cellSize);
            setRows(r);
            setCols(c);
            rescaleDots(r, c);
            setTimeLock(false);
        }, 1100)
    });
    
    const addShape = (startInd: number, shape: string) => {
        const dotArr = dots
        const indexArr = getShape(shape)
        for (var i=0; i<indexArr.length; i++) {
            var ind = indexArr[i] + startInd
            dotArr[Math.floor(ind / cols)][ind % cols] = true
        }
        setDots([...dotArr])
    }
    const getNB = (r: number, c: number) => {
        if (0 <= r && r < rows
                && 0 <= c && c < cols) {
            return dots[r][c]
        } else {
            return 0
        }
    }
    const updateDots = () => {
        const newDots = dots
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
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
        setDots(newDots)
    }
    const countDots = () => {
        var count = 0
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                if (dots[r][c]) { count++ }
            }
        }
        return count
    }

    useEffect(() => {
        setTimeout(() => {
            if (!timeLock) {
                if (
                    (minDotCount? countDots() < minDotCount : false) || 
                    (newShapePeriod? t % newShapePeriod == 0 : false)
                ) {
                    var r = rand((rows - 2)*(cols - 2))
                    var s = ['glider', 'blinker', 'toad'][rand(3)]
                    addShape(r, s)
                }
                updateDots()
            }
            setT(t+1)
        }, 1000/freq)
    }, [t])

    

    return (
        <div style={{position: "fixed"}}>
            {dots.map((dotRow) => 
                <div style={{
                    display: "flex",
                    justifyContent:"center",
                    height: cellSize
                }}>
                    {dotRow.map((dot) => {
                        return (
                            <div 
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
