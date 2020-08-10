import React, { Component } from 'react';

class Editable extends Component {
    constructor(props){
        super(props);
        this.state = {isEditing: false}
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.childRef !== prevProps.childRef || this.state.isEditing !== prevState.isEditing) {
            if (this.props.childRef && this.props.current && this.state.isEditing === true) {
                this.props.childRef.focus();
            }
        }
    }

    // handler for keys being pressed during editing
    handleKeyDown(event, type){
        // key is pressed
        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];
        if (
            (type === "textarea" && keys.indexOf(key) > -1) ||
            (type !== "textarea" && allKeys.indexOf(key) > -1)
        ) {
            this.setState({isEditing: false});
        }
    }

    render(){
        return (
            <section {...this.props}>
                {this.state.isEditing ? (
                    <div
                        onBlur={() => this.setState({isEditing: false})}
                        onKeyDown={e => this.handleKeyDown(e, this.props.type)}
                    >
                        {this.props.children}
                    </div>
                ) : (
                    <div
                        onClick={() => this.setState({isEditing: true})}
                    >
                    <span>
                        {this.props.text || this.props.placeholder || "Editable content"}
                    </span>
                    </div>
                )}
            </section>
        );
    }
}

export default Editable;
