import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
    setIsActive(false);
  }

  const [isActive, setIsActive] = useState(false);

  function clickHandler() {
    setIsActive((prevBool) => {
      return !prevBool;
    });
    setIsActive(true);
  }
  

  return (
    <div>
      <form className="create-note">
      {isActive && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder={props.titlePlaceHolder}
          />
        )}

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder={props.contentPlaceHolder}
          rows={isActive ? 3 : 1}
          onClick={clickHandler}
        />
        {isActive ? (
          <Zoom in={isActive} appear={isActive}>
            <Fab color="primary" onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </form>
    </div>
  );
}

export default CreateArea;
