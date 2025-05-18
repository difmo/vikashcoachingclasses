import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Animation Variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const faqs = [
  {
    question: "Are Vikas Institute Tutors, Qualified and Verified ?",
    answer: [
      "Absolutely. At Vikas Institute, we take great pride in the quality and integrity of our tutoring team. Every tutor associated with our institute is not only highly qualified but also thoroughly verified to ensure they meet the highest standards of educational excellence and trustworthiness.",
      "1. Strong Academic Background",
      "All our tutors hold degrees from reputed institutions, with specialization in subjects like Physics, Math, Chemistry, Biology, and more, based on the curriculum they teach. We cater to CBSE, ICSE, IGCSE, IB, and American Curriculum students, and our tutors are selected accordingly to match the academic standards of each board.",
      "2 . Rigorous Selection Process",
      "Each tutor goes through a multi-stage selection process that includes:",
      "• Application and screening",
      "• Qualification and credential verification",
      "• Demo classes to evaluate teaching ability",
      "• Student and parent feedback analysis",
      "We only select candidates who demonstrate both exceptional teaching skills and a passion for helping students succeed.",
      "3. Verified and Background-Checked",
      "Your child’s safety and learning experience are our top priorities. That’s why all tutors are:",
      "• Background-checked",
      "• Identity-verified",
      "• Evaluated for communication skills, reliability, and professionalism",
      "This ensures that every online session is not only educational but also secure and trustworthy.",
      "4. Ongoing Training and Quality Monitoring",
      "Even after onboarding, our tutors are regularly monitored and trained to adapt to the latest teaching methodologies and technological tools.",
      "We actively collect student and parent feedback to continually assess and improve tutor performance.",
      "With our qualified, verified, and experienced tutors, you can be confident that your child is in the best hands.",
      "Have more questions? Reach out to us at info@vikasinstitute.in or call +91 8427373281.",
    ],
  },
  {
    question:
      "What is the Process of Hiring Online Private Tutors from www.vikasinstitute.in?",
    answer: [
      "Hiring a qualified online private tutor from Vikas Institute is simple, quick, and fully personalized to your academic needs. We follow a step-by-step process to ensure you get the best tutor for your child’s learning goals, curriculum, and schedule.",
      "1. Submit an Inquiry",
      "Start by contacting us through our website www.vikasinstitute.in, email (info@vikasinstitute.in), or WhatsApp/call at +91 8427373281. Share your details including:",
      "• Student’s grade and subject(s)",
      "• Curriculum (CBSE, IB, IGCSE, ICSE, ISC etc.)",
      "• Preferred schedule and time zone",
      "• Specific learning goals or challenges",
      " 2. Get a Free Consultation",
      "Our academic advisor will reach out to you for a brief consultation to understand the student's needs and recommend the best-fit tutor. This includes discussing:",
      "• Teaching methodology",
      "• Duration and frequency of sessions",
      "• Customized learning plans",
      " 3. Attend a Free Demo Class",
      "We offer a free trial class so you can evaluate the tutor’s teaching style, subject knowledge, and compatibility with the student. This helps you make an informed decision before committing.",
      " 4. Choose a Tutoring Plan",
      "Based on your experience in the trial class, you can choose from our flexible tutoring packages—hourly, monthly, or subject-specific plans. Our plans are affordable and designed to suit both short-term support and long-term academic success.",
      " 5. Start Regular Sessions",
      "Once you confirm, we schedule regular online sessions using secure platforms like Zoom or Google Meet. You’ll also get:",
      "• Regular progress updates",
      "• Personalized assignments and test prep",
      "• Continuous academic support",
      "6. Why Choose Vikas Institute?",
      "• Highly qualified and verified tutors",
      "• Coverage for CBSE, ICSE, IGCSE, IB, and other international boards",
      "• Personalized one-on-one classes across UAE, Qatar, UK, USA, Australia, Canada, and India",
      "• Ongoing feedback and performance tracking",
      "Ready to get started? Contact us today at info@vikasinstitute.in or +91 8427373281 to book your free demo class!",
    ],
  },
  {
    question:
      "What is the Payment / Fee Paying System for Hired Online Private Tutors from www.vikasinstitute.in?",
    answer: [
      "At Vikas Institute, we offer a transparent, flexible, and secure payment system...",
      "1. Flexible Payment Plans",
      "We understand that every student’s needs are different. We offer:",
      "• Hourly-based plans",
      "• Monthly packages",
      "• Subject-wise packages",
      "• Exam preparation plans",
      "2. Multiple Payment Modes",
      "We support several payment methods including:",
      "• Bank Transfers (India and International)",
      "• UPI / Google Pay / PhonePe / Paytm (India)",
      "• Credit/Debit Cards",
      "• PayPal / Stripe (for UAE, USA, UK, etc.)",
      "3. Advance & Pay-As-You-Go Options",
      "• Hourly/demo sessions are paid in advance.",
      "• Monthly plans are prepaid with renewal flexibility.",
      "4. Safe & Transparent Billing",
      "• No hidden charges",
      "• Clear invoicing and session logs",
      "• Refund/rescheduling policies apply",
      "5. International-Friendly",
      "• Multi-currency support",
      "• Time-zone friendly billing cycles",
      "• Need Help With Payment?",
      "Contact us at info@vikasinstitute.in or WhatsApp +91 8427373281 for support.",
    ],
  },
  {
    question: "What are the Terms and Conditions?",
    answer: [
      "By using www.vikasinstitute.in and enrolling in our online tutoring services, you agree to the following terms and conditions. Please read them carefully before proceeding.",

      "1. Service Overview",
      "Vikas Institute provides personalized online tutoring for CBSE, ICSE, IGCSE, IB, and other international curricula across UAE, Qatar, UK, USA, Canada, Australia, and India.",

      "2. Enrollment and Registration",
      "• Students or parents must provide accurate information during registration.",
      "• A free consultation or demo session may be offered before enrollment.",
      "• Regular classes commence only after payment confirmation.",

      "3. Tutor Assignment",
      "• Tutors are assigned based on academic needs, curriculum, and availability.",
      "• Tutor changes may occur due to scheduling or quality considerations.",
      "• Students can request tutor changes with valid reasons.",

      "4. Fee and Payment Terms",
      "• Fees must be paid in advance before starting classes.",
      "• Payments accepted via bank transfer, UPI, PayPal, or other approved modes.",
      "• No classes will be scheduled without payment confirmation.",
      "• Invoices available upon request.",

      "5. Cancellation and Rescheduling",
      "• Classes can be rescheduled with at least 24 hours’ prior notice.",
      "• Missed sessions without prior notice will be counted and charged.",
      "• Refunds are considered only in exceptional cases, at the discretion of Vikas Institute.",

      "6. Code of Conduct",
      "• Students must attend on time and behave respectfully.",
      "• Tutors must maintain professional conduct at all times.",
      "• Services may be suspended in case of misconduct by any party.",

      "7. Technical Requirements",
      "• Students must ensure stable internet, a functional device, and access to Zoom or Google Meet.",
      "• Vikas Institute is not responsible for technical issues on the student’s side.",

      "8. Privacy and Data Protection",
      "• All personal data is kept confidential and used for educational purposes only.",
      "• Sessions may be recorded for quality monitoring, with prior notification.",

      "9. Limitation of Liability",
      "• Vikas Institute provides the best support possible but does not guarantee specific academic results.",
      "• The institute is not liable for indirect, incidental, or consequential damages.",

      "10. Amendments",
      "• These terms and conditions may be updated at any time.",
      "• Continued use of services after updates implies acceptance of the revised terms.",

      "11. Contact Us",
      "Have questions or concerns? Reach out to us at:",
      " info@vikasinstitute.in",
      "+91 8427373281",
    ],
  },
  {
    question: "Important Notes for Students and Parents.",
    answer: [
      "Please read the following important guidelines carefully before starting your tutoring sessions with Vikas Institute. These policies are in place to ensure transparency, quality, and a smooth learning experience.",

      "1. No Direct Fee Transfers to Tutors",
      "• All payments must be made directly to Vikas Institute via approved channels only.",
      "• Direct transactions with tutors are strictly prohibited.",
      "• If any direct fee payment is made to a tutor without our knowledge and any misalignment, fraud, or issue occurs, Vikas Institute and its authorized personnel are not responsible.",

      "2. Fee Must Be Paid in Advance",
      "• Classes will only be scheduled once the fee is received and confirmed by our accounts team.",

      "3. 24-Hour Rescheduling Policy",
      "• Students must inform us at least 24 hours in advance to reschedule a session.",
      "• Missed classes without prior notice will be counted as completed and charged accordingly.",

      "4. Refunds Are Not Guaranteed",
      "• Refunds are only provided in exceptional cases and are at the sole discretion of Vikas Institute.",

      "5. Students Are Responsible for Technical Readiness",
      "• Please ensure you have a working device, stable internet, and access to Zoom or Google Meet before each session.",
      "• The institute is not responsible for technical issues on the student’s side.",

      "6. Invoices Are Issued on Request",
      "• Digital invoices can be provided upon request after payment for your personal records.",

      "7. Quality Assurance Through Monitoring",
      "• Some sessions may be recorded for internal training and quality control purposes. You will be informed in advance when recordings are made.",

      "8. Student Privacy is Protected",
      "• All personal and academic information shared with Vikas Institute is strictly confidential and used solely for tutoring purposes.",
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="">
      <div ref={ref} className="px-4 pb-16 mx-auto sm:px-6 container">
        <h2 className="mb-10 text-4xl font-bold text-center text-black">
          Frequently Asked Questions...{" "}
        </h2>

        {/* <Strip */}

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const animationVariant = index % 2 === 0 ? fadeInLeft : fadeInRight;

            return (
              <motion.div
                key={index}
                custom={index}
                variants={animationVariant}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg"
              >
                <div
                  className="flex items-center justify-between px-5 py-4 transition duration-300 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {faq.question}
                  </h3>
                  <span className="text-3xl font-bold text-headerbordertext">
                    {isOpen ? "-" : "+"}
                  </span>
                </div>
                {isOpen && (
                  <div className="p-5 text-gray-700 bg-gray-50 space-y-2">
                    {Array.isArray(faq.answer) ? (
                      faq.answer.map((item, idx) => {
                        const isBoldHeading = /^\d+\s*\./.test(item.trim());
                        return (
                          <p
                            key={idx}
                            className={`leading-relaxed ${
                              isBoldHeading
                                ? "font-bold text-base text-black"
                                : "text-md text-gray-700"
                            }`}
                          >
                            {item}
                          </p>
                        );
                      })
                    ) : (
                      <p className="leading-relaxed text-sm">{faq.answer}</p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
