import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Cookies from "js-cookie";

function ProfileViewer() {
  // Use state for each input. If changed, then make update.
  // UseEffect to trigger call to currently logged in user.
  // Need to see the custom profile model...?

  const [profile, setCurrentProfile] = useState({
    display_name: "loading",
    avatar: null,
    first_name: "loading",
    last_name: "loading",
    user: "loading",
    user_email: "loading",
    user_name: "loading",
  });
  const [preview, setPreview] = useState("");

  const handleError = (err) => {
    console.warn("error!");
  };

  useEffect(() => {
    const getProfile = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };
      const response = await fetch("/api_v1/profile/", options).catch(
        handleError
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const profileResponse = await response.json();

      if (profileResponse) {
        setCurrentProfile(profileResponse[0]);
        console.log("Current profile:", profile);
      }
    };
    getProfile();
  }, []);

  if (!profile) {
    console.log("loading");
  } else {
    console.log("Updated profile", profile);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("display_name", profile.display_name);
    formData.append("avatar", profile.avatar);
    formData.append("first_name", profile.first_name);
    formData.append("last_name", profile.last_name);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        // Sending an image.
      },
      body: formData,
    };

    const response = await fetch(
      "/api_v1/profile/detail/" + profile.id + "/",
      options
    );
    const data = await response.json();
    console.log({ data });
  };

  const handleInput = (event) => {
    // Destructures the name and value properties.
    const { name, value } = event.target;
    /*
    setProfile({
      ...profile,
      [name]: value,
    });

    Below function executes the same function as above:
    */

    setCurrentProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setCurrentProfile({
      ...profile,
      avatar: file, //This is the binary representation of the file 0100101010110
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
          <input type="file" name="avatar" onChange={handleImage} />
          <img className="avatar" src={preview || profile.avatar} />

          <Form.Group className="mb-3" controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              name="display_name"
              placeholder="Enter display name"
              value={profile.display_name}
              onChange={handleInput}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="user_email"
              value={profile.user_email}
              onChange={handleInput}
              placeholder="Enter email"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={handleInput}
              name="user_name"
              type="text"
              value={profile.user_name}
              placeholder="Enter username"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFirstname">
            <Form.Label>First name</Form.Label>
            <Form.Control
              value={profile.first_name}
              onChange={handleInput}
              type="text"
              name="first_name"
              placeholder="Enter first name"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              value={profile.last_name}
              onChange={handleInput}
              type="text"
              name="last_name"
              placeholder="Enter last name"
              autoComplete="off"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ProfileViewer;
