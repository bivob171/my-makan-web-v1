// ** Next Imports
import Link from "next/link";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

// ** Configs Import
import themeConfig from "@/configs/themeConfig";

// ** Custom Components Imports
import UserIcon from "./UserIcon";

// ** Utils
import { handleURLQueries } from "@/core/layouts/utils";
import { useRouter } from "next/navigation";

// ** Styled Components
const MenuNavLink = styled(ListItemButton)({
  width: "100%",
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: "#000", // hardcoded primary text color
  padding: "18px 28px", // theme.spacing(2.25, 3.5) => 2.25 * 8px = 18px, 3.5 * 8px = 28px
  transition: "opacity .25s ease-in-out",
  "&.active, &.active:hover": {
    boxShadow: "0px 1px 5px rgba(0,0,0,0.3)", // example shadow
    backgroundImage:
      "linear-gradient(98deg, linear-gradient(to right, #ff7e5f, #feb47b), #1976d2 94%)", // example gradient
  },
  "&.active .MuiTypography-root, &.active .MuiSvgIcon-root": {
    color: "#fff !important", // white color
  },
});

const MenuItemTextMetaWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...(themeConfig.menuTextTruncate && { overflow: "hidden" }),
});

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }) => {
  // ** Hooks
  const router = useRouter();
  const IconTag = item.icon;

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ListItem
      disablePadding
      className="nav-link"
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: "0 !important" }}
    >
      <Link passHref href={item.path === undefined ? "/" : `${item.path}`}>
        <MenuNavLink
          component={"a"}
          className={isNavLinkActive() ? "active" : ""}
          {...(item.openInNewTab ? { target: "_blank" } : null)}
          onClick={(e) => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (navVisible) {
              toggleNavVisibility();
            }
          }}
          sx={{
            pl: 5.5,
            ...(item.disabled
              ? { pointerEvents: "none" }
              : { cursor: "pointer" }),
          }}
        >
          <ListItemIcon
            sx={{
              mr: 2.5,
              color: "text.primary",
              transition: "margin .25s ease-in-out",
            }}
          >
            <UserIcon icon={IconTag} />
          </ListItemIcon>

          <MenuItemTextMetaWrapper>
            <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>
              {item.title}
            </Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || "primary"}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  marginLeft: 1.25,
                  "& .MuiChip-label": { px: 1.5, textTransform: "capitalize" },
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </Link>
    </ListItem>
  );
};

export default VerticalNavLink;
