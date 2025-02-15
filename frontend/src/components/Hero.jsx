import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="flex flex-col  px-10  ">
        <div className="text-3xl flex justify-center font-extrabold mt-10 relative  after:content-[''] after:absolute after:left-70 after:bottom-0 after:w-0 after:h-[2px] after:bg-amber-200 after:transition-all after:duration-300 hover:after:w-220 ">
          Next-Gen Intrusion Detection, Powered by Decentralization
        </div>
        <div className="p-4 text-xl ">
          Traditional security systems are
          vulnerable to single points of failure, making them easy targets for
          cyber threats. We’re changing that. Our decentralized Intrusion
          Detection System (IDS) ensures real-time threat monitoring, detection,
          and mitigation—without relying on a central authority.
        </div>
        <div className="px-4 ">
          <span className="font-bold ">
            Why Choose Us? <br />
          </span>
          <ul className="mt-2">
            <li>
              ✅ <span className="font-bold">Decentralized & Resilient</span> – No single point of
              attack or failure.
            </li>{" "}
            <li>
              {" "}
              ✅ <span className="font-bold">Real-Time Threat Intelligence</span> – AI-powered monitoring across
              distributed nodes.{" "}
            </li>
            <li>
              ✅ <span className="font-bold">Privacy-Preserving Security</span> – Your data stays secure and
              anonymous.
            </li>
            <li>
              {" "}
              ✅ <span className="font-bold">Scalable & Adaptive</span> – Works seamlessly across networks, cloud,
              and IoT.
            </li>{" "}
          </ul>
          <div className="pt-4 ">
            <span className="font-bold">How It Works?</span>
            <br />{" "}
            <ul className="mt-2">
              <li>
                🔹 <span className="font-bold">Decentralized Nodes </span> – Every node contributes to security
                intelligence.{" "}
              </li>
              <li>
                🔹 <span className="font-bold">AI & ML-Powered Detection </span> – Advanced algorithms spot
                anomalies in real time.
              </li>{" "}
              <li>
                🔹 <span className="font-bold">Blockchain-Backed Integrity </span>– Tamper-proof security logs
                ensure transparency.
              </li>
            </ul>
          </div>
          <br />
          <span className="flex justify-center italic ">
            Join the Future of Cybersecurity. Protect your network with the
            power of decentralization. Experience the next evolution in IDS
            today.
            <br />
          </span>
          <div className="flex justify-center font-bold text-2xl mt-1">
          Stay Secure, Stay Decentralized!
          </div>
          <Link to="/register">
            <div className="flex justify-center">
              <button className="font-bold flex justify-center cursor-pointer rounded blur-sm bg-amber-600 hover:blur-none  p-3 m-5">
                🚀 Get Started Now!
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Hero;
