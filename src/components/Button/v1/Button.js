import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { applyTheme, preventAccidentalDoubleClick } from "../../../helpers";
import { applyThemeWithActionType } from "./helpers";

const ButtonDiv = styled.div`
  background-color: ${applyThemeWithActionType("buttonBackgroundColor", true)};
  border-color: ${applyThemeWithActionType("buttonBorderColor", true)};
  border-style: solid;
  border-width: 1px;
  border-radius: ${applyTheme("buttonBorderRadius")};
  color: ${applyThemeWithActionType("buttonForegroundColor", true)};
  cursor: pointer;
  display: ${(props) => {
    const { children, fullWidth } = props;
    if (fullWidth) {
      if (typeof children === "string") return "block";
      return "flex";
    }
    return "inline-flex";
  }};
  margin: 0;
  outline: none;
  padding: ${applyTheme("buttonPadding")};
  text-align: center;
`;

class Button extends Component {
  static propTypes = {
    /**
     * The type of action performed by the button
     */
    actionType: PropTypes.oneOf(["danger", "default", "important", "secondary"]),
    /**
     * The contents of the button, such as text, icons, or any combination of React and HTML components
     */
    children: PropTypes.node,
    /**
     * Classes for the button element
     */
    className: PropTypes.string,
    /**
     * Set to `true` to prevent the button from calling `onClick` when clicked
     */
    disabled: PropTypes.bool,
    /**
     * Button should take full width
     */
    fullWidth: PropTypes.bool,
    /**
     * Called with no arguments whenever the button is clicked. There is double-click protection,
     * so if the user double-clicks quickly, onClick is called only once.
     */
    onClick: PropTypes.func,
    /**
     * The string for the `title` attribute of the button element
     */
    title: PropTypes.string
  };

  static defaultProps = {
    actionType: "default",
    disabled: false,
    fullWidth: false,
    onClick() {}
  };

  handleClick = preventAccidentalDoubleClick((event) => {
    event.preventDefault();

    const { disabled, onClick } = this.props;

    if (!disabled) onClick();
  });

  handleKeyPress = (event) => {
    if (event.keyCode === 13) this.handleClick(event);
  };

  render() {
    const { actionType, children, className, disabled, fullWidth, title } = this.props;

    const moreButtonDivProps = {};
    if (disabled) {
      moreButtonDivProps["aria-disabled"] = "true";
    }

    return (
      <ButtonDiv
        actionType={actionType}
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={0}
        title={title}
        {...moreButtonDivProps}
      >
        {children}
      </ButtonDiv>
    );
  }
}

export default Button;