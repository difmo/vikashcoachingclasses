import { useState } from "react";

export default function Form() {
    const [otpSent, setOtpSent] = useState(false);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Fill the form to hire a tutor</h2>

            {/* 1. Name */}
            <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input type="text" className="w-full p-2 border rounded" />
            </div>

            {/* 2. Email/Contact No. */}
            <div className="mb-4">
                <label className="block mb-1">Email / Contact No.:</label>
                <input type="text" className="w-full p-2 border rounded" />
            </div>



            {/* 3. Select Class */}
            <div className="mb-4">
                <label className="block mb-1">Select Class:</label>
                <div className="space-y-2">
                    {['Board', 'IB', 'IGCSE', 'ICSE', 'Dropper'].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input type="radio" name="classType" value={type} />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 4. Select Subjects */}
            <div className="mb-4">
                <label className="block mb-1">Select Subjects:</label>
                <div className="flex flex-row gap-10">
                    {['Physics', 'Chemistry', 'Maths', 'Biology'].map((subject) => (
                        <label key={subject} className="flex items-center space-x-2">
                            <input type="checkbox" value={subject} />
                            <span>{subject}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 5. Select Level */}
            <div className="mb-4">
                <label className="block mb-1">Select Level:</label>
                <select className="w-full p-2 border rounded">
                    <option>Board</option>
                    <option>NEET</option>
                    <option>IIT-JEE</option>
                    <option>Board + NEET</option>
                    <option>Board + IIT-JEE</option>
                </select>
            </div>

            {/* Get OTP */}
            <div className="mb-4">
                <button
                    onClick={() => setOtpSent(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Get OTP
                </button>
            </div>
        </div>
    );
}
