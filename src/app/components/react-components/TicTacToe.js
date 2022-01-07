import React, {useState, useEffect} from 'react'

const TicTacToe = ({boardSize, color, fontSize, bordered}) => {

    const sqSize = boardSize? Math.floor((boardSize-6)/3) : 30
    const fColor = color? color : 'black'
    const fSize = fontSize? fontSize : 20
    const border = bordered != false? '4px solid ' + fColor : 'none'
    const bRadius = bordered != false? 9 : 0

    const [board, setBoard] = useState(new Array(9).fill(' '))
    const [turn, setTurn] = useState(true)

    const winner = (b) => {
        for (var i=0; i<9; i+=3) {
            if (b[i] != ' ') {
                if (b[i] == b[i+1] && b[i] == b[i+2]) { return b[i] == 'X' }
            }
        }
        for (var i=0; i<3; i++) {
            if (b[i] != ' ') {
                if (b[i] == b[i+3] && b[i] == b[i+6]) { return b[i] == 'X' }
            }
        }
        if (b[4] != ' ') {
            if (b[0] == b[4] && b[0] == b[8]) { return b[4] == 'X' }
            if (b[2] == b[4] && b[2] == b[6]) { return b[4] == 'X' }
        }
        return .5
    }
    const bestMove = (b, turn) => {
        var max = -1, bestMove = -1
        var moves = []
        b.forEach((sq, index) => { if (sq==' ') {moves.push(index)} })

        moves.forEach(move => {
            b[move] = turn? 'X' : 'O'
            var score = 1 - negaMax(b, !turn)
            
            if (score > max) {
                max = score
                bestMove = [move]
            } else if (score == max && Math.random() > .8) {
                bestMove.push(move)
            }
            b[move] = ' '
        })

        return [bestMove[Math.floor(Math.random() * bestMove.length)], max]
    }
    const negaMax = (b, turn) => {
        var max = -1
        var moves = []
        b.forEach((sq, index) => { if (sq==' ') {moves.push(index)} })
        
        if (moves.length == 0 || winner(b) != .5) {
            return turn? winner(b) : 1-winner(b)
        }

        moves.forEach(move => {
            b[move] = turn? 'X' : 'O'
            var score = 1 - negaMax(b, !turn)
            if (score > max) { max = score }
            b[move] = ' '
        })

        return max
    }

    useEffect(() => {
        setTimeout(() => {
            if (board.indexOf(' ') == -1) {
                setBoard(new Array(9).fill(' '))
                setTurn(true)
            } else {
                var best = bestMove(board, turn)[0]
                setBoard(board.map((item, index) => index == best? (turn? 'X' : 'O') : item))
                setTurn(!turn)
            }
        }, [1000])
    }, [turn])

    return (
        <div style={{border: border, borderRadius: bRadius}}>
            {[0,1,2].map(r => 
                <>
                    <div style={{display:"flex"}}>
                        {[0,1,2].map(c => 
                            <>
                                <div
                                    style={{
                                        width: sqSize, 
                                        height: sqSize,
                                        fontSize: fSize,
                                        fontWeight: "700",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: fColor
                                    }}
                                >
                                    {board[r*3+c]}
                                </div>
                                {c != 2 &&
                                    <div
                                        style={{
                                            width: 3, 
                                            height: sqSize,
                                            background: fColor,
                                        }}
                                    />
                                }
                            </>
                        )}
                    </div>
                    {r != 2 &&
                        <div
                            style={{
                                width: sqSize*3 + 6, 
                                height: 3,
                                background: fColor,
                            }}
                        />
                    }
                </>
            )}
        </div>
    )
}

export default TicTacToe