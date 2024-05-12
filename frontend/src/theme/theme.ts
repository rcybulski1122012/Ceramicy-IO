import { extendTheme } from "@chakra-ui/react"
import colors from "./foundations/colors"
import { fontSizes, fontWeights, fonts } from "./foundations/fonts"


const theme = extendTheme(
    {
        colors,
        fonts,
        fontSizes,
        fontWeights
    }
)

export default theme;
