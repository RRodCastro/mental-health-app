import { Box, Fade, Modal, Typography, Backdrop, Button } from "@mui/material"
import { useEffect, useState } from "react";
import SearchComponent from "../search.component";
import { CheckOutlined } from "@mui/icons-material";

const tags = [
    {
        key: 'entry-0',
        title: 'Anxiety',
    },
    {
        key: 'entry-1',
        title: 'Stress',
    },
    {
        key: 'entry-2',
        title: 'Awarness',
    }
]
const TagsModal = (props: { shouldDisplay: boolean, hideModal: () => void }) => {
    const [open, setOpen] = useState(false);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleClose = () => { props.hideModal(); setOpen(false); setSelectedTags([]); };

    useEffect(() => {
        if (props.shouldDisplay) {
            setOpen(true);
        }
    }, [props.shouldDisplay]);

    //Handle tag selection
    const handleTagSelection = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };
    return (
        <div>
            <Modal
                className='tags-modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
            >
                <Fade in={open}>
                    <Box className="tags-modal-container">
                        <Typography variant="h6" className='tags-modal-title'> Tags</Typography>
                        <Box className="tags-modal-container-box">
                            <SearchComponent />
                            <Box className="tags-modal-container-box-entries">

                                {
                                    tags.map((tag) => {
                                        return (
                                            <Box
                                                onClick={() => handleTagSelection(tag.key)}
                                                className="tags-modal-container-box-entry"
                                                key={tag.key}>
                                                <Typography className='tags-modal-container-box-entry-title'>{tag.title}</Typography>
                                                {
                                                    selectedTags.includes(tag.key) ? <CheckOutlined /> : null
                                                }
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                            <Box className="tags-modal-container-box-button-container">
                                <Button onClick={ () => handleClose()} variant="contained" className="tags-modal-container-box-button-container-button">
                                    <Typography className='tags-modal-container-box-button-container-button-title'>Cancel</Typography>
                                </Button>
                                <Button  variant="contained" className="tags-modal-container-box-button-container-button">
                                    <Typography className='tags-modal-container-box-button-container-button-title'>Add</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default TagsModal;