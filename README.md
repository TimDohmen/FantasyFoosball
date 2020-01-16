# Fantasy - Fooooootball


<img src="https://sportshub.cbsistatic.com/i/r/2019/09/26/f81faf11-54b5-4c2f-9d7f-d129b9e45803/thumbnail/640x360/9848805b319ccb9c8891ee149e020ce7/college-football-general.jpg"/>

<hr>
 Fantasy Hand-Egg!!! OK, Football. In case you have never participated in a fantasy football league here is a basic overview from NFL.com:

```Fantasy football, like other fantasy games, puts you in the front office and on the sidelines as General Manager and Coach of your team. You select from a list of the best players in the NFL and they compete on a weekly basis for your team.```

 For this project we will be creating a dynamic roster that allows users to add and remove players to a team as well as search all the NFL filtering the results by player name, team, or position. We will look at working with an API to get the real info available from the NFL.
<hr>

<h2>Goals</h2>

In this checkpoint students will demonstrate their understanding of working with the DOM and dynamically rendering data to the page. They will be responsible for writing functions to filter the players by team and position, follow the MVCs pattern, and manipulate the DOM based off given input.


<hr>

### Step 1. 
At the start of the application we will need to retrieve player data from an external source.
We should only have to retrieve the data once, then we can store it to a local variable inside our footballService.
Next we will need some way to filter player data by certain properties such as Name, Position, Team, etc...
To make it simple we will start with 2 basic functions

```js
getPlayersByTeam(teamName)
```

this method receives a name of a team and returns an array of all players on that team

```js
getPlayersByPosition(position)
```

this method receives a player's position and returns an array of all players with that position

Each function relies on the data retrieved from the external source.
Lastly we will need some way to add players to a user team array
The usersTeam will be private so it will need a public getter that will simply return a copy of the usersTeam

Based on this outline, we know our service needs to have player data, and a few functions. Let's put a few examples in just to get the ball rolling. We will eventually want to sort players somehow so adding in the ability to do this by team and by position might be a good start.

```js
class PlayersService{

  getPlayersByTeam(teamName){
    //return an array of all players who match the given teamName.
  }

  getPlayersByPosition(position){
    //return an array of all players who match the given position.
  }
}
```

<hr>

### Step 2. 
Once we have the skeleton laid out, we can implement the functionality. We will use a method called .filter().

In its simplest form, Array.filter is a way to filter a large array into a smaller array, based on a certain condition. It does this by taking in a callback function (or a function passed as a parameter) and running it for each item in the array.

That function will be responsible for keeping the item in the array or if it is to be removed from the array.

##   Note, Array.filter() does not modify the original array; instead it creates a new one.

Here is an example of filter in action:



```js
class PlayersService(){
    
    getPlayersByTeam(teamName){
    let allPlayers = [];
    playerData =  allPlayers.filter((player){
      if(player.team == teamName){
        return true;
      }
    });
  }
} 
```
Now we just need to write the function to get the player data from the API. And call that function every time we create a new Players Service. Luckily enough there has been some code snippets left in the PlayerService for this.

When you are able to draw the players to your screen the next step you will want to do is find a way to add them to your team. 

<hr>

### The rest of the application is up to you to write, including how you might add each of these players to your 'fantasy team'

Before you are turned loose there are a few things you will want to know about this API. First, it will give you back a ton of data, and not all of it comes how you would expect, nor is all of it usable. Since this is coming from a fantasy football API each team will have "players" that aren't actual people.

For example the Seahawks have a player with the name "Seahawks" and the position of "D" in a fantasy league this represents the entire defense, giving the player all the points racked up from the defence. It is up to you if you want to keep these "empty" players in your roster.

Additionally you will find some of the players pictures are different sizes or non-existant make sure that you have contingencies for such things.

Once it is all set up feel free to re-integrate adding players, adding and removing players from your roster, etc.

Good luck, and Happy Coding.

# REQUIREMENTS

<b>Functionality</b>
<li>Utilizes a PlayerService & PlayerController</li>
<li>Players can be added and removed from user team</li>
<b>Visualization</b>
<li>Players can be filtered by Team</li>
<li>Players can be filtered by Position</li>
<li>Players can be filtered by Name</li>
<hr>
<sm><b>Bonus Challenges</b></sm>
<li>Only one instance of a player on the team is allowed</li>
<li>Teams have a max size</li>
<li>Only one player of each position</li>





