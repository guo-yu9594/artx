import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import {
  AutoAwesomeMosaicSharp,
  BookmarkSharp,
  FavoriteSharp,
  NewspaperSharp,
} from "@mui/icons-material";
import AuthModal from "./component/AuthModal";
import SideActionButtons from "./component/SideActionButtons";
import UserProfile from "./component/UserProfile";
import "./global.css";
import NewPostButton from "./component/NewPostButton";

const menuBoxStyle: SxProps = {
  paddingX: 6,
  paddingY: 4,
  width: "35%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

const profileStackStyle: SxProps = {
  width: "100%",
  height: "15%",
  direction: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "primary.main",
};

const links = [
  {
    title: "News",
    path: "/",
    icon: <NewspaperSharp fontSize="large" />,
  },
  {
    title: "My posts",
    path: "/posts",
    icon: <AutoAwesomeMosaicSharp fontSize="large" />,
  },
  {
    title: "Liked ones",
    path: "/liked",
    icon: <FavoriteSharp fontSize="large" />,
  },
  {
    title: "Collection",
    path: "/collection",
    icon: <BookmarkSharp fontSize="large" />,
  },
];

const listItems = links.map((link) => {
  return (
    <ListItem sx={{ px: 0 }} key={link.title}>
      <Link href={link.path} sx={{ width: "100%", textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon sx={{ color: "primary.main", ml: 2 }}>
            {link.icon}
          </ListItemIcon>
          <ListItemText>
            <Typography color="primary" fontSize={20}>
              {link.title}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AuthModal />
          <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
            <Box sx={menuBoxStyle}>
              <Typography
                color="primary"
                fontWeight={900}
                fontSize={60}
                marginBottom={3}
              >
                Artx
              </Typography>
              <UserProfile />
              <List
                sx={{
                  width: "100%",
                  marginTop: 3,
                  border: 1,
                  borderColor: "primary.main",
                  py: 2,
                }}
              >
                {listItems}
              </List>
              <NewPostButton />
              <SideActionButtons />
            </Box>
            <Box width="65%" pr={6}>
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
