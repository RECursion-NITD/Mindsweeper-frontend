import React from 'react'
import "./rules.css"
const Rules = () => {
  return (
    <div className='main-rules'>
        <div className='rules-container'>
            <div className='head-meain1'>
                Use Laptop For Best Experience
            </div>
            <div className='nerdle-head'>
                <div>
                    Nerdle:
                </div>
                <div>
                    Guess the Number Game
                </div>
            </div>
            <div>
                <div className='obj-head'>
                    Objective:
                </div>
                <div className='obj-content'>
                    Guess the secret number sequence using mathematical calculations within six
                    Attempts.
                </div>
            </div>
            <div>
                <div className='rules-main'>
                    Rules:
                </div>
                <div className='rules-content'>
                Write a mathematical expression using the digits 0-9 and the operators +, -, *, /, and =. Ensure there's only one equals sign and only one operator among +,-,/,* should be there and the number on the right side represents the result of the calculation.
                </div>
                <div className='rules-content2'>
                After each guess, the tiles will change colour to give you clues.
                    <div>
                        Green = correct character, in the correct position.
                    </div>
                    <div>
                        Purple = correct character, in the wrong position.
                    </div>
                    <div>
                        Black = incorrect character.
                    </div>
                </div>
                <div>
                    Use the feedback from each guess to refine your next attempt. Pay attention to 
                    the colors of the tiles to narrow down the possibilities.
                </div>
                <div>
                    You have six attempts to guess the correct sequence of digits. If you don't guess it within six tries, the game ends.
                </div>
            </div>
            <div className='game2'>
                <div>
                    <div className='game2-head'>
                        Constellations: 
                    </div>
                </div>
                <div className='game2-obj'>
                    Objective:
                </div>
                <div>
                    Fill a tree with 7 nodes using consecutive odd integers 1,3,5,7,9,11,13 ensuring each edge has a distinct difference.
                </div>
                <div className='rules-game2'>
                    Rules:
                </div>
                <div>
                The player must assign 7 consecutive odd integers to the nodes of the tree.
                </div>
                <div>
                Each edge in the tree must have a distinct difference.  
                </div>
                <div>
                The difference for each edge is calculated by subtracting the value of the node with the smaller number from the value of the node with the larger number.
                </div>
                <div>
                The player wins by successfully assigning 7 consecutive odd integers to the nodes of the tree such that each edge has a distinct difference.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Rules