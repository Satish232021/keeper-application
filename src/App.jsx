import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("item");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [titlePlaceHolder, setTitlePlaceHolder] = useState('Title');
  const [contentPlaceHolder, setcontentPlaceHolder] = useState('Write Content');

  function addNote(newNote) {
    if (newNote.title === '' || newNote.content === '') {
      setcontentPlaceHolder('Kindly fill both title and content');
      return;
    } else {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
      setTitlePlaceHolder('Title');
      setcontentPlaceHolder('Write content');
    }

  }



  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(notes));
  }, [notes]);

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} 
      titlePlaceHolder={titlePlaceHolder}
      contentPlaceHolder={contentPlaceHolder}/>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
