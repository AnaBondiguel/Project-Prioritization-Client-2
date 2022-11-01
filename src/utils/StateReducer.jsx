export default function reducer (state, action) {
    switch(action.type) {
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
                tickets: [action.data, ...state.tickets]
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
            const ticket = state.tickets.find((ticket) => ticket.id === action.data.id)
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