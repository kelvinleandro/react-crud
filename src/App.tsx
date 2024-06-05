import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User, UsersContext } from "./context/UsersContext";
import MyModal from "./components/MyModal";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usersCtx = useContext(UsersContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddNewUser = () => {
    setSelectedUser({ name: "", email: "", id: "" });
    onOpen();
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={handleAddNewUser}>
          ADD NEW USER
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={100} fontSize="20px">
                  Name
                </Th>
                <Th maxW={100} fontSize="20px">
                  E-Mail
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersCtx.users.map((user, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={100}>{user.name}</Td>
                  <Td maxW={100}>{user.email}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => handleEditUser(user)}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => usersCtx.deleteUser(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <MyModal
          data={selectedUser as User}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Flex>
  );
}

export default App;
