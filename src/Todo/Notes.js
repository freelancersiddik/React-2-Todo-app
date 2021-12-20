import React from "react";
import "./Style.css";
// importin icon
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
// get items data form the database
const getlocalstroagedata = () => {
  const list = localStorage.getItem("Todo-Notes");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Notes = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getlocalstroagedata());
  const [editItem, setEditItem] = useState("");
  const [togglebutton, settogglebutton] = useState(false);

  // adding todo in items arry
  const addItem = () => {
    if (!inputdata) {
      alert("Please Enter Your Notes...");
    } else if (inputdata && togglebutton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      settogglebutton(false);
      setInputdata("");
    } else {
      const newupdateData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, newupdateData]);
      setInputdata("");
    }
  };

  // update data
  const updateItems = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputdata(item_todo_edited.name);
    setEditItem(index);
    settogglebutton(true);
  };

  // deleting data
  const deleteItem = (index) => {
    const updateItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updateItems);
  };
  // remove data
  const removeItems = () => {
    setItems([]);
  };
  // Set items in to localsorage for save data
  useEffect(() => {
    localStorage.setItem("Todo-Notes", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container-fluid">
      <p className="text-end text-capitalize">
        created by{" "}
        <span className="fw-bold text-white">
          <a href="http://siddikhp.herokuapp.com/" target="_asdblank">
            Siddik
          </a>
        </span>{" "}
      </p>
      <h2 className="pb-2 text-center">Your Notes are Safe Here </h2>
      <div className="inputbox d-flex">
        <input
          type="text"
          name="text"
          placeholder="Enter Your Notes"
          className="form-control"
          value={inputdata}
          onChange={(e) => setInputdata(e.target.value)}
          autoComplete="off"
        />
        {togglebutton ? (
          <Button className="btn" variant="contained" onClick={addItem}>
            Update
          </Button>
        ) : (
          <Button className="btn" variant="contained" onClick={addItem}>
            Add
          </Button>
        )}
      </div>

      <div className="container pb-3">
        <div className="row mx-auto">
          {items.map((curElem) => {
            return (
              <div
                className="card col-md-4 mx-auto col-xxl-4 col-6 p-3"
                key={curElem.id}
              >
                <p className="card-title">{curElem.name}</p>
                <div className="btn-box">
                  <Button
                    className="btn"
                    variant="contained"
                    onClick={() => updateItems(curElem.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn"
                    variant="contained"
                    onClick={() => deleteItem(curElem.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="btn remove-btn"
          variant="contained"
          onClick={removeItems}
        >
          Remove All Note's
        </Button>
      </div>
    </div>
  );
};

export default Notes;
