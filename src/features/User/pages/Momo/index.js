import { connect } from "react-redux";
function Momo(props) {
  window.location.href = props.linkMomo;
  return null;
}
const mapStateToProps = (state) => ({
  linkMomo: state.user.linkMomo,
});
export default connect(mapStateToProps, null)(Momo);
