import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

export default class BtnAction extends Component {

    render() {
        const { name = "", icon = "" } = this.props;

        return (
            <div className="d-flex align-items-center justify-content-center text-uppercase ml-4" style={{ fontSize: "10px", fontWeight: "500", cursor: "pointer" }} onClick={(event) => this.props.action(event)}>
                <span className="d-flex align-items-center justify-content-center text-black mr-1 bg-success" style={{ height: "20px", width: "20px", borderRadius: "50%", fontSize: "12px" }}><MaterialIcon icon={icon} /></span>
                {name}
            </div>
        );
    }
}