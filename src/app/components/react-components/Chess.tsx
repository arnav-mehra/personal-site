import * as React from 'react';
import { useState, useEffect } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChessPawn, faChessKnight, faChessBishop, faChessRook, faChessQueen, faChessKing, faInfoCircle} from '@fortawesome/free-solid-svg-icons'

const wSqColor = 
// 'white'
// 'rgb(40, 40, 40)';
'rgb(20, 20, 20)';
// 'rgb(131, 175, 131)';
const bSqColor = 
'rgb(0, 0, 0)';
// 'rgb(30, 30, 30)';
// 'rgb(39, 67, 61)';
const wPcColor = 
'rgb(201, 245, 201)';
const bPcColor = 
// 'rgb(30, 30, 30)';
// 'rgb(71, 95, 81)';
'rgb(215, 208, 238)';
const moveFreq = 1;
const flipped = false;

const defaultBoard = "rnbqkbnrpppppppp" + (" ").repeat(32) + "PPPPPPPPRNBQKBNR";
const gameBook = [
    "1. E2e4 E7e5 2. G1f3 B8c6 3. F1c4 G8f6 4. D2d3 F8c5 5. C2c3 O-O 6. O-O D7d6 7. F1e1 A7a5 8. C1g5 H7h6 9. G5h4 G7g5 10. H4g3 C5b6 11. B1a3 F6h7 12. A3c2 H6h5 13. H2h3 H5h4 14. G3h2 G5g4 15. H3g4 C8g4 16. D3d4 E5d4 17. C2d4 C6d4 18. C3d4 H7g5 19. D1d3 G5f3+ 20. G2f3 G4h5 21. E4e5 D6d5 22. C4b3 A5a4 23. B3d1 D8g5+ 24. G1h1 H5g6 25. D3e2 B6d4 26. E1g1 G5h5 27. E2d2 C7c5 28. F3f4 H5h6 29. G1g5 F7f6 30. E5f6 D4f6 31. D2d5+ G8h8 32. D1f3 A4a3 33. A1g1 A3b2 34. G5g6 H6g6 35. G1g6 B2B1Q+ 36. G6g1 B1h7 37. F4f5 F8g8 38. G1e1 A8e8 39. E1e6 E8e6 40. D5e6 H7h6 41. F3d1 H6g5 42. E6e4 G5d2 43. D1g4 D2g5 44. F2f3 G5c1+ 45. H1g2 H4h3+ 46. G2h3 C1h6+ 47. H3g3 G8d8 48. G4h3 H6g5+ 49. H3g4 G5h6 50. H2g1 H6h4+ 51. G3g2 D8d2+ 52. G2f1 D2d1+ 53. F1g2 D1d2+ 54. G2f1 D2d1+ 55. F1g2 D1d2+"
].map(item => {
    var splitStr = item.split(' ');
    for (var i = splitStr.length - 1; i >= 0; i--) {
        if (splitStr[i].indexOf('.') != -1) {
            splitStr.splice(i, 1);
        }
    }
    return splitStr;
});

const Chess = () => {

    const [board, setBoard] = useState(defaultBoard);
    const [moveNum, setMoveNum] = useState(-1);
    const [gameNum, setGameNum] = useState(0);
    
    const playGameMove = (game: string[], i: number) => {
        var boardCopy = board
    
        if (game[i] == 'O-O') {
            
            if (i%3 == 1) { // white short castle
                boardCopy = replaceAt(boardCopy, 63, ' ')
                boardCopy = replaceAt(boardCopy, 61, 'R')
                boardCopy = replaceAt(boardCopy, 62, 'K')
                boardCopy = replaceAt(boardCopy, 60, ' ')
            } else { // black short castle
                boardCopy = replaceAt(boardCopy, 7, ' ')
                boardCopy = replaceAt(boardCopy, 5, 'r')
                boardCopy = replaceAt(boardCopy, 6, 'k')
                boardCopy = replaceAt(boardCopy, 4, ' ')
            }

        } else if (game[i] == 'O-O-O') {

            if (i%3 == 1) { // white long castle
                boardCopy = replaceAt(boardCopy, 56, ' ')
                boardCopy = replaceAt(boardCopy, 59, 'R')
                boardCopy = replaceAt(boardCopy, 58, 'K')
                boardCopy = replaceAt(boardCopy, 60, ' ')
            } else { // black long castle
                boardCopy = replaceAt(boardCopy, 0, ' ')
                boardCopy = replaceAt(boardCopy, 3, 'r')
                boardCopy = replaceAt(boardCopy, 2, 'k')
                boardCopy = replaceAt(boardCopy, 4, ' ')
            }

        } else {
            
            const f = letToNum(game[i].substring(0, 2))
            const t = letToNum(game[i].indexOf('+') != -1? game[i].substring(2, 4) : game[i].substring(2))
            
            if (boardCopy[f] == 'p' && f%8 != t%8) { // black enpassant
                boardCopy = replaceAt(boardCopy, t+8, ' ')
                boardCopy = replaceAt(boardCopy, t, boardCopy[f])
            } else if (boardCopy[f] == 'P' && f%8 != t%8) { // white enpassant
                boardCopy = replaceAt(boardCopy, t-8, ' ')
                boardCopy = replaceAt(boardCopy, t, boardCopy[f])
            } else if (boardCopy[f] == 'p' && t >= 56) { // black promo
                boardCopy = replaceAt(boardCopy, t, game[i][4].toLowerCase())
            } else if (boardCopy[f] == 'P' && t <= 7) { // white promo
                boardCopy = replaceAt(boardCopy, t, game[i][4].toUpperCase())
            } else {
                boardCopy = replaceAt(boardCopy, t, boardCopy[f])
            }
            boardCopy = replaceAt(boardCopy, f, ' ')

        }

        setBoard(boardCopy)
    }

    useEffect(() => {
        if (moveNum == -1) {
            setTimeout(() => {
                setMoveNum(moveNum + 1)
            }, 1000/moveFreq)
        } else if (moveNum == gameBook[gameNum].length) {
            setMoveNum(-1)
            setBoard(defaultBoard)
            setTimeout(() => {
                setGameNum((gameNum + 1) % gameBook.length)
            }, 1000/moveFreq)
        } else {
            playGameMove(gameBook[gameNum], moveNum)
            setTimeout(() => {
                setMoveNum(moveNum + 1)
            }, 1000/moveFreq)
        }
    }, [moveNum])

    return (
        <div 
            style={{
                width: "100%", 
                height: "auto",
                background: "transparent"
            }}
        >
            {[0,1,2,3,4,5,6,7].map((row) => 
                <div 
                    style={{
                        display:"flex",
                        width: "100%"
                    }}
                >
                    {[0,1,2,3,4,5,6,7].map((col) => {
                        var piece = board[flipped? 63 - (row*8+col) : row*8+col]
                        return (
                            <div
                                style={{
                                    width: "calc(100%/8)", 
                                    height: 0,
                                    padding:"calc(100%/16) 0",
                                    backgroundColor: (row + col)%2? bSqColor : wSqColor,
                                    borderRadius: "15%",
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    fontSize: "26px"
                                }}
                            >
                                {piece != " " &&
                                    <FontAwesomeIcon
                                        icon={getPieceIcon(piece.toLowerCase())}
                                        style={{color: piece == piece.toUpperCase()? wPcColor : bPcColor}}
                                    />
                                }
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
const getPieceIcon = (str: string) => {
    switch (str) {
        case 'p': return faChessPawn
        case 'n': return faChessKnight
        case 'b': return faChessBishop
        case 'r': return faChessRook
        case 'q': return faChessQueen
        case 'k': return faChessKing
    }
    return faChessKing
};
const letToNum = (letters: string) => {
    return (letters[0].toLowerCase().charCodeAt(0) - 97) + (8-Number(letters[1])) * 8
}
const replaceAt = (str: string, index: number, replacement: string) => {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
}

export default Chess;