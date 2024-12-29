# poly-cli
A rather simple cli for having conversations with bots on "https://polybuzz.ai/" written in NodeJS.

# Major Issues
1. if there is any issues with a fetch request there is no error handeling. EX: if a invalid cookie or BotId is used it will throw an error.

# Usage
You can set all of the values like the BotId, Cookie and Nickname in the env file and those will be defaults
```
node index.js
```
Commands:
-n, --nickname <nickname> | 
