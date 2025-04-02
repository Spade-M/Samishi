import React from "react";

const Contact = () => {
  return (
    <div>
      <>
        <nav class="navbar sticky-top bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Sticky top
            </a>
            <ul class="nav justify-content-end">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Post
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Cat Facts
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  User Info
                </a>
              </li>
              <li>
                <button className="btn btn-danger" type="button">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </>
    </div>
  );
};

export default Contact;
