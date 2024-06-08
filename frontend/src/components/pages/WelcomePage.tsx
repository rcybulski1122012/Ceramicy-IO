import {ChangeEvent, useState} from 'react';
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react';

interface WelcomePageProps{
    setLogged: (hasLogged:boolean)=>void;
}
const WelcomePage = ({setLogged}:WelcomePageProps) => {
        const [nameValue,setNameValue]=useState('');
        const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
            setNameValue(event.target.value);
        }
        const handleSubmit = () =>{
            console.log('name:',nameValue);
            if(nameValue==undefined || nameValue==""){
                console.log("cannot be null");
            }
            else{
                setLogged(true);
            }
        }
        return(
            <Flex
              height="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                p={6}
                borderRadius="md"
                width="600px"
                textAlign="center"
                border="solid;2px"
              >
                <Text textStyle={'h2'}>Welcome!</Text>
                  <Text>Just one thing before you begin. Please enter your name (only for ranking purposes):</Text>
                  <Input value={nameValue} onChange={handleChange} variant='flushed' placeholder='Your name here'></Input>
                <Button mt={4} onClick={handleSubmit}>
                  Start quizzing!
                </Button>
              </Box>
            </Flex>
        );
    };
export default WelcomePage;