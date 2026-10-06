import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { education } from "@/data/site";

const EducationSection = () => {
  return (
    <section id="education" className="pt-16 md:pt-20">
      <h2 className="text-center text-4xl font-bold text-white mb-8">
        {education.heading}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {education.items.map((item) => (
          <div key={item.degree} className="rounded-xl border border-[#33353F] bg-[#181818] p-5 text-white">
            <h3 className="text-lg font-semibold">{item.degree}</h3>
            <p className="text-[#ADB7BE]">{item.school}</p>
            <p className="mt-1 text-sm text-primary-400">{item.dates}</p>
          </div>
        ))}
      </div>
      {education.certifications.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="mb-3 text-lg font-semibold text-white">Certifications</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {education.certifications.map((cert) => (
              <a
                key={cert.name}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-4 py-2 text-[#ADB7BE] hover:border-white hover:text-white"
              >
                {cert.name} ({cert.issuer})
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EducationSection;
