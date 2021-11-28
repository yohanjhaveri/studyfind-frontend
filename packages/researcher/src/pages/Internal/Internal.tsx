import moment from "moment-timezone";

import { useEffect } from "react";
import { useCollection, useColorModeValue, useDevice, useDocument } from "hooks";
import { useHistory, useLocation } from "react-router-dom";

import { auth } from "@studyfind/firebase";
import { createGlobalStyle } from "styled-components";
import { getUser, getStudies, updateUserTimezone } from "./side";

import { CredProvider } from "context/CredContext";
import { UserProvider } from "context/UserContext";
import { StudiesProvider } from "context/StudiesContext";
import { ConfirmProvider } from "context/ConfirmContext";

import { Timezone } from "@studyfind/types";
import { UserDocumentExtended } from "types/side";
import { StudyDocumentExtended } from "types/extended";

import { Box, Grid } from "@chakra-ui/react";
import { FaPoll } from "react-icons/fa";
import { Loader } from "components/atoms";

import { Sidebar } from "components/organisms";
import { Toolbar } from "components/organisms";
import { Router } from "components/organisms";
import { VerificationBanner } from "components/organisms";

import Schedule from "pages/Internal/Schedule/Schedule";
import Account from "pages/Internal/Account/Account";
import Feature from "pages/Internal/Support/Feature/Feature";
import Bug from "pages/Internal/Support/Bug/Bug";
import FAQs from "pages/Internal/Support/FAQs/FAQs";

function Internal() {
  const history = useHistory();
  const location = useLocation();
  const background = useColorModeValue("white", "gray.800");

  const { isPhone } = useDevice();

  useEffect(() => {
    const redirect = localStorage.getItem("redirect");

    if (redirect) {
      history.push(redirect);
      localStorage.removeItem("redirect");
    }
  }, []);

  const links = [{ name: "Dashboard", path: "/dashboard", icon: <FaPoll /> }];

  const cred = auth.getUser();
  const [user] = useDocument<UserDocumentExtended>(getUser());
  const [studies] = useCollection<StudyDocumentExtended>(getStudies());

  const loading = !cred || !user || !studies;

  const page = location.pathname.split("/")[1];

  const heading = page
    .split("-")
    .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
    .join(" ");

  // const SIDEBAR_WIDTH = "275px";
  // const TOOLBAR_HEIGHT = "68px";
  // const MOBILE_SIDEBAR_HEIGHT = "71px";

  useEffect(() => {
    if (user?.timezone) {
      const { region, autodetect, updatedAt } = user.timezone;

      const now = moment().utc().valueOf();
      const thirtyMinutes = 30 * 60 * 1000;

      const detected = moment.tz.guess(true) as Timezone;

      if (autodetect && region !== detected && updatedAt + thirtyMinutes > now) {
        updateUserTimezone({ autodetect, region: detected });

        moment.tz.setDefault(detected);
      } else {
        moment.tz.setDefault(region);
      }
    }
  }, [user?.timezone?.region]);

  return (
    <Grid
      flexDirection={isPhone ? "column" : "row"}
      templateRows={isPhone ? "100px 1px 1fr" : ""}
      templateColumns={isPhone ? "" : "275px 1px 1fr"}
      marginLeft={isPhone ? "0" : "275px"}
      marginTop={isPhone ? "139px" : "68px"}
    >
      <InternalGlobalStyle />
      <Box
        width={isPhone ? "100%" : "275px"}
        height={isPhone ? "" : "100vh"}
        position="fixed"
        left="0"
        top="0"
        zIndex={200}
      >
        <Sidebar name="Yohan Jhaveri" email="yohan@studyfind.org" links={links} />
      </Box>
      <Box
        background={background}
        width={isPhone ? "100vw" : "calc(100vw - 275px)"}
        height="68px"
        position="fixed"
        right="0"
        top={isPhone ? "71px" : "0"}
        zIndex={100}
      >
        <Toolbar heading={heading} />
      </Box>
      <Box
        background={background}
        minHeight={isPhone ? "calc(100vh - 139px)" : "calc(100vh - 68px)"}
        width={isPhone ? "100vw" : "calc(100vw - 275px)"}
        padding="20px"
      >
        {loading ? (
          <Loader width="100%" height="100%" />
        ) : (
          <CredProvider value={cred}>
            <UserProvider value={user}>
              <StudiesProvider value={studies}>
                <ConfirmProvider>
                  <Router
                    routes={[
                      { path: "/schedule", component: Schedule },
                      { path: "/account/:tab", component: Account },
                      { path: "/support/bug", component: Bug },
                      { path: "/support/feature", component: Feature },
                      { path: "/support/faqs", component: FAQs },
                    ]}
                    redirectTo="/dashboard"
                  />
                </ConfirmProvider>
              </StudiesProvider>
            </UserProvider>
          </CredProvider>
        )}
      </Box>
      {cred.emailVerified || (
        <Box
          width={isPhone ? "100vw" : "calc(100vw - 275px)"}
          minHeight="56px"
          background="gray.900"
          position="fixed"
          bottom="0"
          left={isPhone ? "" : "275px"}
          zIndex={100}
        >
          <VerificationBanner />
        </Box>
      )}
    </Grid>
  );
}

const InternalGlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
    height: 100%;
  }
  body {
    height: 100%;
    overflow: auto;
  }
`;

export default Internal;