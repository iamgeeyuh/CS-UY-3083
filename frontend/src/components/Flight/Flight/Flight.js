import { useState, useContext } from "react";
import PassengersModal from "../PassengersModal/PassengersModal";
import RatingsModal from "../Ratings/RatingsModal/RatingsModal";
import PurchaseModal from "../PurchaseModal/PurchaseModal";
import SuccessModal from "../../SuccessModal/SuccessModal";
import ViewReviewModal from "../../ViewReviewModal/ViewReviewModal";
import styles from "./Flight.module.css";
import AuthContext from "../../../context/auth-context";

const Flight = (props) => {
  const ctx = useContext(AuthContext);
  const [modalRatings, setModalRatings] = useState(false);
  const [modalPassenger, setModalPassenger] = useState(false);
  const [modalPurchase, setModalPurchase] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");

  const modalCancelHandler = () => {
    setModalCancel(false);
  };

  const modalReviewHandler = () => {
    setModalReview(false);
  };

  const modalRatingsHandler = () => {
    setModalRatings(false);
  };

  const modalPassengersHandler = () => {
    setModalPassenger(false);
  };

  const modalPurchaseHandler = () => {
    setModalPurchase(false);
  };

  const checkCancel = () => {
    setModalCancel(true);
  };

  const checkReviews = () => {
    setModalReview(true);
  };

  const checkRatings = () => {
    setModalRatings(true);
  };

  const checkPassengers = () => {
    setModalPassenger(true);
  };

  const checkPurchase = () => {
    setModalPurchase(true);
  };

  const cancel = () => {
    const formData = new URLSearchParams();

    formData.append("flight_num", props.flightNum);
    formData.append("airline_name", props.airline);
    formData.append("email", ctx.isLoggedIn.email);
    fetch("http://localhost:5000/display_cancel_trip", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error canceling");
        }
      })
      .then((data) => {
        setCancelMessage(data.msg);
        checkCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={styles.flight}>
        <label className={styles.flightAirline}>{props.airline}</label>
        <div>
          {props.page == "staff" && (
            <button className={styles.buttons} onClick={checkRatings}>
              Ratings
            </button>
          )}
          {props.page == "staff" && (
            <button className={styles.buttons} onClick={checkPassengers}>
              Passengers
            </button>
          )}
          {props.page == "purchase" && (
            <button className={styles.buttons} onClick={checkPurchase}>
              Purchase
            </button>
          )}
          {props.page == "review" && (
            <button className={styles.buttons} onClick={checkReviews}>
              Review
            </button>
          )}
          {props.page == "cancel" && (
            <button className={styles.button} onClick={cancel}>
              Cancel
            </button>
          )}
          <div> 
            <label>From</label>
            <h2>{props.depTime}</h2>
            <h5 style={{ color: "var(--font-purple)" }}>
              {props.srcCity}-{props.srcAirport}
            </h5>
            <h5>{props.depDate}</h5>
          </div>
          <div>
            <label>To</label>
            <h2>{props.arrTime}</h2>
            <h5 style={{ color: "var(--font-purple)" }}>
              {props.dstCity}-{props.dstAirport}
            </h5>
            <h5>{props.arrDate}</h5>
          </div>
          <div>
            <h2>${props.price}</h2>
          </div>
        </div>
      </div>
      {modalRatings && (
        <RatingsModal
          modalHandler={modalRatingsHandler}
          depTime={props.depTime}
          depDate={props.depDate}
          flightNum={props.flightNum}
          airline={props.airline}
        />
      )}
      {modalRatings && <div className={styles.dimmedBackground}></div>}
      {modalPassenger && (
        <PassengersModal
          modalHandler={modalPassengersHandler}
          flightNum={props.flightNum}
          depDate={props.depDate}
          depTime={props.depTime}
          airline={props.airline}
        />
      )}
      {modalPassenger && <div className={styles.dimmedBackground}></div>}
      {modalPurchase && <PurchaseModal modalHandler={modalPurchaseHandler} />}
      {modalPurchase && <div className={styles.dimmedBackground}></div>}
      {modalReview && <ViewReviewModal modalHandler={modalReviewHandler} />}
      {modalReview && <div className={styles.dimmedBackground}></div>}
      {modalCancel && (
        <SuccessModal
          message={cancelMessage}
          modalHandler={modalCancelHandler}
        />
      )}
      {modalCancel && <div className={styles.dimmedBackground}></div>}
    </div>
  );
};

export default Flight;
