import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postDetails = (pics) => {
    setloading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dyud9mgs3");
      fetch("https://api.cloudinary.com/v1_1/dyud9mgs3/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Password not matching",
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
      console.log(name + " " + email + " " + password);
      const { data } = await axios.post("http://localhost:5000/api/user", {
        name,
        email,
        password,
        pic,
      });
      console.log(data);
      toast({
        title: "Registered",
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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>
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
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>upload Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="green"
        style={{ marginTop: 15 }}
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
