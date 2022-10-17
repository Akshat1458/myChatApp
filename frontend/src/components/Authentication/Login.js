import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const submitHandler = async () => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: "Please Enter all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password,
        }
      );
      console.log(data);
      toast({
        title: "Logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassWord(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="green"
        style={{ marginTop: 15 }}
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        colorScheme="blue"
        style={{ marginTop: 15 }}
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassWord("123456");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
