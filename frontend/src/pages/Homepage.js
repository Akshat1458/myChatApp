import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) history.push("/chats");
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d={"flex"}
        textAlign="center"
        p={3}
        bg={"white"}
        width="100%"
        margin="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="black">
          MyChat
        </Text>
      </Box>
      <Box
        p={4}
        bg={"white"}
        w="100%"
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab width="50%">LOGIN</Tab>
            <Tab width="50%">SIGN UP</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
