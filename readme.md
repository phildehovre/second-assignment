

# Readme
## Concept

Stability is a journalling application that allows users to track and monitor day-to-day habits and moods. 
The goal is to identify patterns of behaviour and their potentially less than positive consequences on one's mental and physical health.

### How? 

I have have recently taken a keen interest in applications that help improving mental and physical health, not simply by monitoring the user's physical activity,
but by giving the users a 30,000ft view of their situation. This is based on the concept of motivational interviewing techniques (or, "MI"). 

> “Motivational interviewing is a person-centered counseling style for addressing the common problem of ambivalence about change.”
> —Miller & Rollnick, 2013, p. 21

The user is initally given a series of questions to establish their profile and determine what kind of issues they are facing or set of habits they want to monitor.
(Disclaimer: For the time being, the questions that currently appear on the website are placeholders for the initial line of questionning and are neither dynamic nor recorded on a sever).

(Not yet implemented)
The data will be piped through a large language model that will extract and organise the data into several categories and generate a new set of questions.
Everyday, the model will digest the data and customise the line of questionning to help the user make informed decisions about their issues.

For example: 
- Day 0: The user states one of their goals to be "improve physical health";
  - This will generate a dedicated portion of the dashboard to include a set of options for the user to start investigating their options.
    These might include giving them some options for how to go about achieving that goal and maybe set a deadline for taking those first steps.
    (Picking a physical activity they like, joining a gym and browsing the classes they offer, checking out online yoga classes, joining a local football team, etc.)
    
- Day 1 or n (depending on deadline): A new set of questions is generated based on the initial footprint. These questions will check on the progess, mood and overall mindset.
  
- Day n + 1: Narrow down on previous set of answers and repeat the process.
  
This will populate a dashboard that is specifically tailored to their profile.

## Project breakdown

### Folder organisation

#### HTML

Located at the top level of the codebase are all html markup files, each file contains the structure for the pages the user is able to visit.
Within each file are two placeholders, one for the navigation bar, the other for the footer. Since their content is the same on every page,
it is injected via Javascript.

#### Assets

The assets folder contains three folders that separate the **stylesheets**, **images & icons** and **scripts**.
For more information, it is recommended to peek into the files themselves, where plenty of explicit comments punctuate the code itself.


## Development

### Initial


### Visual design


### The mechanics




___
## Credits:

picture by Photo by David Kanigan: https://www.pexels.com/photo/silhouette-of-a-lonely-tree-during-sunset-15571684/

___
