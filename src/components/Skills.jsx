import React from 'react'
import SkillsIcons from './SkillsIcons';
const skillsData = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Next.js",
    "Git",
    "Redux",
    "Recoil",
    "Tailwind",
    "ShadCn",
    "PostgreSQL",
    "Framer Motion",
    "Docker",
    "Java",
    "Python",
    "C/C++"
]

const Skill = ({ name }) => {
    const buttonStyles = "text-[#ADB7BE] border-slate-600 hover:border-white";
    return (
        <button
            className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
        >
            {name}
        </button>
    );
}
const Skills = () => {
    return (
        <section id='skills' className='pt-16'>
            <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2 md:mb-3 ">
                Skills
            </h2>
            {/* <div className="text-white flex flex-row justify-center items-center gap-2 py-6 flex-wrap">
                {skillsData.map((skill) => (
                    <Skill
                        name={skill}
                    />
                ))}
            </div> */}
                <SkillsIcons/>
        </section>
    )
}


export default Skills