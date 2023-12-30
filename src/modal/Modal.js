import React from 'react';
import PropTypes from "prop-types";
/* import "./Modal.css"; */

/**
 * This is defining a functional component called <b>Modal</b> that takes in six props,<b>displayState</b>, <b>handleClose</b>, <b>message</b>, <b>bgColor</b>, <b>textColor</b>, <b>textSize</b> and <b>btnColor</b> using destructuring syntax. The component returns a JSX element that renders a modal with a message and a close button.
 *
 * This modal component can be style in the Modal.scss file.
 *
 * Usage :
 * \<Modal
 *   displayState={modalDisplayState}
 *   handleClose={handleCloseModal}
 *   message="Employee Created!"
 *   bgColor=""
 *   textColor=""
 *   textSize=""
 *   btnColor=""
 * />
 *
 * Component's Hierarchy: CreateEmployee > Modal
 *
 * @component
 * @name Modal
 * @kind function
 * @param {string} displayState - The open or closed state of the modal. It can be manage with a local state like in the example above. The two values are <b>block</b> and <b>none</b>. The modal is Hidden by default.
 * @param {callback} handleClose - The callback that handles the close button of the modal
 * @param {string} message - The message to display in the modal
 * @param {string} bgColor - The background color of the modal (optional)
 * @param {string} textColor - The text color of the message (optional)
 * @param {string} textSize - The text size of the message (optional)
 * @param {string} btnColor - The basic color of the close button (optional)
 * @returns { JSX.Element }
 */
const Modal = ({ displayState, handleClose, message, bgColor, textColor, textSize, btnColor }) => {
  return (
    <div className='modal' style={{ display: displayState }}>
      <div
        className='modal-content'
        style={{ backgroundColor: bgColor !== "" ? bgColor : undefined }}>
        {/* Modal content */}
        <span
          className='close-button'
          onClick={handleClose}
          style={{ color: btnColor !== "" ? btnColor : undefined }}>
          &times;
        </span>
        <p
          className='modal-message'
          style={{ 
            color: textColor !== "" ? textColor : undefined,
            fontSize: textSize !== "" ? textSize : undefined, 
          }}>
          {message}
        </p>
      </div>
    </div>
  );
};


/* PropTypes */
Modal.propTypes = {
  displayState: PropTypes.string,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.string,
  btnColor: PropTypes.string,
};

export default Modal;
