import React from 'react'
import img from "../assets/logo1.jpeg";
const Detail = () => {
    return (
        <div className='border-3 md:border-0  text-headerbordertext py-8 rounded-2xl lg:rounded-e-none'>
            <div className="w-full h-auto flex flex-col items-center justify-center  relative text-base sm:text-lg md:text-xl ">
                <h1 className="text-2xl sm:text-3xl font-bold absolute top-4 sm:top-8 text-center w-full">
                    P.C.M.B. Tutors
                </h1>
                <div className="pb-5 pt-20 text-center space-y-2">
                    <p>Malviya Nagar, New Delhi - 110017</p>
                    <p>
                        Contact:{" "}
                        <a href="tel:+918427373281" className="hover:underline">
                            +91 8427373281
                        </a>
                    </p>
                    <p>
                        Email:{" "}
                        <a
                            href="mailto:info@pcmbtutors.com"
                            className="hover:underline"
                        >
                            info@pcmbtutors.com
                        </a>
                    </p>
                    <p>
                        Website:{" "}
                        <a
                            href="https://www.pcmbtutors.com/"
                            className="hover:underline"
                        >
                            www.pcmbtutors.com
                        </a>
                    </p>
                    <p>
                        WhatsApp:{" "}
                        <a
                            href="https://wa.me/919582699555"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            919582699555
                        </a>
                    </p>
                </div>
                <img
                    src={img}
                    alt="logo"
                    className="mx-auto mt-6 px-4 sm:px-6 max-w-[80%]"
                />
                <p className="pt-8 sm:pt-10 px-4 sm:px-6 font-light uppercase text-center text-sm sm:text-base">
                    A Most Trusted Website to Hire Best Online Private Tutors for{" "}
                    <br />
                    USA - CANADA - UK - QATAR - UAE - AUSTRALIA - INDIA.
                </p>
                <p className="px-4 sm:px-6 pt-14 font-light uppercase text-center text-sm sm:text-base">
                    "At the Heart of our Success lies the Confidence that you
                    Place in Us, Globally. Your Trust is our Greatest Asset."
                </p>
            </div>
        </div>
    )
}

export default Detail
