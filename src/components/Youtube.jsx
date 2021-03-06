import React, { Component } from "react";
import $ from "jquery";
import { Avatar, ListItem } from "material-ui";
import { withRouter } from "react-router-dom";
import { Clear } from "material-ui-icons";

class Youtube extends Component {
  state = {
    searchList: [],
    user: {}
  };
  searchInstagram = e => {
    if (e.target.value === "") {
      this.hideList();
    }
    let that = this;
    $.get("https://www.instagram.com/web/search/topsearch/?context=blended&query=" + e.target.value + "&rank_token=0.8363943057400951", res => {
      that.setState({
        searchList: res.users.slice(0, 5)
      });
    });
  };
  hideList = () => {
    setTimeout(() => {
      this.setState({
        searchList: []
      });
    }, 500);
  };
  openFile = () => {
    $("#video").trigger("click");
  };
  componentDidMount() {
    $("#video").on("change", function() {
      var file = this.files[0];
      console.log(file);
      var reader = new FileReader();
      reader.onload = viewer.load;
      reader.readAsDataURL(file);
      viewer.setProperties(file);
    });

    var viewer = {
      load: e => {
        console.log(e.target.results);
      },
      setProperties: f => {}
    };
  }
  selectInstaProfile = item => {
    this.setState({ user: item.user, profileSelected: true });
  };
  clearUser = () => {
    this.setState({
      user: {},
      profileSelected: false
    });
  };
  render() {
    return (
      <div className="youtube_container centerBlock">
        <div>
          {!this.state.profileSelected ? (
            <div>
              <div className="searchContainer">
                <input onBlur={this.hideList} onFocus={this.hideList} className="instagram_search" onChange={this.searchInstagram} placeholder="Your instagram username" />
              </div>
              {this.state.searchList.length > 0 ? (
                <div className="searchList">
                  {this.state.searchList.map((item, index) => {
                    return <ListItem style={{ width: "100%" }} onClick={() => this.selectInstaProfile(item)} key={index} primaryText={item.user.username} secondaryText={item.user.full_name} leftAvatar={<Avatar src={item.user.profile_pic_url} />} />;
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <ListItem style={{ marginBottom: 15, background: "#ffffff", border: "1px solid #dedede" }} primaryText={this.state.user.username} secondaryText={this.state.user.full_name} rightIcon={<Clear onClick={this.clearUser} />} leftAvatar={<Avatar src={this.state.user.profile_pic_url} />} />
          )}
          <div className="searchContainer">
            <input className="instagram_search" placeholder="Video title" />
          </div>
          <div className="searchContainer">
            <textarea className="instagram_search" placeholder="Video Description" />
          </div>
          {/* <video width="400" controls>
            <source id="video_here">Your browser does not support HTML5 video.</source>
          </video> */}
          <div className="fileuploadButton">
            <input accept="video/*" id="video" type="file" style={{ position: "absolute", visibility: "hidden", left: 0 }} />
            <button onClick={this.openFile} background={this.props} className="button">
              Select Video
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Youtube);
