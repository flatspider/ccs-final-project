import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ProfileViewer() {
  // Use state for each input. If changed, then make update.

  // UseEffect to trigger call to currently logged in user.
  // Need to see the custom profile model...?

  const [profile, setCurrentProfile] = useState("");

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
      setCurrentProfile(profileResponse);
      console.log("Current profile:", profileResponse);
    };
    getProfile();
  }, []);

  return (
    <>
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">Edit Profile</h1>

        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                class="avatar img-circle img-thumbnail"
                alt="avatar"
              ></img>
              <h6>Avatar: Upload a different photo...</h6>

              <input type="file" class="form-control"></input>
            </div>
          </div>

          <div class="col-md-9 personal-info">
            <h3>Personal info</h3>

            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label class="col-lg-3 control-label">First name:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value="dey-dey"
                  ></input>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Last name:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value="bootdey"
                  ></input>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">User Name:</label>
                <div class="col-lg-8">
                  <input class="form-control" type="text" value=""></input>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Display name:</label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value="janesemail@gmail.com"
                  ></input>
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-3 control-label">Time Zone:</label>
                <div class="col-lg-8">
                  <div class="ui-select">
                    <select id="user_time_zone" class="form-control">
                      <option value="Hawaii">(GMT-10:00) Hawaii</option>
                      <option value="Alaska">(GMT-09:00) Alaska</option>
                      <option value="Pacific Time (US &amp; Canada)">
                        (GMT-08:00) Pacific Time (US &amp; Canada)
                      </option>
                      <option value="Arizona">(GMT-07:00) Arizona</option>
                      <option value="Mountain Time (US &amp; Canada)">
                        (GMT-07:00) Mountain Time (US &amp; Canada)
                      </option>
                      <option
                        value="Central Time (US &amp; Canada)"
                        selected="selected"
                      >
                        (GMT-06:00) Central Time (US &amp; Canada)
                      </option>
                      <option value="Eastern Time (US &amp; Canada)">
                        (GMT-05:00) Eastern Time (US &amp; Canada)
                      </option>
                      <option value="Indiana (East)">
                        (GMT-05:00) Indiana (East)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileViewer;
