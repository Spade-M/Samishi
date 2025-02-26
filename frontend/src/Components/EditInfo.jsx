import React from "react";

const EditInfo = () => {
  return (
    <>
      <h1>Edit Information</h1>
      <br />
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <br />
          <button type="update" className="btn btn-success">
            Save Changes
          </button>
          <br />
          <br />
          <button type="clear" className="btn btn-primary">
            Clear
          </button>
          <br />
          <br />
          <button type="delete" className="btn btn-danger">
            Delete User
          </button>
        </form>
      </div>
    </>
  );
};

export default EditInfo;
