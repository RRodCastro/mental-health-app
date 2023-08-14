import { Box, Fade, Modal, Typography, Backdrop, Button } from "@mui/material"
import { useEffect, useState } from "react";
import SearchComponent from "../search.component";
import { CheckOutlined } from "@mui/icons-material";

const tags = [
    { key: "tag-1", title: "Mood Tracking" },
    { key: "tag-2", title: "Anxiety" },
    { key: "tag-3", title: "Gratitude" },
    { key: "tag-4", title: "Self-Care" },
    { key: "tag-5", title: "Reflection" },
    { key: "tag-6", title: "Stress Relief" },
    { key: "tag-7", title: "Achievements" },
    { key: "tag-8", title: "Mindfulness" },
    { key: "tag-9", title: "Personal Growth" },
    { key: "tag-10", title: "Coping Strategies" },
    { key: "tag-11", title: "Positive Affirmations" },
    { key: "tag-12", title: "Emotional Well-being" },
    { key: "tag-13", title: "Relationships" },
    { key: "tag-14", title: "Goal Setting" },
    { key: "tag-15", title: "Resilience" },
    { key: "tag-16", title: "Daily Challenges" },
    { key: "tag-17", title: "Gratitude Journal" },
    { key: "tag-18", title: "Self-Reflection" },
    { key: "tag-19", title: "Mind-Body Connection" },
    { key: "tag-20", title: "Self-Discovery" }
  ];

const TagsModal = (props: { shouldDisplay: boolean, hideModal: () => void, storeTags: (tags: string[]) => void }
) => {
    const [open, setOpen] = useState(false);

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleClose = () => { props.hideModal(); setOpen(false); };

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (props.shouldDisplay) {
            setOpen(true);
        }
    }, [props.shouldDisplay]);

    const handleTagSelection = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((item) => item !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const getSelectedTagsTitles = () => {
        const selected = selectedTags.map((tag) => {
            return tags.find((item) => item.key === tag)?.title || '';

        })
        if (selected !== undefined) {
            return selected;
        }
        return [''];
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
                            <SearchComponent
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <Box className="tags-modal-container-box-entries">

                                {
                                    (tags.filter((tag) => tag.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))).map((tag) => {
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
                                <Button onClick={() => handleClose()} variant="contained" className="tags-modal-container-box-button-container-button">
                                    <Typography className='tags-modal-container-box-button-container-button-title'>Cancel</Typography>
                                </Button>
                                <Button onClick={() => { props.storeTags(getSelectedTagsTitles()); handleClose() }} variant="contained" className="tags-modal-container-box-button-container-button">
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