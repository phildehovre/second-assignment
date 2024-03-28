

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
For more information, it is recommended to peek into the files themselves, where plenty of explicit comments are disseminated within the code.


## Development

### Visual design

The overall theme for the application revolves around white and a dark blue. These colors evoke calm and should convey a sense of peace.

I am fond of websites that have a minimalist design style and I tried to reproduce this.
For example, the first thing you see when opening the app is the word Stability fading into view, revealing a starry fixed background that provides the contrast needed to 
discern it. This is a small design element that has, in my view, a strong visual payoff and takes up very little page real estate.

![Screenshot 2024-03-28 125657](https://github.com/phildehovre/first-assignment/assets/66724307/85322857-b5a8-4da1-b09c-fe3370ec300c)

### Features

### Today

Upon click on "Start your journey", the user will be prompted to answer a series of questions presented in the form of cards (At this stage the questions a merely placeholders).
Once all questions for the day have been answered, the user will be presented with a summary of their answers and invited to submit them.
The form submission is not yet implemented, for the time being, the data is simply logged to the console.

Upon navigation to the page:

![today](https://github.com/phildehovre/first-assignment/assets/66724307/5302f81c-1bcd-412a-bf1b-306161829b39)

Upon completion of the form:

![today_form_completed](https://github.com/phildehovre/first-assignment/assets/66724307/84d22eef-724f-423f-9705-758232d02361)



## Performance:

Initially, the website recorded below average performance. upon further inspecting, lowering the quality of the image (Using Cloudinary) proved to be the determining factor in improving it.
It is to be noted that lighthouse performance measurements of best practices are heaviliy diminished by the use of cloudinary third-party cookies.
I will investigate further how to resolve this issue in the future.

Initially:

![Screenshot 2024-03-28 120226](https://github.com/phildehovre/first-assignment/assets/66724307/227312af-9fa2-4d2e-896d-a63d8c90f36a)

Image reduced to 60% quality and served as a .webp:

![Screenshot 2024-03-28 120935](https://github.com/phildehovre/first-assignment/assets/66724307/219b3f3f-4105-4225-8b30-b44bbdd4b7dd)

Image reduced to 50% quality:

![Screenshot 2024-03-28 121425](https://github.com/phildehovre/first-assignment/assets/66724307/641a60c3-49a5-4c40-a59e-593a5396841a)

Cloudinary cookies notification:

![Screenshot 2024-03-28 120957](https://github.com/phildehovre/first-assignment/assets/66724307/e9ad9421-1749-469a-b28d-6e4d0430d0f4)

## Validation and accessibility

HTML markup validator:

![html_validator](https://github.com/phildehovre/first-assignment/assets/66724307/393fb433-2d49-4b9a-a306-4542fb4b9c17)

CSS validator:

![css_validator](https://github.com/phildehovre/first-assignment/assets/66724307/052274af-aedc-41d7-9377-86671ccb16a9)


___
## Credits:

Icons by Fontawesome: https://fontawesome.com/
picture by Photo by David Kanigan: https://www.pexels.com/photo/silhouette-of-a-lonely-tree-during-sunset-15571684/

___

## Additional resources:

Motivational interviewing techniques:
[https://www.ncbi.nlm.nih.gov/books/NBK571071/]
> Enhancing Motivation for Change in Substance Use Disorder Treatment
> Updated 2019
> Treatment Improvement Protocol (TIP) Series, No. 35
> Rockville (MD): Substance Abuse and Mental Health Services Administration (US); 2019.
