This is an interpreter for the brainfuck language.
Specifications:
All commands should work as expected except perhaps the ',' command
The ',' command will receive input
  If the receieved input is only one character long, the current cell will be given the corresponding ascii value, and you will be prompted for any following ',' commands
  If the receieved input is longer than one character, each character in the given string will be fed into any following ',' commands followed by a NUL character (0 in array) and then you will be prompted if a ',' character is needed again
Cells are 8 bits, the array length is prompted at the beginning, cells roll from 0 to 255 and vice versa, and going outside the array is not allowed

Refresher:
Character	  Meaning
'>'	          increment the data pointer (to point to the next cell to the right).
'<'	          decrement the data pointer (to point to the next cell to the left).
'+'	          increment (increase by one) the byte at the data pointer.
'-'	          decrement (decrease by one) the byte at the data pointer.
'.'	          output the byte at the data pointer.
','	          *outlined above*
'['	          if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
']'	          if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.
