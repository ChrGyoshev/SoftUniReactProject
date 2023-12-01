const ErrorBox = ({ resetErrors, errors, errorBoxRef }) => {
  return (
    <div className="overlay-errors">
      <div className="error-box" ref={errorBoxRef}>
        <button className="button-close-edit-profile" onClick={resetErrors}>
          x
        </button>
        <h2>Something went wrong</h2>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>
              {" "}
              <i className="fa-solid fa-triangle-exclamation"></i>
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ErrorBox;
