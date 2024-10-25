//Imports
import {db, reference, setter, getter, db_ref, children, updater} from "./init_firebase.js";

//Function
//Set data in database
function set(path, data){
    setter(reference(db, path), data)
}

//Read data from database
function read(path){
    return getter(children(db_ref, path)) //return snapshot of get data from database
    .then((snapshot) => {
        return snapshot.val(); //retrun result
    })
    .catch((error) => {
        return "error";
    });
}

function update(path, data){
    updater(reference(db, path), data)
}

//Export
export { set, read, update };