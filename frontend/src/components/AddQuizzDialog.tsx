import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  chakra,
  useDisclosure,
} from '@chakra-ui/react';
import QuizzAddForm from './QuizzAddForm';

const AddQuizzDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent="flex-end" alignItems="center" my={'14px'}>
      <Button
        onClick={onOpen}
        padding="28px"
        background="primary"
        role="group"
        _hover={{ bg: 'secondary' }}
      >
        <Text fontFamily={'heading'} fontSize={'2xl'} fontWeight="bold">
          Add new <chakra.span color="white">Quizz</chakra.span>
        </Text>
      </Button>

      <Modal
        size="2xl"
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            <Text fontFamily={'heading'} fontSize={'xl'} fontWeight={'700'}>
              Add new quizz
            </Text>{' '}
          </ModalHeader>
          <ModalCloseButton _hover={{ bg: 'red', color: 'white' }} />
          <ModalBody>
            <QuizzAddForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddQuizzDialog;
