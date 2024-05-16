import React, { useContext, useState,useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);const refClose = useRef(null);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully","success");

  
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote />

 
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label" >Title </label>
          <input type="text" className="form-control" id="etitle" value={note.etitle} minLength={5} required name="etitle" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label"  > Description </label>
          <input type="text" className="form-control" id="edescription" name="edescription" minLength={5} required value={note.edescription} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label" > Tag </label>
          <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}/>
        </div>
        
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

      <h2>Your Notes</h2>
      <div className="row row-cols-1 row-cols-md-3">
        
        {notes.length===0 && 'No Note to display'}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
