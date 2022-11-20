# Project_Prioritization_Server

CA Final Assessment Server

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

- Heroku to host the back end content
- Netlify to host the front end content

# R2.Write well designed code that:

- Separates the program into modules that each deal with one particular focus, or concern

The code files for the application is separated into two directories that are linked to two separate Github repositories, Project-Proritization-Client-2 (for front end) and Project-Proritization-Server (for back end).

Frond End

![Modules](client/public/images/modulesfrontend.png)

The front end code is categorised into folders based on their purpose:

The assets folder contains images. The components folder contains components that make up each page of the website. The pages folder contains the code for each page, and the components from the components folder are imported into each of these pages. The service folder contains code that communicate with back-end code. The utils folder contains StateContext.jsx and StateReducer.jsx. The tests folder contains code for Jest testing for all the functionalities of our app that interacts with users.

Back End

![Modules](client/public/images/modulesbackend.png)

The front end code is categorised into folders based on their purpose:
Chen's writing

- Demonstrates DRY (Don’t Repeat Yourself) coding principles

We tried to reuse ticket form as much as possible, for example, users can used the ticket form for both creating and editing before submission. The all the ticket submitted listing table is used both Listing.jsx and SearchResult.jsx. The navigation bar component is contained in the main App.js file in the front-end so that it only needs to be called on once, without having to be included in the render function of each page.

- Uses appropriate libraries

We used Axio to shorten the code required to make HTTP requests.

We used Date-fns to format our dueDate for users to choose the date for their project deadline.

We used Cors to enable data to be transmitted between the back-end and the front-end. It allows the use of a custom API.

We used JSON web token that allows users to create a token based on their email address for authetication.

We used Nodemon to allow the express server to restart automatically after changing each code.

We used UUIDV4 to generate a unique token to validate users.

We used Jest and Supertest for unit testing for our front-end and back-end.

Chen's writing

- Demonstrates good code flow control for user stories

We used the user stories for the code control flow during our coding process. Each feature/function contains the expected output from our user stories. For example:

User story 1 Idea submission

As Yel, Software Engineer, I want to communicate my project ideas to my team, so I need to fill a form and submit it to my team/manager.

Acceptance Criteria

“We have to formally fill in an online form if we want to share our project ideas to the team.” – Yel

In ticketService.jsx:

//create a ticket

```
import projectAPI from "../config/api";

export async function createTicket(ticket) {
  const response = await projectAPI.post('/api/tickets/new', ticket);
	return response.data;
}
```

In StateReducer.jsx:

```
export default function reducer (state, action) {
    switch(action.type) {
        case 'addTicket': {
            return {
                ...state,
                tickets: [action.data, ...(state.tickets || [])]
            }
        }
```

In TicketForm.jsx:

```
function handleClick({ isSubmitted = false }) {
    return (event) => {
      event.preventDefault();
      //if statement to handle update ticket and create ticket
      if (_id) {
        // from saved ticket to submitted
        updateTicket({
          id: _id,
          ...formState,
          isSubmitted: isSubmitted,
          dueDate: dateValue,
        })
          .then(() => {
            dispatch({
              type: "updateTicket",
              data: {
                id: _id,
                ...formState,
                isSubmitted: isSubmitted,
                dueDate: dateValue,
              },
            });
            //if user update ticket with form, leave ticket to show on the page.
            // navigate(`/mytickets/${_id}`);
            navigate(`/mytickets`);
          })
          .catch((error) => console.log(error));
      } else {
        // from creation to submitted
        createTicket({
          ...formState,
          ticket_id: uuidv4(),
          isSubmitted: isSubmitted,
          dueDate: dateValue,
        })
          .then((ticket) => {
            dispatch({ type: "addTicket", data: ticket });
            //we can navigate back to the my tickets page once we create a ticket.
            isSubmitted
              ? navigate("/submissionsuccess")
              : navigate("/mytickets");
          })
          .catch((error) => console.log(error));
      }
    };
  }

      <Button
              variant="contained"
              color="warning"
              onClick={handleClick({ isSubmitted: false })}
              disabled={saveButton}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleClick({ isSubmitted: true })}
            >
              Submit
            </Button>
```

- Applies Object Oriented (OO) principles/patterns & Uses appropriate data structures

In order to write more testable, flexible, and maintainable code, we followed the four principles of object-oriented programming: abstraction, inheritance, encapsulation, and polymorphism. For our application, each component has its own function and each page is written as a function with all the functionality for the page that contained in various methods. Our structure is followed:

- Function Name

- State objects contains keys with values that are subject to change

- UseEffect to fetch data from the MongoDB database and render it on the page

- All the functions to control the functionality. e.g. handleChange and handleClick allows users to fill and submit the form.

- A render function to display the contents of the page

For example, when ticket form is completed from the front-end, a new ticket is created from the values of the form. Then the information is saved and a HTTP request is sent to the back-end.

# R3. Employ and utilise proper source control methodology (git)
We used Git and Github as our source control tool. The team worked off three repositories: one is for the frond-end for both team members because the frond-end has a lot of work. The second one is for the back-end for Chen's individual work. The third one is for the front-end for Ana's individual work. Eventually, Ana merged her front-end work from her individual repository to the front-end repository in common for both members. We did use branches for developing a particular feature or styling framework. Once the branch code was agreed, we pulled requests to merge the changes to the master branch. When merge conflicts arises we will talk and check with the person whose code is causing the conflicts.

# R4. **Demonstrate your ability to work in a team**:

- Use a recognised project management methodology & a recognised task delegation methodology

We used Trello to manage our project and chose to adopt an agile project management methodology to develop our application because we needed to have faster feedback cycles so we can identify problem earlier, prioritise more important tasks, and meet our client requirements.

We divided our project between both of us: Chen is responsible for the back-end, Ana is responsible for the front-end. Once Chen did the back-end, Ana connected her front-end to the back-end. Ana built all the features for employee users, and Chen built all the features for manager users. Ana wrote up all the documentation, and Chen improved page styling.

We set up a meeting every Monday to discuss the week plan and chart regularly online if there are problems that need to be solved immediately.

We used Trello to divid our project into several incremental steps with regular feedback from our users and the two of us. We prioritized smaller pieces of the project requirement by their importance and organised regular meetings to ensure our latest developements meet our client's expectations. Therefore, we can effetively respond to changing requirements.

# R5 Produce a working application that meets client and user needs

PlaceHolder

# R6 Deploy the application to a cloud hosting service

PlaceHolder

# R7 Produce an application with an intuitive user interface

PlaceHolder

# R8 **Provides evidence of user testing**:

PlaceHolder

# R9 Utilises a formal testing framework

PlaceHolder

# R10 A link (URL) to your deployed website

PlaceHolder

Heroku Backend: <https://projectprioritization.herokuapp.com/api/>

Railway Backend: <https://projectprioritization.up.railway.app/api>

# R11 A link to your GitHub repository (repo)

PlaceHolder

Back-End: <https://github.com/OrangeKami/Project_Prioritization_Server>

# R12 The contents of your README.md as submitted for Full Stack App - Part A

PlaceHolder