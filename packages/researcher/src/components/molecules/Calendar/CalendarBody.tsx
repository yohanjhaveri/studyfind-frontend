import React from "react";
import moment from "moment-timezone";
import styled from "styled-components";

import { useColorModeValue } from "hooks";

import { Flex } from "@chakra-ui/react";

interface Props {
  month: number;
  year: number;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
}

function CalendarBody({ month, year, date, setDate }: Props) {
  const activeColor = useColorModeValue("blue.500", "blue.400");
  const defaultColor = useColorModeValue("gray.500", "gray.500");

  const render = () => {
    const today = moment().format("YYYY-MM-DD");
    const selected = moment(`${year}-${month + 1}`, "YYYY-M");
    const daysInMonth = selected.daysInMonth();
    const firstWeekday = selected.startOf("month").format("d");
    const firstWeekdayOffsetFromMonday = (parseInt(firstWeekday) + 6) % 7;

    return [0, 1, 2, 3, 4, 5].map((week) => (
      <tr key={week}>
        {[0, 1, 2, 3, 4, 5, 6].map((weekday) => {
          const count = week * 7 + weekday;
          const currentDay = count - firstWeekdayOffsetFromMonday + 1;
          const currentDate = moment([year, month, currentDay]).format("YYYY-MM-DD");
          const isValid = currentDay <= daysInMonth && count >= firstWeekdayOffsetFromMonday;

          const isSelected = date === currentDate;
          const isToday = today === currentDate;

          return (
            <TableBodyCell key={weekday} onClick={() => isValid && setDate(currentDate)}>
              <Day cursor={isValid && "pointer"} justify="center" align="center">
                <Selected
                  justify="center"
                  align="center"
                  rounded="full"
                  today={today === currentDate}
                  selected={date === currentDate}
                  color={isToday ? activeColor : defaultColor}
                  background={isSelected ? activeColor : "transparent"}
                  borderColor={isToday ? activeColor : "transparent"}
                  borderWidth="2px"
                >
                  {isValid ? currentDay : ""}
                </Selected>
              </Day>
            </TableBodyCell>
          );
        })}
      </tr>
    ));
  };

  return (
    <Table>
      <thead>
        <tr>
          <TableHeadCell>Mon</TableHeadCell>
          <TableHeadCell>Tue</TableHeadCell>
          <TableHeadCell>Wed</TableHeadCell>
          <TableHeadCell>Thu</TableHeadCell>
          <TableHeadCell>Fri</TableHeadCell>
          <TableHeadCell>Sat</TableHeadCell>
          <TableHeadCell>Sun</TableHeadCell>
        </tr>
      </thead>
      {render()}
    </Table>
  );
}

const Table = styled.table`
  table-layout: fixed;
  width: 300px;
`;

const TableHeadCell = styled.th`
  padding: 6px;
  text-align: center;
  font-size: 0.75rem;
`;

const TableBodyCell = styled.td`
  box-sizing: border-box;
  height: calc(300px / 7);
  text-align: center;
  font-size: 0.85rem;
`;

const Day = styled(Flex)`
  height: 100%;
  width: 100%;
`;

const Selected = styled(Flex)`
  height: 80%;
  width: 80%;

  ${(props) =>
    props.today &&
    `
    font-weight: 500;
    border-radius: 1000px;
  `}

  ${(props) =>
    props.selected &&
    `
    font-weight: 500;
    color: white;
    border-radius: 1000px;
  `}
`;

export default CalendarBody;
