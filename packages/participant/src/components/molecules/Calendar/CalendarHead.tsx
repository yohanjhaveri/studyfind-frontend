import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import CalendarHeadButton from "./CalendarHeadButton";

interface Props {
  month: number;
  year: number;
  backYear: () => void;
  backMonth: () => void;
  nextYear: () => void;
  nextMonth: () => void;
}

function CalendarHead({ month, year, backYear, backMonth, nextYear, nextMonth }: Props) {
  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Flex justify="space-between" align="center">
      <Flex gridGap="8px">
        <CalendarHeadButton icon={<FaAngleDoubleLeft />} onClick={backYear} />
        <CalendarHeadButton icon={<FaAngleLeft />} onClick={backMonth} />
      </Flex>
      <Flex gridGap="4px" justify="center">
        <Text fontWeight="600">{MONTH_NAMES[month]}</Text>
        <Text fontWeight="600">{year}</Text>
      </Flex>
      <Flex gridGap="8px">
        <CalendarHeadButton icon={<FaAngleRight />} onClick={nextMonth} />
        <CalendarHeadButton icon={<FaAngleDoubleRight />} onClick={nextYear} />
      </Flex>
    </Flex>
  );
}

export default CalendarHead;
