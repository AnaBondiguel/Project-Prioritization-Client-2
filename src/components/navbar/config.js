// component
import SvgColor from "../../@mui/components/svgcolor/SvgColor";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "My Tickets",
    path: "/mytickets",
    icon: icon("ic_analytics"),
  },
  {
    title: "New Ticket",
    path: "/newticket",
    icon: icon("ic_user"),
  },
  {
    title: "Listings",
    path: "/listings",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "Sing In",
    path: "/signin",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
