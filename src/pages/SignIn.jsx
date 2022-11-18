// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography} from "@mui/material";
// hooks
import useResponsive from "../@mui/hooks/useReponsive";
// sections
import SigninForm from "../components/userpage/SigninForm";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SingIn() {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <Container fixed>
        <StyledRoot>
          {mdUp && (
            <StyledSection sx={{ mt: 5, mb: 5 }}>
              <Typography variant="h3" sx={{ px: 5, mb: 3 }}>
                Hi, Welcome Back to
              </Typography>
              <Typography
                variant="h4"
                color="#50bdd8"
                sx={{ px: 5, mt: 3, mb: 5 }}
              >
                Project Priorization
              </Typography>
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                Don't have an account? {""}
                <Link href="/signup" variant="subtitle2">
                  Sign Up?
                </Link>
              </Typography>

              <SigninForm />
            </StyledContent>
          </Container>
        </StyledRoot>
      </Container>
    </>
  );
}
