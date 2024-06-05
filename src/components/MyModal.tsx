import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User, UsersContext } from "../context/UsersContext";

interface MyModalProps {
  data: User;
  isOpen: boolean;
  onClose: () => void;
}

const MyModal = ({ data, isOpen, onClose }: MyModalProps) => {
  const [name, setName] = useState(data.name || "");
  const [email, setEmail] = useState(data.email || "");
  const usersCtx = useContext(UsersContext);

  const handleSave = () => {
    if (!name || !email) return;
    const newUser = {
      name: name,
      email: email,
    };

    if (data.id) {
      usersCtx.updateUser(data.id, newUser);
    }
    else{
      usersCtx.createUser(newUser);
    }
    console.log(usersCtx.users.length);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.name ? "Edit user" : "Create user"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            SAVE
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCEL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
