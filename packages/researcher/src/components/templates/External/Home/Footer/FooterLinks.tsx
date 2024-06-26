import { useColorModeValue } from "hooks";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "components/atoms/Link/Link";

interface Props {
  links: {
    linkedin: string;
    instagram: string;
    facebook: string;
  };
}

function FooterLinks({ links }: Props) {
  const color = useColorModeValue("gray.500", "gray.200");

  return (
    <ButtonGroup variant="ghost" color="gray.600">
      <Link to={links.linkedin}>
        <IconButton icon={<FaLinkedin />} color={color} fontSize="20px" aria-label="LinkedIn" />
      </Link>
      <Link to={links.instagram}>
        <IconButton icon={<FaInstagram />} color={color} fontSize="20px" aria-label="Instagram" />
      </Link>
      <Link to={links.facebook}>
        <IconButton
          icon={<FaFacebookSquare />}
          color={color}
          fontSize="20px"
          aria-label="Facebook"
        />
      </Link>
    </ButtonGroup>
  );
}

export default FooterLinks;
