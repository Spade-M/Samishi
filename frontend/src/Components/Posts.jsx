import React from "react";

const Posts = () => {
  return (
    <div>
      <form action="" method="post" encType="multipart/form-data">
        <input type="file" name="file[]" id="files" multiple />
        <br />
        <br />
        <input
          type="text"
          name="caption"
          id="caption"
          placeholder="Write Something"
        />
        <br />
        <br />
        <input type="button" id="submit" value="Upload" />
      </form>
      <br />
      <div id="preview"></div>
      

    </div>
  );
};

export default Posts;
