

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


### The mechanics




## Performance:

Initially, the website recorded below average performance. upon further inspecting, lowering the quality of the image (Using Cloudinary) proved to be the determining factor in improving it.

Initially:
![Screenshot 2024-03-28 120226](https://github.com/phildehovre/first-assignment/assets/66724307/227312af-9fa2-4d2e-896d-a63d8c90f36a)

Image reduced to 60% quality and served as a .webp:
![Screenshot 2024-03-28 120935](https://github.com/phildehovre/first-assignment/assets/66724307/219b3f3f-4105-4225-8b30-b44bbdd4b7dd)

Image reduced to 50% quality:
![Screenshot 2024-03-28 121108](https://github.com/phildehovre/first-assignment/assets/66724307/04ee7a9d-29de-457e-8815-f6016ea700f4)
![Screenshot 2024-03-28 121425](https://github.com/phildehovre/first-assignment/assets/66724307/641a60c3-49a5-4c40-a59e-593a5396841a)

- [x] Learning Outcomes
  - [x] LO1 Design an interactive Front-End web application using HTML and CSS based on the principles of user experience design, accessibility and res
ponsivity
  - [x] LO2 Test a Front-End web application through the development, implementation and deployment stages
  - [x] LO3 Deploy a Front-End web application to a Cloud platform
  - [x] LO4 Maximise future maintainability through documentation, code structure and organisation
  - [x] LO5 Demonstrate and document the development process through a version control system such as GitHub

- [ ] Pass Performance
  - [ ] LO1 Design an interactive Front-End web application using HTML and CSS based on the principles of user experience design, accessibility and responsivity
    - [x] 1.1 Design a website that incorporates a main navigation menu and a structured layout
    - [x] 1.2 Design a website that meets accessibility guidelines (e.g. contrast between background and foreground colours, non-text elements have planned alt text equivalents to cater for the visually impaired)
    - [x] 1.3 Design the organisation of information on the page following the principles of user experience design (headers are used to convey structure, information is easy to find due to being presented and categorised in terms of priority)
    - [x] 1.4 Ensure that foreground information is never distracted by backgrounds
    - [x] 1.5 Include graphics that are consistent in style and colour
    - [x] 1.6 Design the site to allow the user to initiate and control actions such as the playing of audio/video.
  - [ ] LO2 Test a Front-End web application through the development, implementation and deployment stages
    - [x] 2.1 Create a website of at least three pages, or (if using a single scrolling page) at least three separate page areas to match the design and to meet its stated purpose
    - [ ] 2.2 Write custom HTML code that passes through the official W3C validator with no issues.
    - [ ] 2.3 Write custom CSS code that passes through the official (Jigsaw) validator with no issues
    - [x] 2.4 Incorporate images that are of sufficient resolution to not appear pixelated or stretched
    - [ ] 2.5 Code all external links to open in a separate tab when clicked
    - [x] 2.6 Use CSS media queries across the application to ensure the layout changes appropriately and maintains the page's structural integrity across device screen sizes.
    - [x] 2.7 Use Semantic markup to structure HTML code
    - [x] 2.8 Present the finished website with clearly understandable site-specific content, rather than Lorem Ipsum placeholder text
    - [x] 2.9 Implement clear navigation to allow users to find resources on the site intuitively.
  - [ ] LO3 Deploy a Front-End web application to a Cloud platform
    - [x] 3.1 Deploy a final version of the code to a cloud-based hosting platform (e.g. GitHub Pages) and test to ensure it matches the development version
    - [x] 3.2 Use Git & GitHub for version control of an interactive web application up to deployment.
    - [x] 3.3 Remove commented-out code before pushing final changes to version control and deploying.
    - [x] 3.4 Ensure that there are no broken internal links
    - [ ] 3.5 Insert screenshots of the finished project in the README
  - [ ] LO4 Maximise future maintainability through documentation, code structure and organisation
    - [ ] 4.1 Write a README.md file for the web application that explains its purpose, the value that it provides to its users, and the deployment procedure.
    - [ ] 4.2 Insert screenshots of the project features, give a brief description of what each feature does and explain its value to the user.
    - [ ] 4.3 Attribute all code from external sources to its original source via comments above the code and (for larger dependencies) in the README.
    - [x] 4.4 Clearly separate and identify code written for the website and code from external sources (e.g. libraries or tutorials)
    - [x] 4.5 Organise HTML and CSS code into well-defined and commented sections
    - [x] 4.6 Place CSS code in external files linked to the HTML page in the HEAD element.
    - [x] 4.7 Write code that meets at least minimum standards for readability (consistent indentation, blank lines only appear individually or, at most, in pairs)
    - [x] 4.8 Name files consistently and descriptively, without spaces or capitalisation to allow for cross-platform compatibility.
    - [x] 4.9 Group files in directories by file type (e.g. an assets directory will contain all static files and may be organised into sub-directories such as CSS, images, etc.)
  - [x] LO5 Demonstrate and document the development process through a version control system such as GitHub
    - [x] 5.1 Use consistent and effective markdown formatting to produce a README file in English that is well-structured, easy to follow, and has few grammatical errors.

___
## Credits:

picture by Photo by David Kanigan: https://www.pexels.com/photo/silhouette-of-a-lonely-tree-during-sunset-15571684/

___

## Additional resources:

Motivational interviewing techniques:
[https://www.ncbi.nlm.nih.gov/books/NBK571071/]
> Enhancing Motivation for Change in Substance Use Disorder Treatment
> Updated 2019
> Treatment Improvement Protocol (TIP) Series, No. 35
> Rockville (MD): Substance Abuse and Mental Health Services Administration (US); 2019.
