import { useColorModeValue, useCred, useUser } from "hooks";

import { StudyDocumentExtended } from "types/extended";

import { Link } from "components/atoms";
import { Tooltip, Box, Flex, Text, Button } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

import TabHeader from "../TabHeader";

interface Props {
  study: StudyDocumentExtended;
}

function DetailsHead({ study }: Props) {
  const cred = useCred();
  const user = useUser();

  const isParticipantVerified = cred.emailVerified;
  const hasParticipantEnrolled = user?.enrolled.includes(study.id);

  const enrolledButtonColor = useColorModeValue("green.500", "green.400");
  const enrolledButtonBackground = useColorModeValue("green.100", "green.900");

  const enrollRedirectLink = `/join-study/${study.id}/screening`;

  return (
    <TabHeader heading="Details">
      <Tooltip
        label={!isParticipantVerified && "You must verify your email before enrolling for studies"}
      >
        <Box>
          {hasParticipantEnrolled ? (
            <Flex
              align="center"
              gridGap="6px"
              paddingX="16px"
              color={enrolledButtonColor}
              background={enrolledButtonBackground}
              rounded="md"
              fontSize="14px"
              fontWeight="600"
              height="40px"
            >
              <FaCheckCircle />
              <Text marginBottom="2px">Enrolled</Text>
            </Flex>
          ) : (
            <Link to={enrollRedirectLink} isWrapper>
              <Button colorScheme="blue" isDisabled={!isParticipantVerified}>
                Enroll
              </Button>
            </Link>
          )}
        </Box>
      </Tooltip>
    </TabHeader>
  );
}

export default DetailsHead;
