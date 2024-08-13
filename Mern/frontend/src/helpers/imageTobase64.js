//converts an image file into a Base64-encoded string. This is often used in web applications to handle image uploads or to store image data as a string that can be sent via JSON or stored in a database.

const imageTobase64 = async(image) =>{
    const reader = new FileReader()
    //FileReader is a built-in JavaScript class that allows web applications to read the contents of files (or blobs) asynchronously

    reader.readAsDataURL(image)
//read as data url: This method starts reading the content of the image file. When the reading operation is complete, it will trigger an onload event and set the result property of the reader object to the file’s content, represented as a Base64-encoded string.

    const data = await new Promise((resolve,reject)=>{
        reader.onload = () => resolve(reader.result)

        reader.onerror = error => reject(error)
    })

    return data

}

export default imageTobase64