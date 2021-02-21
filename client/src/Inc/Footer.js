import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer__container" id="footer">
      <div className="footer">
        <div>
          <h3>Say</h3>
          <ul className="footer__list">
            <li>
              <a href="mailto: abc@example.com">abc@example.com</a>
            </li>
            <li>
              <h4>(+351) 226 001 751</h4>
            </li>
          </ul>
        </div>

        <div>
          <h3>Links</h3>
          <ul className="footer__list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/showcase">Showcase</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
            <li>
              <a href="/labs">Labs</a>
            </li>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/content">Content</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Follow us</h3>
          <ul className="footer__follow">
            <li>
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </li>
            <li>
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagramSquare} size="lg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
