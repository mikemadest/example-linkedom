import PropTypes from "prop-types";

function Content({ onAction }) {
  return (
    <section>
      <div>
        <p>Example of "working" app using linkedom + jest for testing</p>
        <p className="searchNode">search</p>
        <button type="button" onClick={onAction}>
          Click me!
        </button>
      </div>
    </section>
  );
}

Content.propTypes = {
  onAction: PropTypes.func.isRequired,
};
export default Content;
