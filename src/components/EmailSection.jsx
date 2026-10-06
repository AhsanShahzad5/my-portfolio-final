"use client";
import React, { useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";
import Spinner from "./Spinner";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { contact, sections, siteLinks } from "@/data/site";

const fieldStyles =
  "bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:border-primary-500 focus:outline-none";
const labelStyles = "text-white block mb-2 text-sm font-medium";
const linkStyles = "inline-flex items-center gap-3 text-[#ADB7BE] transition-colors hover:text-white";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [spinner, showSpinner] = useState(false);
  const formRef = useRef();

  const sendEmail = (e) => {
    showSpinner(true);
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vm8jdki",
        "template_g6n5abg",
        formRef.current,
        "UZxrxkjDOdI-GtuEa"
      )
      .then(
        (result) => {
          console.log("SUCCESS!");
          setEmailSubmitted(true);
          showSpinner(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setEmailSubmitted(false);
          showSpinner(false);
        }
      );
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl"
      />
      <div className="relative">
        <SectionHeader {...sections.contact} note={contact.body} />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <ul className="space-y-4">
              <li>
                <a href={siteLinks.github} target="_blank" rel="noopener noreferrer" className={linkStyles}>
                  <FaGithub className="text-2xl" /> GitHub
                </a>
              </li>
              <li>
                <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer" className={linkStyles}>
                  <FaLinkedin className="text-2xl" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={siteLinks.resume} download className={linkStyles}>
                  <ArrowDownTrayIcon className="h-6 w-6" /> Resume
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="md:col-span-8" delay={0.1}>
            {spinner ? (
              <Spinner />
            ) : emailSubmitted ? (
              <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
            ) : (
              <form className="flex flex-col" ref={formRef} onSubmit={sendEmail}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="mb-6">
                    <label htmlFor="name" className={labelStyles}>
                      Your Name
                    </label>
                    <input suppressHydrationWarning
                      name="name"
                      type="text"
                      id="name"
                      required
                      className={fieldStyles}
                      placeholder="Ahsan..."
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className={labelStyles}>
                      Your email
                    </label>
                    <input suppressHydrationWarning
                      name="email"
                      type="email"
                      id="email"
                      required
                      className={fieldStyles}
                      placeholder="myemail@gmail.com"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className={labelStyles}>
                    Subject
                  </label>
                  <input suppressHydrationWarning
                    name="subject"
                    type="text"
                    id="subject"
                    required
                    className={fieldStyles}
                    placeholder="Just saying hi"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className={labelStyles}>
                    Message
                  </label>
                  <textarea suppressHydrationWarning
                    name="message"
                    id="message"
                    rows={5}
                    className={fieldStyles}
                    placeholder="Let's talk about..."
                  />
                </div>
                <button suppressHydrationWarning
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
                >
                  Send Message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
