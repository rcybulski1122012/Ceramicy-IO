import { Box } from "@chakra-ui/react";
import Countdown from 'react-countdown';

const Timer = (handleSubmit: any) => {
  return (
    <Box fontSize="xl">
      <Countdown
        date={Date.now() + 300 * 1000}
        renderer={renderer}
        onComplete={handleSubmit}
      ></Countdown>
    </Box>
  );
};

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <Box color="red" padding="1rem">
        time is up!
      </Box>
    );
  } else {
    return (
      <Box>
        {minutes}:{seconds}
      </Box>
    );
  }
};

export default Timer;
