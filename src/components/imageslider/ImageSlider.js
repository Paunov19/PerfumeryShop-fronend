import React from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
    return (
        <div>
            <div className="slideshow-container">
                <div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    <img src="img1.jpg" style="width:100%" />
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src="img2.jpg" style="width:100%" />
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src="img3.jpg" style="width:100%" />
                </div>

                <a className="prev" onClick="plusSlides(-1)">
                    &#10094;
                </a>
                <a className="next" onClick="plusSlides(1)">
                    &#10095;
                </a>
            </div>
            <br />

            <div style="text-align:center">
                <span className="dot" onClick="currentSlide(1)"></span>
                <span className="dot" onClick="currentSlide(2)"></span>
                <span className="dot" onClick="currentSlide(3)"></span>
            </div>
        </div>
    );
};

export default ImageSlider;
