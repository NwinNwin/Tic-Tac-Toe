#About Tic-Tac-Toe Plus:

A fully responsive Tic-Tac-Toe web game that can be played on any device (desktop, smartphone, tablet). The game features a clean and intuitive interface making it easy for players of all skill levels to jump right into the action. There are three modes: AI, multiplayer, and offline.
- In AI mode, players can challenge the computer to a game and select their desired difficulty level, ranging from easy to impossible. Players also have the option to adjust the AI’s turn (X || O). This allows players to test their skills against opponents of varying skill levels.
- In Multiplayer Mode, players can create their own game room and invite friends to join. Play against a friend in real-time and communicate using the real-time chat feature.
- The Offline mode is perfect for players who want to play with friends in the same physical location. The interactive scoreboard keeps track of scores between players, making it easy to keep track of who's winning.

#How I Built It:

###AI MODE:

- The AI mode of the tic-tac-toe game utilizes a recursive decision-tree algorithm known as Minimax to make strategic choices during gameplay. This algorithm allows the computer to calculate the potential winning and losing possibilities for each of the remaining tic-tac-toe options on the board, and to choose the best possible move for each turn. 
The difficulty level in the AI mode is determined by the number of steps ahead that the computer is able to consider when making its moves. For example, in easy mode, the AI is only able to think 1 step ahead, while in impossible mode, the AI is able to consider up to 100 steps ahead. This allows players to choose the level of challenge that best suits their skills, and to gradually increase the difficulty as they become more proficient at the game. 

###MULTIPLAYER MODE:

- The multiplayer mode gameplay and real-time chat feature utilize the Socket.IO library to enable real-time communication between the client and server. This allows two players to communicate and take turns playing the game, as well as create and join game rooms. The use of Socket.IO ensures that the multiplayer experience is smooth and responsive, allowing players to fully engage with the gameplay without any delays or disruptions.
	
###OFFLINE MODE:

- The offline mode utilizes React hooks, including useEffect and useState, to optimize the gameplay experience. These hooks enable the efficient reuse of components and re-rendering of the website, resulting in a smooth and responsive player experience


#What I Learned:

Throughout the three-week development of this game, I had the opportunity to practice my front-end development and programming skills. Prior to this project, the concept of React Hooks such as useEffect and useState was still new to me. However, I dedicated the majority of my time to learning the basics of React before diving into the development process. This allowed me to better understand and utilize these Hooks in my code. In addition, I practiced the concept of recursion in Javascript to solve complex problems in an efficient manner. There were times during development when I almost gave up, but by managing my time effectively and setting low expectations for myself, I was able to make steady progress toward my goal and ultimately complete the game.

