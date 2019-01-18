There are 5 default puzzles in this set, S0 through S4. S5 is a test puzzle. Also check sudoku.js, there is a variable n_p in line 4 with the value 5. It stands for number of puzzles.
Each of the puzzle files contains exactly 81 characters. They are the 81 numbers in the puzzle stored in column-major-order with 0 in the empty positions.
My algorithm can generate 2.5 trillion different puzzles from just one of the current 5 puzzles.
To add new puzzles, first rename or delete S5, the test puzzle. Then add the new puzzle files following a continuous numbering scheme. Then update n_p in line 4 of sudoku.js to the correct number of puzzles.
Note that the current 5 puzzles are arranged in increasing order of difficulty, S0 being the easiest and S5 the hardest. This doesn't matter though, since the puzzles are chosen randomly, there's no way to select difficulty.

In sudoku.js, there's a commented line 146. Uncomment it and write a function named success to handle further actions on win.