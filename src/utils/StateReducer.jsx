export default function reducer(state, action) {
  switch (action.type) {
    case "setFilteredTickets": {
      return {
        ...state,
        filteredTickets: action.data,
      };
    }
    case "setTargets": {
      return {
        ...state,
        targets: action.data,
      };
    }
    case "setImpacts": {
      return {
        ...state,
        impacts: action.data,
      };
    }
    case "setConfidences": {
      return {
        ...state,
        confidences: action.data,
      };
    }
    case "setEfforts": {
      return {
        ...state,
        efforts: action.data,
      };
    }
    case "setTickets": {
      return {
        ...state,
        tickets: action.data,
      };
    }
    case "getTicket": {
      return {
        ...state,
        ticket: action.data,
      };
    }
    case "addTicket": {
      return {
        ...state,
        tickets: [action.data, ...(state.tickets || [])],
      };
    }
    case "deleteTicket": {
      const updatedTickets = state.tickets.filter((ticket) => {
        return ticket._id !== parseInt(action.data);
      });
      return {
        ...state,
        tickets: updatedTickets,
      };
    }
    case "updateTicket": {
      const ticket = state.tickets.find(
        (ticket) => ticket._id === action.data._id
      );
      const updatedTicket = Object.assign(ticket, action.data);
      //we only changed one ticket and need to remain the rest of ticket list the same as before
      const otherTickets = state.tickets.filter(
        (ticket) => ticket.id !== action.data.id
      );
      return {
        ...state,
        tickets: [updatedTicket, ...otherTickets],
      };
    }
    case "updateUser": {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = Object.assign(user, action.data);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return {
        ...state,
        loggedInUser: JSON.stringify(updatedUser),
      };
    }

    case "setFeedbacks": {
      return {
        ...state,
        feedbacks: action.data,
      };
    }

    case "createFeedbacks": {
      return {
        ...state,
        feedbacks: [action.data, ...(state.feedbcaks || [])],
      };
    }

    case "deleteFeedback": {
      const updatedFeedbacks = state.feedbacks.filter((feedback) => {
        return feedback.id !== parseInt(action.data);
      });
      return {
        ...state,
        feedbacks: updatedFeedbacks,
      };
    }

    case "setLoggedInUser": {
      return {
        ...state,
        loggedInUser: action.data,
      };
    }
    case "setToken": {
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.data,
        },
      };
    }
    default:
      return state;
  }
}
