# Project_Prioritization_Server

CA Final Assessment Server

----

<br />

# R6.Deploy the application to a cloud hosting service & R10. A link (URL) to your deployed website

Front-End

Netlify: <https://projectprioritization.netlify.app>

Back-End

Railway: <https://projectprioritization.up.railway.app/api>

Heroku: <https://projectprioritization.herokuapp.com/api/>

# Access to our app

```
for employees

 - email: user1@gmail.com

 - password: test@123
```

```
for managers

- email: ana@test.com

- password: test@123
```

# R1.At a minimum use the following technologies:

We built a MERN full-stack app "Project Prioritisation" by:
Front end:

- HTML
- CSS
- React
- MUI

Back end:

- Node JS
- Express framework for Node JS
- Mongoose for object modelling

Database and storage:

- MongoDB Atlas document database

Hosting:

- Heroku and Railway to host the back-end content

- Netlify to host the front-end content

Testing:

- Jest: Backend Testing: <mark>npm start test</mark>

- Cypress: Frontend Testing: <mark>npx cypress open</mark>


# R2.Write well designed code that:

- Separates the program into modules that each deal with one particular focus, or concern

  The code files for the application is separated into two directories that are linked to two separate Github repositories, Project-Proritization-Client-2 (for front end) and Project-Proritization-Server (for back end).

    <br />

    <details><summary>Frond End</summary>

  ![Modules](/docs/images/modulesfrontend.png)

    </details>
    
    <br />

  The front end code is categorised into different folders based on their purpose:

  - The docs folder contains images and the manual testing excel. 
  
  - The @mui folder contains the styling framework for the app. 
  
  - The components folder contains components that make up each page of the website. Some of these components are reused throughout the website such as the ticketTable in the tickets folder. We also have some main website components such as Header, Logo, and Navbar, and put page components into their own folders. For example, we put the headers of the tickets relevent pages into the ticket folder. The most important component is TicketTable. 
  
  - The pages folder contains all the pages will be displayed on the main screen or the "Outlet /" Part from react-dom-router.

  - The service folder contains code with API action that communicates with back-end code. 
  
  - The utils folder contains StateContext.jsx and StateReducer.jsx. We used GlobalContext and Reducer in our project.
  
  - The tests folder contains code for Jest testing for the functionalities of our app that interacts with users.

  - The cypress folder is for Cypress tests only.
  
  - The config folder contains Axios connecting settings.
  
  - The user folder contains signin, signup and profile forms.

  - The header folder contains Searchbar and AccountPopover components.

  - The archives folder contains Ana's all the initial front-end code for employee users to create, delete, edit, submit, and search tickets.

  <br />

  <details><summary>Back End</summary>

  ![Modules](/docs/images/modulesbackend.png)

  </details>
  
  <br />

  The back end folder contains four main sub-directories where the modules reside:

  - The controller folders contain the code where Express interacts with the MongoDB Atlas database to store and retrieve data. Controllers are grouped by page and/or functionality. For example, user signup, signin and edit profile functions are grouped in the auth.controllers.js file in the controllers folder.

  - The model folders contain the mongoose schema for each controller.

  - The route folders contain the routes used by Express routers. The routes are grouped by page and/or function. For example, all user routes (signin, edit, signup) are contained in the users.route.js routes file.

  - The test folder contains the jest test file for each router in the route folder.

  - The middleware folder contains the middlewares for authorization, role judgement, and schema validation. For example, user.middleware.js is to help to grant the role of the user after isAuth middleware.

- Demonstrates DRY (Don’t Repeat Yourself) coding principles

  We tried to reuse the ticket form as much as possible. For example, users can use the ticket form for both creating and editing before submission. All the ticket submitted listing table is used by both Listing.jsx and SearchResult.jsx. The navigation bar component is contained in the main App.js file in the front-end so that it only needs to be called on once, without having to be included in the render function of each page.

- Uses appropriate libraries

  We used Axios to shorten the code required to make HTTP requests.

  We used Date-fns to format our dueDate for users to choose the date for their project deadline.

  We used Cors to enable data to be transmitted between the back-end and the front-end. It allows the use of a custom API.

  We used JSON web token that allows users to create a token based on their email address for authentication.

  We used Nodemon to allow the express server to restart automatically after changing each code.

  We used UUIDV4 to generate a unique token to validate users.

  We used Jest and Supertest for unit testing for our front-end and back-end.

  We used Cypress to do automated integration testing. It allows a code coverage report to be generated after running tests in Cypress.

  We used bcrypt to hash the password.

  We used body-parser to convert JSON to url-encoded.

  We used JWT for web token. Our token is signed by using a private secret key. Our server can generate a token that has the claim "logged in as administrator" and provide that to our client. 

  We used react-router-dom to implement dynamic routing in our web application. 

  We used Material UI to style our website. 

  <br />

- Demonstrates good code flow control for user stories

  We used the user stories for the code control flow during our coding process. Each feature/function contains the expected output from our user stories. For example:

  User story 1 Idea submission

  As Yel, Software Engineer, I want to communicate my project ideas to my team, so I need to fill a form and submit it to my team/manager.

  Acceptance Criteria

  “We have to formally fill in an online form if we want to share our project ideas to the team.” – Yel

  <br />

    <details><summary>In ticketService.jsx:</summary>

  //create a ticket

  ```Javascript
  import projectAPI from "../config/api";

  export async function createTicket(ticket) {
    const response = await projectAPI.post('/api/tickets/new', ticket);
    return response.data;
  }
  ```

    </details><br />

  <details><summary>In StateReducer.jsx:</summary>

  ```Javascript
  export default function reducer (state, action) {
      switch(action.type) {
          case 'addTicket': {
              return {
                  ...state,
                  tickets: [action.data, ...(state.tickets || [])]
              }
          }
  ```

  </details><br />

  <details><summary>In TicketForm.jsx:</summary>

  ```Javascript
    function handleClick(event) {
    event.preventDefault();
    //if statement to handle update ticket and create ticket
    if (_id) {
      // from saved ticket to submitted
      updateTicket({
        _id: _id,
        ...formState,
        isSubmitted: event.target.value,
        dueDate: dateValue,
      })
        .then(() => {
          dispatch({
            type: "updateTicket",
            data: {
              id: _id,
              ...formState,
              isSubmitted: event.target.value,
              dueDate: dateValue,
            },
          });
          //if user update ticket with form, leave ticket to show on the page.
          navigate(`/mytickets/${_id}`, {
            state: { ticket: JSON.stringify(ticket) },
          });
        })
        .catch((error) =>
          setError(error.response.data.errors || error.response.data.error)
        );
    } else {
      // from creation to submitted
      console.log(event.target.value);
      createTicket({
        ...formState,
        ticket_id: uuidv4(),
        isSubmitted: event.target.value,
        dueDate: dateValue,
      })
        .then((ticket) => {
          dispatch({ type: "addTicket", data: ticket });
          //we can navigate back to the my tickets page once we create a ticket.
          event.target.value === "false"
            ? navigate("/mytickets")
            : navigate("/submissionsuccess");
        })
        .catch((error) =>
          setError(error.response.data.errors || error.response.data.error)
        );
    }
  }

           <Stack direction="row" mt={2} spacing={2}>
              <Button
                variant="contained"
                color="warning"
                value={false}
                onClick={handleClick}
                disabled={saveButton}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color={colorButton}
                value={true}
                onClick={handleClick}
              >
                {saveButton ? "Update" : "Submit"}
              </Button>
          </Stack>
  ```
  </details>

  <br />

  Another example to demonstrate good code flow control for user stories:

  Using conditional rendering to make sure that only authorised users are allowed to enter the main page.

  <details><summary>Rendering Condition</summary>

  <br />

  ![condition 1](docs/images/Condition1.png)

  <br />

  ![condition 1](docs/images/Condition2.png)
  </details>

  <br />

- Applies Object Oriented (OO) principles/patterns & Uses appropriate data structures

  - In order to write more testable, flexible, and maintainable code, we followed the four principles of object-oriented programming: abstraction, inheritance, encapsulation, and polymorphism. We reused code of existing objects, used states and methods for our functions, and controllers and models for the architectural pattern to develop our user interfaces. 
 
  - For our application, each component has its own function and each page is written as a function with all the functionality for the page that contains various methods. Our structure is followed:

- Function name

- State objects contains keys with values that are subject to change

- UseEffect to fetch data from the MongoDB database and render it on the page

- All the functions to control the functionality. e.g. handleChange and handleClick allows users to fill and submit the form.

- A render function to display the contents of the page

  - For example, when a ticket form is completed from the front-end, a new ticket is created from the values of the form. Then the information is saved and a HTTP request is sent to the back-end.


# R3. Employ and utilise proper source control methodology (git)

We used Git and Github as our source control tool. The team worked off three repositories: one is for the frond-end for both team members because the frond-end has a lot of work [Common_Frontend](https://github.com/AnaBondiguel/Project-Prioritization-Client-2.git). The second one is for the back-end for Chen's individual work [Chen_Backend](https://github.com/OrangeKami/Project_Prioritization_Server.git). The third one is for the front-end for Ana's individual work [Ana_Frontend](https://github.com/AnaBondiguel/Project_Prioritization.git). Eventually, Ana merged her front-end work from her individual repository to the front-end repository in common for both members. We did use branches for developing a particular feature or styling framework or testing, etc. Once the branch code was agreed, we pulled requests to merge the changes to the master branch. When merge conflicts arise we will talk and check with the person whose code is causing the conflicts.

<details><summary>Image</summary>

![Git1](/docs/images/gitbranch1.png)
![Git2](/docs/images/gitbranch2.png)

</details><br />

# R4. **Demonstrate your ability to work in a team**:

- Use a recognised project management methodology & a recognised task delegation methodology

  We used Trello to manage our project and chose to adopt an agile project management methodology to develop our application because we needed to have faster feedback cycles so we can identify problems earlier, prioritise more important tasks, and meet our client requirements. We used Trello to divide our project into several incremental steps with regular feedback from our users and the two of us. We prioritized smaller pieces of the project requirement by their importance and organised regular meetings to ensure our latest developments meet our client's expectations. Therefore, we can effectively respond to changing requirements.

  A Trello board was used to track miscellaneous tasks and demonstrate who is in charge in a certain task.

  [TrelloWebsite](https://trello.com/invite/b/XXhZNZa6/ATTIbe36218bf499d6eb7509d296e159711cC3BA5D35/project-prioritisation-application)

  ![Trello](/docs/images/Trello.png)

  We divided our project between both of us: Chen was responsible for the back-end [Chen_Backend](https://github.com/OrangeKami/Project_Prioritization_Server.git). Ana was responsible for the front-end [Ana_Frontend](https://github.com/AnaBondiguel/Project_Prioritization.git) and built all the features/functionality for employee users to create, delete, edit, submit, and search tickets. Once Chen did the back-end, Ana connected her front-end to the back-end and fixed all the bugs. Then Ana merged her front-end to their common front-end respository[Common_Frontend](https://github.com/AnaBondiguel/Project-Prioritization-Client-2.git), so Chen could continue to build all the features for manager users to create and delete feedback and edit ICE scores. Ana wrote up all the documentations, and Chen improved page styling. We set up a meeting every Monday to discuss the week plan and chart regularly the Discord if there are problems that need to be solved immediately. For the details of each member's responsibilities, please see our Trello board.

   ![Discord](/docs/images/Discord.png)
 
# R5. Produce a working application that meets client and user needs

During the requirements gathering process, the client emailed us a number of features and services he would like to be included in the site:

### Add, edit, delete, and submit project tickets

- Our client's primary request is to be able to collect project ideas from all the people in Canva, so we decided to create a feature that users can submit their project tickets online. 

  <details><summary>Image</summary>

  ![NewTicket](/docs/images/NewTicket.png)
  ![TicketDetails](/docs/images/TicketDetails.png)
  ![EditTicket](/docs/images/EditTicket.png)
  </details>

### Edit ICE scores

- When managers log into their account, they want to edit the fields of impact, confidence, and effort in order to change the ICE score for a particular project ticket. Once they changed the ICE scores, they can provide feedback to explain the changes of ICE scores.

  <details><summary>Image</summary>

  ![Edit_ICE](/docs/images/ICE_Score.png)
  </details>
### Add submission status

- Our users sent us feedback about how they were going to know whether they had submitted their tickets or not. We decided to add a ticket status feature to make users easily identify the ticket submission status.

  <details><summary>Image</summary>

  ![Submission_Status](/docs/images/submission_status.png)
  </details>

### Add, view and delete project feedback

- The managers want to be able to write feedback to their team members, so we decided to create a feature that manager users can submit their feedback online.

  <details><summary>Image</summary>

  ![Feedback](/docs/images/Feedback.png)
  </details>

### Be able to view their own ticket detail, manager's feedback, and ticket list

- Our client wants to be able to view the own ticket details and feedback as well as their own ticket list. We list tickets (including both not submit and submitted) in the table to show to our users tickets, and also show their ticket information and feedback in the ticket details page.

  <details><summary>Image</summary>

  ![ViewTicketFeedback](/docs/images/ViewTicketFeedback.png)
  ![ViewMyTicketList](/docs/images/MyTicketList.png)
  </details>

### Be able to view all the submitted tickets from everyone

- Our client wants to be able view all the submitted tickets from everyone in the company. We list tickets (submitted only) in the listings page.

  <details><summary>Image</summary>

  ![ViewListings](/docs/images/ListingPage.png)
  </details>

### Edit user profile

- We designed a user profile to allow our users to be able to edit their account information as they requested. 

  <details><summary>Image</summary>

  ![Account](/docs/images/Account.png)
  </details>

### Sign in & Sign up

- Sign in and sign up pages are the common standards for users to register into the application.

  <details><summary>Image</summary>

  ![SignIn](/docs/images/SignUp.png)
  ![SignUp](/docs/images/SignIn.png)
  </details>

### Search for project tickets

- Our client wants to be able to find a particular ticket as they need, so we built a search bar for them. They can search for the project initiative, target, and owner.

  <details><summary>Image</summary>

  - ![Search_Bar](/docs/images/Searchbar.png)
  </details>


# R7 Produce an application with an intuitive user interface

- For MyTickets page and listings page, we made a ticket initiative with a clicked link because we want users to go to the ticket details page to view ticket information if users are interested in a particular project ticket. We also enabled users to view their ticket status (not submit/submitted) in the MyTickets page, this feature will inform our users which ticket has been submitted/completed and which ticket still needs to work on.

  <details><summary>Image</summary>

  ![TicketLink](/docs/images/TicketLink.png)
  ![TicketStatus](/docs/images/TicketStatus.png)
  </details>

- For the NewTicket page, we used select components from MUI to allow users to choose setup values of impact, confidence, effort and target. We also used a date picker from MUI to enable our users to select a due date for their project.

  <details><summary>Image</summary>

  ![NewTicket](docs/images/NewTicket.png)
  </details>

- For users, we designed a dropdown feature that shows users their username, home, profile, and logout buttons. It helps users to find user administration activities easily.

  <details><summary>Image</summary>

  ![Dropdown](/docs/images/Dropdown.png)
  </details>

- For the earch bar, there are many tickets on the list. It is not easy for users to search for a particular project ticket/idea, so we designed a search bar for users to search for the ticket initiative, target, and owner.

  <details><summary>Image</summary>

  ![Search_Bar](/docs/images/Searchbar.png)
  </details>

- For the nav bar, we designed an nav bar to show our users their username, email, and role. Users are acknowledged that they are logged in as employee/manager, so they can view and use different features/functionality. For example, managers can edit other users' ICE scores. 

  <details><summary>Image</summary>

  ![NavBar](/docs/images/Navbar.png)
  </details>

- For Canva logo, our users can click on it, users are redirected back to their home page. For employee users, they will be back to the MyTickets page. For manager users, they will be back to the SumittedTickets (listings) page.

  <details><summary>Image</summary>

  ![Logo](/docs/images/Logo.png)
  </details>

- For the side bar and nav bar, they will be hidden when users use iphone or ipad on the top left of the page. If users want to view the side bar and nav bar, they can click the hamburger menu bar. 

  <details><summary>Image</summary>

  ![HamburgerBar](/docs/images/HamburgerBar.png)
  ![ResponsiveSideBar](/docs/images/ResponsiveSideBar.png)
  </details>

# R8 **Provides evidence of user testing**:

<video autosize: true controls>
  <source src="./docs/CypressTest.mp4" type="video/mp4">
</video><br /><br />

<details><summary>Backend Testing</summary>

![Jest](/docs/images/JestTest.png)
</details><br>

<details><summary> Cypress Testing</summary>

![CypressTest1](/docs/images/Cypress_AccPopover.png)
![CypressTest2](/docs/images/Cypress_Feedback.png)
![CypressTest3](/docs/images/Cypress_MyTickets.png)
![CypressTest4](/docs/images/Cypress_Navbar.png)
![CypressTest5](/docs/images/Cypress_NewTicket.png)
![CypressTest6](/docs/images/Cypress_ProfileSearch.png)
![CypressTest7](/docs/images/Cypress_TicketDetails.png)
![CypressTest8](/docs/images/Cypress_signInandsignUp_spec.png)
![CypressTest9](/docs/images/Cypress_updateTicket.png)
</details><br />

<details><summary> Manual Testing</summary>

![ManualTest1](/docs/images/manualtest1.png)
![ManualTest2](/docs/images/manualtest2.png)
![ManualTest3](/docs/images/manualtest3.png)
![ManualTest4](/docs/images/manualtest4.png)
</details>

<br />

# R9 Utilises a formal testing framework

In this project, we followed several steps to carry out our formal testing: requirement analysis, planning about tests, test case documentation, setting up the testing environment,test execution, and closure of tests. Firstly, for requirement analysis, we understood the requirements like what is to be tested. Secondly, we were planning our test strategy and schedules, such as, app analysis and defining the scope of the test. Thirdly, we developed documentation of test cases, such as, Jest coverage report. Fourthly, we set up the test environment for testing, such as, our computers and installing Cypress and Jest to our app. Fifthly, we executed tests by using "npx cypress open" to open our spec folder to run the cypress tests for each web page and component functionality, using "npm test filename"  to carry out our unit testing, and engaging with our users to test our app. Finally, we analysed our test results and fixed bugs.

We used three testings in our project: Unit Testing, System Integration Testing, and User Acceptance Testing.

Firstly, we did our unit testing by using Jest, which is an easy to integrate JavaScript testing framework and is commonly used to test Express, Node.js, and React applications.

Secondly, we did our system integration testing by using Cypress that is primarily used for the front-end testing to test web applications and also for a large variety of tests including unit tests, system integration tests and end to end tests.

Thirdly, we used a spreadsheet to do our user acceptance testing that is usually at the final stage of testing. User acceptance testing is used by real users of the software when they use the final production website to complete a series of tests that are defined by the developer.

We started with unit testing with Jest. Individual units or components were tested to ensure the validation for each component function before all the function components were integrated further. We used Jest to test backend routes as well as controllers. In the front-end, we used Cypress as system integration tests to ensure that our components were working together as we expected. Finally, we moved to the user acceptance testing that the tests were designed to see if our website can support users' day-to-day usage. We completed the tests with the Head of Growth B2B Marketing, Francois to understand what we have done well to meet his expectation and what needs to improve for our app in the future. User acceptance testing is performed on the live environment to ensure that the production website functions the same as the development environment. Our user acceptance testing was implemented by using a spreadsheet with pre-planned tests that we described. If the expected result was not met, we fixed bugs and tested it again. If users required more features, but we did not have time to complete. We will make comments for future development.

# R11. A link to your GitHub repository (repo)

Front-end: <https://github.com/AnaBondiguel/Project-Prioritization-Client-2.git>

Back-End: <https://github.com/OrangeKami/Project_Prioritization_Server>

# R13. Design features vs built features

There are some required features that we designed in the part A, we have not been able to completed for the Part B due to the time limitations:

- We need to add manager status selection for our users in the sign up page.

- We can build admin account to allow managers to edit their manager/employee status and delete submitted tickets in the future.

- We should enable managers to edit their feedback.

- We should allow user to upload their avatar image, however we use string avatar instead.

We will work on these features after we submit our assignment.

<br/>

# R12 The contents of your README.md as submitted for Full Stack App - Part A

## R1. Description of your website, including

<details><summary> Description of the website </summary>

- **_Purpose_**

  - The purpose of this project management application is to collect and track ideas from users and prioritise their projects to improve team productivity. The Teams and Subscriptions Marketing (TSM) team is responsible for building marketing landing pages for Business to Business (B2B) at Canva. The current problem that they face is their manual process for project prioritisation.

  - The TSM team constantly gets a lot of requests from other teams globally across Canva to create, update or localise (translate to different languages) landing or existing pages. Every season (3 months period) they have to build a roadmap of all the things that they want to work on which is a complicated process as they always have more work than the team can handle and it’s not always clear what is the most important for Canva. The consequence of this unclear path is that their process of prioritisation of projects can be very chaotic. The team has to figure out how to use their limited time to work on the most important projects that will make a big impact for the company. At the same time, they also have to demonstrate their roadmap to leadership to make sure it’s aligned with the overall strategy of the company.

  - Our project management application will help the TSM team to collect ideas from various people at Canva and add relevant context/additional information to each idea. The application will also automatically calculate the ICE score that is required by the managers for their decision-making process. It allows managers to provide feedback for each idea so people can review their ideas. This application will let users be free from using manual spreadsheets and improve their productivity.

- **_Functionality / features_**

  - Our application will have the following functionality / features:

  - Enable users (both employees and managers) to register for the application

  - Enable users to edit their user profile

  - Allow users to submit their ideas

  - Allow users to add, edit, and delete their ideas before submission (once submitted employees can no longer edit/delete their ideas)

  - Automate calculate ICE score

  - Enable users to view their own project history (including both submitted and un-submitted projects), all the submitted projects and managers’ feedback

  - Enable managers (only) to view their feedback history (including both submitted and un-submitted feedback)

  - Allow managers (only) to add, edit, and delete their feedback before submission

  - Allow managers (only) to edit other users' ICE scores (impact, confidence, and effort)

  - Enable users to search for projects

- **_Target audience_**

  - Our target audiences are all the employees in Canva and the managers in Canva's Teams and Subscriptions Marketing.

- **_Tech stack_**

  MERN full-stack app:

  - Front-end: React interacts with users, JavaScript, HTML

  - Back-end: Express for web framework, Node.JS for web server, Mongoose for a connection between MongoDB and the Node.js JavaScript runtime environment

  - Database: MongoDB processes and stores database

  - Styling framework: Material UI, CSS

  - Deployment: Netlify for front-end, Heroku for back-end

  - Cloud-storage service: AWS S3 Bucket feature to store our uploaded images

  </details><br />

## R2 Dataflow Diagram

<details><summary> DFD Levle 0</summary>

![level0](docs/Part-A/docs/DataFlowDiagram/DFDLevel0.png)

</details><br />

<details><summary>DFD Levle 1</summary>

![level1](docs/Part-A/docs/DataFlowDiagram/DFDLevel1.png)

</details><br />

<details><summary>DFD Levle 2</summary>

![level2](docs/Part-A/docs/DataFlowDiagram/DFDLevel2_1.png)

![level2](docs/Part-A/docs/DataFlowDiagram/DFDlevel2_2.png)

</details><br />

## R3 Application Architecture Diagram

<details><summary>Architecture Diagram</summary>

![Application_Architecture_Diagram](docs/Part-A/docs/ApplicationArchitectureDiagram/ApplicationArchitectureDiagram.png)

</details><br />

## R4. User Stories

<details><summary>User Stroy</summary>

<table> 
  <tr>
    <th style="text-align:center">Theme</th>
    <th colspan=2 style="text-align:center">Employees</th>
    <th colspan=2 style="text-align:center">Managers</th>
  </tr>
  <tr>
    <th></th>
    <th style="text-align:center">Story</th>
    <th style="text-align:center">Acceptance Criteria</th>
    <th style="text-align:center">Story</th>
    <th style="text-align:center">Acceptance Criteria</th>
  </tr>
  <tr>
    <td>Submit a form to share information</td>
    <td>
      <h4><u>Idea submission</u></h4>
      As Yel, Software Engineer, I want to communicate my project ideas to my team, so I need to fill a form and submit it to my team/manager.
    </td>
    <td>“We have to formally fill in an online form if we want to share our project ideas to the team.” – Yel</td>
    <td>
      <h4><u>Feedback submission</u></h4>
      As Kate, Project Manager, I’d like to add, edit, and delete my feedback before I send it to my team, so if I change my mind later, I can always come back to change my feedback.
    </td>
    <td>“It’s nice to be able to add, edit, and delete my feedback before I send it back to my team. Sometimes, you may not always get a full picture of a certain project immediately. I may change my mind and need to update my feedback.” – Kate</td>
  </tr>
  <tr>
    <td>Create, edit, and delete project information</td>
    <td>
      <h4><u>Idea creation, modification, and deletion</u></h4>
      As Amela, Digital Designer, I want to be able to add, edit, and delete my ideas before I submit them, so I can feel free to make any changes in my project design later on.
    </td>
    <td>“A good innovative idea doesn’t appear at once and needs a lot of deliberate thinking. It’s important for me to be able to add, edit, and delete ideas. Just in case, I want to change something later on before I press the submit button.” – Amela</td>
    <td>
      <h4><u>Feedback creation, modification, and deletion</u></h4>
      As Lochy, Engineer Lead, I’d like to send my feedback to my team for each of their ideas, so they can improve their initial ideas to meet organization expectations.
    </td>
    <td>“After I receive new ideas from my team, I want to give feedback to them as soon as possible, they can improve their ideas that fit into our current strategy.” - Lochy</td>
  </tr>
  <tr>
    <td rowspan=2>View history records/listings/feedback</td>
    <td>
      <h4><u>View project idea history</u></h4>
      As Sarah, Digital Designer, I want to be able to view my project history, so I don’t need to remember each project detail that I created.
    </td>
    <td>“I’m a busy person and can’t always remember what I did for my projects later on. I’d love to be able to review all the projects that I created before.” – Sarah</td>
    <td>
      <h4><u>View feedback history</u></h4>
      As Nick, QA Engineer Lead, I’d like to view my feedback history, so I can track those ideas with my feedback.
    </td>
    <td>“I want to review and track the ideas with my feedback and check whether people need further support with my feedback.” – Nick</td>
  </tr>
  <tr>
    <td>
      <h4><u>View manager's feedback</u></h4>
      As Harsh, Software Engineer, I want to be able to view and respond to my manager’s feedback so I can solve my problems as soon as possible.
    </td>
    <td>“When I check my submitted ideas, I want to see my manager’s feedback. I can quickly fix the problems and move on to the next.” – Harsh</td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td rowspan=2>Search information</td>
    <td>
      <h4><u>Search project ideas</u></h4>
      As Joyce, Digital Designer, I want to be able to search the projects with feedback only on a list of all the ideas, so I can get some feelings of what managers’ expectations look like for an innovation project.
    </td>
    <td>“It’s convenient for me to be able to search any submitted projects with managers’ feedback because I want to get feels of what managers expected from an innovation project” – Joyce</td>
    <td></td>
    <td></td>
  </tr>
    <tr>
    <td>
      <h4><u>Search project ideas and view project ideas</u></h4>
      As Sunil, Software Engineer, I would like to view other people’s ideas, so I won’t create a similar project.
    </td>
    <td>“I don’t want to post my idea if I saw that someone has already created a similar project as mine.” – Sunil</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan=2>ICE score calculation functionality</td>
    <td></td>
    <td></td>
    <td>
      <h4><u>ICE score automatic calculation</u></h4>
      As Francois, Head of Growth Marketing B2B, I want to have a tool to calculate ICE scores automatically, so I can use these scores for my decision-making process. 
    </td>
    <td>“At the moment, we manually calculate ICE scores to help my process of decision-making on prioritization. It’ll be good to automate the calculation.” – Francois</td>
  </tr>
  </tr>
    <tr>
    <td></td>
    <td></td>
    <td>
      <h4><u>ICE score modification</u></h4>
      As Jessie, Design Lead, I want to be able to change ICE scores of employees’ projects, such as editing categories of impact, confidence, and effort, so I can make a decision on which project should go first.
    </td>
    <td>“As managers, we not only considered ICE scores when we prioritised our projects but also other impacts, such as, senior managers’ strategies, financial budget, and so on. Thus, I’d like to put all criteria into consideration for my decision-making and be able to change ICE scores and update categories of impact, confidence, and effort. ” – Jessie</td>
  </tr>
  <tr>
    <td> Sign up, sign in, and edit user's account</td>
    <td>
      <h4><u>User registration and profile modification</u></h4>
      As James, Software Engineer, I want to be able to sign up, sign in, and edit my user profile, so I can manage my account.
    </td>
    <td>“After signing up and signing in to an account, I should be able to edit my user profile. This is just a common feature that everyone has to allow users to manage their account.” – James</td>
    <td></td>
    <td></td>
  </tr>
  
</table>

</details><br />

### Evidence of user story revision and refinement

We had two meetings with Francois Bondiguel - Head of Growth Marketing B2B at Canva. He discussed his current project prioritization problems and what he expected from our project management application. We also communicated with him and his team by sending our questions through emails as well as collaborated on a joint document for further refinement. Here are some screenshots of our communication documents:

<details><summary> Introduction </summary>

![Introduction1](docs/Part-A/docs/UserStory/Introduction1.png)
![Introduction2](docs/Part-A/docs/UserStory/Introduction2.png)
![Introduction3](docs/Part-A/docs/UserStory/Introduction3.png)
![Introduction4](docs/Part-A/docs/UserStory/Introduction4.png)

</details><br />

<details><summary> Questions </summary>

![Question1](docs/Part-A/docs/UserStory/Question1.png)
![Question2](docs/Part-A/docs/UserStory/Question2.png)
![Question3](docs/Part-A/docs/UserStory/Question3.png)
![Question4](docs/Part-A/docs/UserStory/Question4.png)

</details><br />

## R5 Wireframes for multiple standard screen sizes, created using industry standard software

<details><summary> Login and Signup Page</summary>

![Login](docs/Part-A/docs/Wireframes/Login_and_Signup_Pages.png)

</details><br />

<details><summary> Landing Page</summary>

![Landing](docs/Part-A/docs/Wireframes/Landing_Page.png)

</details><br />

<details><summary> Listing Page</summary>

![Listings](docs/Part-A/docs/Wireframes/Listing_Page.png)

</details><br />

<details><summary> My Tickets Page</summary>

![My Ticket](docs/Part-A/docs/Wireframes/My_tickets.png)

</details><br />

<details><summary> Ticket Details Page</summary>

![Single Ticket](docs/Part-A/docs/Wireframes/Ticket_Details.png)

</details><br />

<details><summary> New Ticket Page</summary>

![New Ticket](docs/Part-A/docs/Wireframes/New_ticket.png)

</details><br />

<details><summary> Search Result Page</summary>

![Search](docs/Part-A/docs/Wireframes/Search_results.png)

</details><br />

<details><summary> Submission Success Page</summary>

![Submission](docs/Part-A/docs/Wireframes/Submission_success_page.png)

</details><br />

<details><summary> Edit Ticket Page</summary>

![Edit Ticket](docs/Part-A/docs/Wireframes/Edit_Tickets.png)

</details><br />

<details><summary> Edit Profile Page</summary>

![Edit Profile](docs/Part-A/docs/Wireframes/Edit_Profile.png)

</details><br />

<details><summary> Sitemap </summary>

![Sitemap](docs/Part-A/docs/Sitemap/Sitemap.png)

</details><br />

## R6 Screenshots of your Trello board throughout the duration of the project

We used Trello to manage our project and chose to adopt an agile project management methodology to develop our application because we needed to have faster feedback cycles so we can identify problem earlier, prioritise more important tasks, and meet our client requirements. Agile project management is “an iterative approach to delivering a project, which focuses on continuous releases that incorporate customer feedback. The ability to adjust during each iteration promotes velocity and adaptability” (Radigan, 2022).

We followed agile principles for implementation: firstly, we divided our project into several incremental steps with regular feedback from the TSM team and the two of us. Secondly, we needed to prioritize smaller pieces of the project requirement by their importance. Thirdly, we promoted collaboration and organised regular meetings to ensure our latest developements meet our client's expectations. Finally, planning integration with execution helped us to effectively respond to changing requirements as we finalised our app.

Reference:

Radigan, D. (2022). Agile vs. waterfall project management. Retrieved May 13, 2022, from https://www.atlassian.com/agile/project-management/project-management-intro

![TrelloWeek1](docs/Part-A/docs/ScreenshotsTrello/Trelloweek1.png)

![TrelloWeek2](docs/Part-A/docs/ScreenshotsTrello/Trelloweek2.png)

![TrelloFinal](docs/Part-A/docs/ScreenshotsTrello/TrelloFinal.png)

Our Trello website

Trello: <https://trello.com/b/XXhZNZa6/project-prioritisation-application>
