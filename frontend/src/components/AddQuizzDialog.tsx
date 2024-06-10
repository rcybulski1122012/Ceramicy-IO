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
import { QuizCreatePayload, createQuiz, uploadFiles } from '../api/quizzSubmit';
import { useMutation } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';

const AddQuizzDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const uploadFilesMutation = useMutation({
    mutationFn: (file: File) => uploadFiles(file),
  });
  const createQuizMutation = useMutation({
    mutationFn: (quiz: QuizCreatePayload) => createQuiz(quiz),
  });

  const onFormSubmit = async (file: File, quizData: QuizCreatePayload) => {
    try {
      const fileUrls = await uploadFilesMutation.mutateAsync(file);
      const quizPayload = { ...quizData, fileUrls };
      await createQuizMutation.mutateAsync(quizPayload);
      onClose();
    } catch (error) {
      console.error('Error uploading quiz:', error);
    }
  };

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
            {(uploadFilesMutation.isPending ||
              createQuizMutation.isPending) && <TailSpin />}
            {(createQuizMutation.isError || createQuizMutation.isError) && (
              <Text color="red">Something went wrong...</Text>
            )}
            <QuizzAddForm onFormSubmit={onFormSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddQuizzDialog;
