# Notes

1. When user visits the page
    a. User is logged in (you can check this by checking if sessionStorage.getItem('user') exists)
        a.1 show the tickets
            - if user.role === 'user'
                - GET /api/tickets/myTickets
            - if user.role === 'manager'
                - GET /api/tickets/submitted
    b. User is not logged in
        b.1. render a page with Sign Up / Sign In form
        b.2. navigation header could be just "Sign up" and "Sign In"
2. When a user clicks to edit a ticket
    a. user.role === 'user' and ticket.isSubmitted === false
        - show the ticket edit form (hide the feedback field)
    b. user.role === 'manager'
        - show the ticket form w/ feedback (only the feedback field is editable, disable the other fields)
3. Fix the schema
4. Logout - test it
    - show a page telling that the user is unauthorized because they're not logged in and show a link to the sign in page
5. Bonus: searchable list of tickets (search ticket via ticket initiative)
6. Bonus: filterable list of tickets (add some buttons for filtering tickets by some fields)

API Doc:
POST /api/auth - login user
    sample response 200 {
        data: {
            token: 'ey7sdjfasdlfsdajfasdlf'
            user: {
                username: 'yel',
                email: '...',
            }
        }
    }
POST /api/auth/register - register user
GET /api/tickets - get a list of all the tickets
    sample response 200 {
        data: [
            { id: 1, initiative: '...', ... },
            { id: 1, initiative: '...', ... },
        ]
    }
GET /api/user/:userId/tickets - get a list of all the tickets of a specific user
POST /api/tickets - create ticket
PUT /api/tickets - update ticket


// ticketsService.js
// 1. you could use a temporary json service like json-server npm package
// 2. axios intercept request
// 3. comment out the axios request, and just define a dummy data
async function getAllTickets() {
    const response = await axiosClient.get('/api/tickets')
    const tickets = response.data;
    return tickets;
}

axios.intercept('get', '/api/tickets', () => {
    return {
        data: [
            { id: 1, initiative: '...', ... },
            { id: 1, initiative: '...', ... },
        ]
    }
})


# Git Workflow
- Create a new repo (prioritization_server)
- prioritization_server
    `- client/
    `- server/
- rm -rf .git // make sure that the project folder is not a git repo yet
- git init // initialize as git repo
- git add client server
- git commit 
- git push
- now you get the initial state

for frontend
- work on client directory
- create a new branch for new features or feature updates
for backend
- work on server directory
- create a new branch for new endpoints, schema updates

- git branch client-add-manager-handling
- git checkout client-add-manager-handling
- do the work
- git push origin client-add-manager-handling
- Create a PR
- The other one takes a look at the PR and approves it if it all makes sense
