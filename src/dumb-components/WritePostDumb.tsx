import React from 'react'
import { CenterInnerContent } from '../styling/styles'
import { Box, Typography, TextareaAutosize, Button } from '@mui/material'

type WritePostDumbProps = {
    handleSubmitPost: () => void,
    setTextAreaValue: React.Dispatch<React.SetStateAction<string>>,
    textAreaValue: string,
    title: string,
    btnTitle: string
}

const WritePostDumb = ({ handleSubmitPost, setTextAreaValue, textAreaValue, title, btnTitle }: WritePostDumbProps) => {
    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Typography
                component="h1"
                variant="h4"
                sx={{
                    marginBottom: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '.3em',
                    width: '100%'
                }}>
                {title}
            </Typography>
            <CenterInnerContent>
                <Box component='form' onSubmit={handleSubmitPost} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextareaAutosize
                        onChange={(event) => setTextAreaValue(event.target.value)}
                        value={textAreaValue}
                        name="post"
                        minRows={10}
                        placeholder=" What's on your mind"
                        style={{ width: '30em', borderRadius: '5px', padding: '.5em' }}
                        autoFocus
                    />
                    <Button
                        type='submit'
                        variant="contained"
                        sx={{ marginY: '2em', width: '10em', height: '3em', fontSize: '1em' }}
                    >{btnTitle}</Button>
                </Box>
            </CenterInnerContent>
        </Box>
    )
}

export default WritePostDumb