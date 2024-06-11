import React, { useState, useEffect } from 'react';
import quizzes, { Smell, SmellType } from '../../../data/quizzes';
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
  Box,
  Button,
} from '@chakra-ui/react';
import { LineRange } from './LineRange';
import {saveAnswers} from "../../../services/localStorageService.ts";

interface SmellButtonProps {
  id: number;
  col: number;
  smellLines: Smell[][];
  setSmellLines: React.Dispatch<React.SetStateAction<Smell[][]>>;
  hoverEnd: any;
  setHoverEnd: any;
  lineRange: LineRange;
  smellTypes: SmellType[];
}

const SmellButton: React.FC<SmellButtonProps> = ({
  id,
  col,
  smellLines,
  setSmellLines,
  hoverEnd,
  setHoverEnd,
  lineRange,
  smellTypes,
}) => {
  const { start, end, setStart, setEnd, reset, col: selectedCol } = lineRange;

  const isLineHover = () => {
    if (start !== null && hoverEnd !== null && col === selectedCol) {
      if (id > start && id < hoverEnd) {
        return true;
      }
    }
    return false;
  }

  const isLineBreakpoint = smellLines[col]?.some(
    (smell) => id >= smell.start && id <= smell.end,
  );

  const showTopLine = smellLines[col]?.some(
    (smell) => id >= smell.start + 1 && id <= smell.end + 1,
  );

  const showBottomLine = smellLines[col]?.some(
    (smell) => id >= smell.start && id <= smell.end - 1,
  );

  const showHoverTopLine = () => {
    if (start !== null && hoverEnd !== null && col === selectedCol) {
      if (id >= start + 1 && id <= hoverEnd + 1) {
        return true;
      }
    }
    return false;
  }

  const showHoverBottomLine = () => {
    if (start !== null && hoverEnd !== null && col === selectedCol) {
      if (id >= start && id <= hoverEnd - 1) {
        return true;
      }
    }
    return false;
  }

  const type = smellLines[col]?.find(
    (smell) => id >= smell.start && id <= smell.end,
  )?.type;

  const getSmellColor = () => {
    const smellType = smellTypes.find((st) => st.type === type);
    return smellType ? smellType.color : '#6b7280'; // Default color if type is not found
  };

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: isLineHover() 
    ? 'grey' 
    : isLineBreakpoint 
    ? getSmellColor() 
    : 'transparent',
    border: isLineHover() 
    ? '2px solid grey' 
    : isLineBreakpoint 
    ? '2px solid' + getSmellColor() 
    : '2px solid transparent',
    cursor: 'pointer',
    marginRight: '8px',
    marginLeft: '8px',
  };

  const bottomLineStyle: React.CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '15px',
    backgroundColor: isLineHover() && showHoverBottomLine() 
    ? 'grey' 
    : showBottomLine && isLineBreakpoint 
    ? getSmellColor() 
    : 'transparent',
    border: isLineHover() && showHoverBottomLine()  
    ? '2px solid grey' 
    : showBottomLine && isLineBreakpoint 
    ? '2px solid' + getSmellColor() 
    : '2px solid transparent',
    cursor: 'pointer',
    left: '-2px',
    top: '2px',
  };

  const topLineStyle: React.CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '15px',
    backgroundColor: isLineHover() && showHoverTopLine() 
    ? 'grey' 
    : showTopLine && isLineBreakpoint 
    ? getSmellColor() 
    : 'transparent',
  border: isLineHover() && showHoverTopLine()  
    ? '2px solid grey' 
    : showTopLine && isLineBreakpoint 
    ? '2px solid' + getSmellColor() 
    : '2px solid transparent',
    cursor: 'pointer',
    left: '-2px',
    top: '-12px',
  };

  const [selectedValue, setSelectedValue] = useState(smellTypes[0].type);
  const [localPopoverOpen, setLocalPopoverOpen] = useState(false);

  useEffect(() => {
    if (start !== null && end === id && selectedCol === col) {
      setLocalPopoverOpen(true);
    }
  }, [start, end, id, col, selectedCol]);

  const handleClick = () => {
    if (start === null) {
      if (
        smellLines[col]?.some((smell) => id >= smell.start && id <= smell.end)
      ) {
        const updated = smellLines.slice();
        updated[col] =
          updated[col]?.filter(
            (smell) => !(smell.start <= id && smell.end >= id),
          ) || [];
        setSmellLines(updated);
        saveAnswers(quizzes[0].id,'0',updated);
      } else {
        setStart(id, col);
        lineRange.col = col;
      }
    } else if (end === null) {
      setEnd(id);
    }
  };

  const handleHover = () => {
    if (start != null && end === null) {
      setHoverEnd(id);
      console.log("Enter")
    }
  }

  const handleMouseExit = () => {
    setHoverEnd(0);
    console.log("Exit")
  }

  const handlePopoverSubmit = (type: string, col: number) => {
    setLocalPopoverOpen(false);

    const updated = smellLines.slice();
    if (!updated[col]) {
      updated[col] = [];
    }
    updated[col].push({ start: start!, end: end!, type: type });

    setSmellLines(updated);
    saveAnswers(quizzes[0].id,'0',updated)
    reset();
  };

  const handlePopoverClose = () => {
    setLocalPopoverOpen(false);
    reset();
  }

  const handlePopoverSubmitWithSelectedValue = () => {
    handlePopoverSubmit(selectedValue, col);
  };

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Popover
      isOpen={localPopoverOpen}
      onClose={handlePopoverClose}
    >
      <PopoverTrigger>
        <Box
          sx={{ width: '100%', height: '15px', display: 'flex' }}
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseExit}
        >
          <Tooltip
            label={type}
            aria-label="A tooltip"
            isDisabled={!isLineBreakpoint}
          >
            <Box style={buttonStyle}>
              <Box style={topLineStyle}></Box>
              <Box style={bottomLineStyle}></Box>
            </Box>
          </Tooltip>
        </Box>
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
              {smellTypes.map((smellType) => (
                <Radio
                  key={smellType.type}
                  colorScheme={smellType.color}
                  value={smellType.type}
                >
                  {smellType.type}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button mt={'12px'} onClick={handlePopoverSubmitWithSelectedValue}>Submit</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SmellButton;
