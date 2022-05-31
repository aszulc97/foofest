import React from "react";
import AvailableSpots from "./AvailableSpots";
import CountTicket from "./CountTicket";
import { useState, useEffect } from "react";

function StepAccomodation(props) {
  const { twoPeopleTent, threePeopleTent, vipCount, regularCount, disableNextStep, ownTent } =
    props;
  const [peopleEqual, setPeopleEqual] = useState(false);

  useEffect(() => {
    disableNextStep(ownTent);
  }, [ownTent, disableNextStep]);

  function ownTentChange() {
    props.setOwnTent((oldvalue) => !oldvalue);
    props.resetTents();
    props.disableNextStep(props.ownTent);
  }

  useEffect(() => {
    if (!props.ownTent) {
      if (twoPeopleTent * 2 + threePeopleTent * 3 === vipCount + regularCount) {
        disableNextStep(true);
        setPeopleEqual(true);
      } else {
        setPeopleEqual(false);
        disableNextStep(false);
      }
    }
  }, [props.ownTent, twoPeopleTent, threePeopleTent, disableNextStep, vipCount, regularCount]);

  function handleAreaChange(evt) {
    props.getArea(evt.target.value);
  }
  return (
    <>
      <h4 className="stepTitle">Choose accomodation{props.count}</h4>
      <p>Choose one of the following campsites:</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Camping Site</th>
            <th>Total spots</th>
            <th>Spots available</th>
          </tr>
        </thead>
        <tbody>
          {props.availableSpots.map((availableSpot) => (
            <tr key={availableSpot.area}>
              <td>
                <input
                  type="radio"
                  name="campsites"
                  value={availableSpot.area}
                  onChange={handleAreaChange}
                ></input>
              </td>
              <AvailableSpots availableSpot={availableSpot} />
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Tents</h4>
      <div className="marginBottom">
        <div className="chooseTentContainer">
          <CountTicket
            count={props.twoPeopleTent}
            incrementCount={props.incrementCount}
            decrementCount={props.decrementCount}
            title="TWOTENT"
            ownTent={props.ownTent}
          />
          <p>2 person tent</p>
          <p>{props.twoPeopleTentPrice}kr</p>
        </div>
        <div className="chooseTentContainer">
          <CountTicket
            count={props.threePeopleTent}
            incrementCount={props.incrementCount}
            decrementCount={props.decrementCount}
            title="THREETENT"
            priceThreeTent={props.threePeopleTentPrice}
            ownTent={props.ownTent}
          />
          <p>3 person tent</p>
          <p>{props.threePeopleTentPrice}kr</p>
        </div>
      </div>
      {!peopleEqual && (
        <p>Amount of people in the tents should be equal to the amount of tickets!</p>
      )}
      <div>
        <input type="checkbox" onChange={ownTentChange}></input>
        <label>I have my own tent</label>
      </div>
      <div>
        <input type="checkbox" onChange={props.greenCampChange}></input>
        <label>Green Camping Option 249kr</label>
      </div>
    </>
  );
}

export default StepAccomodation;
