import React, { useState } from 'react';
import { Smell } from '../../../data/quizzes';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
} from '@chakra-ui/react';

interface SmellButtonProps {
  id: number;
  line: number;
  smellLines: Smell[][];
  end: number | null;
  handleClick: () => void;
  isPopoverOpen: boolean;
  handlePopoverClose: (type: string, line: number) => void;
}

const SmellButton: React.FC<SmellButtonProps> = ({
  id,
  line,
  smellLines,
  end,
  handleClick,
  isPopoverOpen,
  handlePopoverClose,
}) => {
  const isLineBreakpoint = smellLines[line]?.some(
    (smell) => id >= smell.start && id <= smell.end,
  );
  const type = smellLines[line]?.find(
    (smell) => id >= smell.start && id <= smell.end,
  )?.type;
  const buttonStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: isLineBreakpoint ? '#6b7280' : 'transparent',
    border: isLineBreakpoint ? '2px solid #6b7280' : '2px solid transparent',
    cursor: 'pointer',
    marginRight: '8px',
    marginLeft: '8px',
    // marginTop: isTop ? '0' : '4px',
    // marginBottom: isBottom ? '0' : '4px',
  };

  const [selectedValue, setSelectedValue] = useState('Unnecesary Comment');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handlePopoverCloseWithSelectedValue = () => {
    handlePopoverClose(selectedValue, line);
  };

  return (
    <Popover
      isOpen={isPopoverOpen && end === id}
      onClose={handlePopoverCloseWithSelectedValue}
    >
      <PopoverTrigger>
        <div
          style={{ width: '100%', height: '15px', display: 'flex' }}
          onClick={handleClick}
        >
          <Tooltip label={type} aria-label="A tooltip" isDisabled={!isLineBreakpoint}>
            <div style={buttonStyle}></div>
          </Tooltip>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Smell Type</PopoverHeader>
        <PopoverBody>
          <RadioGroup
            value={selectedValue}
            onChange={(e) => handleRadioChange(e)}
          >
            <Stack spacing={5} direction="column">
              <Radio colorScheme="red" value="Unnecesary Comment">
                Unnecesary Comment
              </Radio>
              <Radio colorScheme="green" value="Incorrect Typing">
                Incorrect Typing
              </Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SmellButton;
