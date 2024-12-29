# poly-cli
A rather simple cli for having conversations with bots on "https://polybuzz.ai/" written in NodeJS.

# NOTE
This is my first real post to github in a proper sence, also I am not used to using a lot of the things in nodeJS so my formatting is not the best not to mention I barly know how to use most of the librarys used here. Sorry for the inconvenience.

# Major Issues
1. if there is any issues with a fetch request there is no error handeling. EX: if a invalid cookie or BotId is used it will throw an error.

# Usage
## To Run:
```powershell
node index.js
```
## Commands:
-n, --nickname <nickname> | Sets a Nickname
-b, --botid <botid>       | Sets a BotId
-c, --cookie <type>       | Sets a Cookie

## ENV
You can use this entirly threw commands but you can also set defaults inside of the .env file for if you dont want to put it in the command.
This is useful for storing your cookie so you don't have to put it in the command every time.
Id also suggest you set your Nickname here instead of in the command it's self as it just makes it easier to use the program.

## Example Usage
```powershell
node index.js -b BotId -n Name -c cookie-here
```
