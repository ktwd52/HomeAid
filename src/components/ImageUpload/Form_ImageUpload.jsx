import { Button } from "@nextui-org/react";
import { useState } from "react";

function Form_ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      // Add your image upload logic here (e.g., uploading to a server)
      console.log("Uploading:", selectedImage);
    } else {
      console.log("No image selected");
    }
  };

  return (
    <form>
      <fieldset>
        <br />
        <label htmlFor="avatar">Choose a Request picture:</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-dashed border-2 border-gray-400 rounded-lg p-4 cursor-pointer mb-4"
        >
          {selectedImage ? (
            <p>{selectedImage.name}</p>
          ) : (
            <p>Drag and drop an image here, or click to select an image</p>
          )}
        </div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <Button
          color="primary"
          variant="bordered"
          className="mt-4 p-2 bg-blue-500 text-white rounded-md"
          onClick={handleUpload}
        >
          Upload Image
        </Button>
      </fieldset>
    </form>
  );
}

export default Form_ImageUpload;
