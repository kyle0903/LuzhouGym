import React from "react";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
function TTest() {
  return (
    <div>
      <div>
        <label htmlFor="spacekey" className="font-bold block mb-2">
          Block Space
        </label>
        <InputText id="spacekey" className="w-full" keyfilter={/[^ ]/} />
      </div>
    </div>
  );
}

export default TTest;
