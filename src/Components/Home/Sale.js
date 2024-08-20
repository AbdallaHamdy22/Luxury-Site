import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const SaleBanner = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="container sale-banner mt-5">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="p-4">
            <h2>HOTTEST SALE OF THE YEAR</h2>
            <h3>GET UP TO $500 OFF</h3>
            <p>USE CODE: SALE</p>
            <NavLink to="/Items">
              <button className="btn btn-dark">SHOP NOW</button>
            </NavLink>
            <p className="timer">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </p>
            <p>*T&C APPLY</p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <img src={"/Images/OfferWatch.jpg"} alt="Sale Image" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
