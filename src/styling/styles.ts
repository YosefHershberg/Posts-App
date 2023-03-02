import { styled } from '@mui/material/styles';
import { Box, } from '@mui/material'

export const AppComp = styled(Box)`
    width: 100vw;
    height: 100vh;
    margin: 0;
`

export const MainComp = styled(Box)`
    height: 90%;
    width: 100%;
    padding: 1em;
`

export const CenterInnerContent = styled(Box)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PostListComp = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
