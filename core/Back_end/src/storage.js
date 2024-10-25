import {storage, storage_ref, upload, download} from "./init_firebase.js";

function set(file, path){
    return new Promise((resolve, reject) => {
        const fileRef = storage_ref(storage, path);

        upload(fileRef, file).then((snapshot) => {
            download(snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            }).catch((error) => {
                reject(error); 
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export {set};