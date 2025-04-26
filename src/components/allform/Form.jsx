import { useState } from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomCheckbox from "../CustomCheckbox";
import CustomHeading from "../CustomHeading";

export default function Form() {
    const [otpSent, setOtpSent] = useState(false);

    return (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white shadow-xl space-y-6">
            <CustomHeading level={2} className="text-3xl font-bold text-center text-primary">
                Fill the form to hire a tutor
            </CustomHeading>

            {/* Name */}
            <CustomInput label="Name" placeholder="Enter your name" />

            {/* Email / Contact */}
            <CustomInput label="Email / Contact No." placeholder="Enter email or phone number" />

            {/* Class Type */}
            <div>
                <label className="block font-semibold mb-2">Select Class:</label>
                <div className="flex flex-wrap gap-4">
                    {['Board', 'IB', 'IGCSE', 'ICSE', 'Dropper'].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input type="radio" name="classType" value={type} />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Subjects */}
            <div>
                <label className="block font-semibold mb-2">Select Subjects:</label>
                <div className="flex flex-wrap gap-4">
                    {['Physics', 'Chemistry', 'Maths', 'Biology'].map((subject) => (
                        <CustomCheckbox key={subject} label={subject} value={subject} />
                    ))}
                </div>
            </div>

            {/* Level */}
            <div>
                <label className="block font-semibold mb-2">Select Level:</label>
                <select className="w-full p-3 border border-gray-300 rounded-md">
                    <option>Board</option>
                    <option>NEET</option>
                    <option>IIT-JEE</option>
                    <option>Board + NEET</option>
                    <option>Board + IIT-JEE</option>
                </select>
            </div>

            {/* Get OTP */}
            <div className="text-center pt-4">
                <CustomButton
                    onClick={() => setOtpSent(true)}
                    className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition"
                    label="Get OTP"
                />
            </div>
        </div>
    );
}
