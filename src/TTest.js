import React from "react";
import { FileUpload } from "primereact/fileupload";
function TTest() {
  return (
    <div>
      <div>
        <FileUpload
          name="demo[]"
          url={"/api/upload"}
          multiple
          accept="image/*"
          maxFileSize={1000000}
          emptyTemplate={
            <p className="m-0">Drag and drop files to here to upload.</p>
          }
        />
      </div>
    </div>
  );
}

export default TTest;
