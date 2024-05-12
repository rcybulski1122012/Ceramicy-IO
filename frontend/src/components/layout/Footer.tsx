import { Flex, Icon, Text, chakra, VStack, Divider, StackDivider, Box, Button } from "@chakra-ui/react"
import { useTheme } from "@emotion/react";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    const theme = useTheme()
    return (
        <Flex px={24} py={3} justify={"space-between"} align={"center"}
            borderTop={`3px solid ${theme.colors.gray[50]}`}>
            <VStack divider={<StackDivider borderWidth={"2px"} borderColor={theme.colors.gray[50]} />}>
                <Flex align={"center"} gap={1}>
                    <Icon as={RiCodeSSlashFill} fontSize={"lg"} fill={theme.colors.primary} fontWeight={"bold"} />
                    <Text fontFamily={"heading"} fontSize={"small"} fontWeight={"bold"}>Code
                        <chakra.span color={theme.colors.secondary}>Smell</chakra.span>  App
                    </Text>
                </Flex>
                <Text fontFamily={"heading"} fontSize={"md"} fontWeight={"bold"}>&reg; Ceramicy</Text>
            </VStack>
            <VStack divider={<StackDivider borderWidth={"2px"} borderColor={theme.colors.gray[50]} />}>
                <Text fontFamily={"heading"} fontSize={"md"} fontWeight={"bold"}>Stay in touch</Text>
                <Flex gap={2}>
                    <Icon cursor={"pointer"} _hover={{ transform: "scale(1.2)" }} as={FaLinkedin} fontSize={"lg"} fill={theme.colors.secondary} fontWeight={"bold"} />
                    <Icon cursor={"pointer"} _hover={{ transform: "scale(1.2)" }} as={FaFacebook} fontSize={"lg"} fill={theme.colors.secondary} fontWeight={"bold"} />
                    <Icon cursor={"pointer"} _hover={{ transform: "scale(1.2)" }} as={FaInstagram} fontSize={"lg"} fill={theme.colors.secondary} fontWeight={"bold"} />
                    <Icon cursor={"pointer"} _hover={{ transform: "scale(1.2)" }} as={FaTwitter} fontSize={"lg"} fill={theme.colors.secondary} fontWeight={"bold"} />
                </Flex>
            </VStack>
        </Flex >)
}

export default Footer;
