import { extendTheme } from "@chakra-ui/react"
import colors from "./foundations/colors"
import { fontSizes, fontWeights, fonts, textStyles } from "./foundations/fonts"


const theme = extendTheme(
    {
        colors,
        fonts,
        fontSizes,
        fontWeights,
        textStyles
    }
)

export default theme;
