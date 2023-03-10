import { getItem, setItem } from "../../utils/customHooks/useLocalStorage";
import {
  GET_PROJECTS,
  GET_PROJECT_ID,
  CLEAR_PROJECT_ID,
  POST_PROJECT,
  PUT_PROJECT,
  DELETE_PROJECT,
  GET_OWNER,
  ITEMS_PER_PAGE,
  CURRENT_PAGE,
  ORIGINAL_PROJECTS,
  FILTERED_PROJECTS,
  FILTERS,
} from "../actions/projectActions";

const initialState = {
  allProjects: [],
  oneProject: {},
  owner: {},
  projectsPerPage: [],
  currentPage: 1,
  message: "",
  activeFilters: {
    address: false,
    availability: "available",
    budget: 0,
    category: false,
    order: "newest",
    search: "",
  },
};

export default function projectReducer(
  state = getItem("project", initialState),
  action
) {
  const { type, payload } = action;
  switch (type) {
    case ORIGINAL_PROJECTS:
      setItem("project", { ...state, originalProjects: payload });
      return getItem("project", initialState);
    case GET_PROJECTS:
      setItem("project", { ...state, allProjects: payload });
      return getItem("project", initialState);
    case GET_PROJECT_ID:
      setItem("project", { ...state, oneProject: payload });
      return getItem("project", initialState);
    case GET_OWNER:
      setItem("project", { ...state, owner: payload });
      return getItem("project", initialState);
    case CLEAR_PROJECT_ID:
      setItem("project", { ...state, oneProject: {}, owner: {} });
      return getItem("project", initialState);
    case POST_PROJECT:
      setItem("project", { ...state, oneProject: payload });
      return getItem("project", initialState);
    case PUT_PROJECT:
      return { ...state, message: payload };
    case DELETE_PROJECT:
      return { ...state, message: payload };
    case ITEMS_PER_PAGE:
      const itemsPerPage = state.allProjects.slice(payload.min, payload.max);
      return { ...state, projectsPerPage: itemsPerPage };
    case CURRENT_PAGE:
      return { ...state, currentPage: payload };
    case FILTERS:
      return { ...state, activeFilters: payload };
    case FILTERED_PROJECTS:
      const { address, availability, budget, category, order, search } =
        state.activeFilters;
      let filteredProjects = [...state.originalProjects];

      if (address || address !== false) {
        filteredProjects = filteredProjects.filter(
          (project) => project.state === parseInt(address)
        );
      }
      if (availability === "available") {
        filteredProjects = filteredProjects.filter(
          (project) => project.deleted === false && project.status === true
        );
      }
      if (availability === "not-available") {
        filteredProjects = filteredProjects.filter(
          (project) => project.deleted === true || project.status === false
        );
      }
      if (budget > 0) {
        filteredProjects = filteredProjects.filter(
          (project) => project.budget >= parseInt(budget)
        );
      }
      if (category || category !== false) {
        filteredProjects = filteredProjects.filter(
          (project) => project.category === parseInt(category)
        );
      }
      if (order === "a-z") {
        filteredProjects.sort((x, y) =>
          x.Category.name.localeCompare(y.Category.name)
        );
      }
      if (order === "z-a") {
        filteredProjects
          .sort((x, y) => x.Category.name.localeCompare(y.Category.name))
          .reverse();
      }
      if (order === "oldest") {
        filteredProjects.reverse();
      }
      if (search !== "") {
        const lowerSearch = search.toLowerCase();
        filteredProjects = filteredProjects.filter((project) => {
          const lowerName = project.ownerName.toLowerCase();
          return lowerName.includes(lowerSearch);
        });
      }
      return { ...state, allProjects: filteredProjects };
    default:
      return state;
  }
}
