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

## Example Usage
```powershell
node index.js -b BotId -n Name -c cookie-here
```
