export default function reducer (state, action) {
    switch(action.type) {
        // case 'setdueDate':{
        //     return {
        //         ...state,
        //         dueDate: action.data
        //     }
        // }
        case 'setTargets': {
            return {
                ...state,
                targets: action.data
            }
        }
        case 'setImpacts': {
            return {
                ...state,
                impacts: action.data
            }
        }
        case 'setConfidences': {
            return {
                ...state,
                confidences: action.data
            }
        }
        case 'setEfforts': {
            return {
                ...state,
                efforts: action.data
            }
        }
        case 'setTickets': {
            return {
                ...state,
                tickets: action.data
            }
        }
        case 'addTicket': {
            return {
                ...state,
                tickets: [action.data, ...(state.tickets || [])]
            }
        }
        case 'deleteTicket': {
            const updatedTickets = state.tickets.filter((ticket) => {
                return ticket.id !== parseInt(action.data)
            })
            return {
                ...state,
                tickets: updatedTickets
            }
        }
        case 'updateTicket': {
            console.log(action.data)
            console.log(state.tickets)
            const ticket = state.tickets.find((ticket) => ticket._id == action.data.id)
            console.log(ticket)
            console.log(action.data)
            const updatedTicket = Object.assign(ticket, action.data)       
//we only changed one ticket and need to remain the rest of ticket list the same as before
            const otherTickets = state.tickets.filter((ticket) => ticket.id !== action.data.id)
            return {
                ...state,
                tickets: [updatedTicket, ...otherTickets]
            }
        }

        case 'setLoggedInUser': {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case 'setToken': {
            return {
                ...state,
                auth: {
                    ...state.auth,
                    token: action.data
                }
            }
        }
        default: return state

    }

}