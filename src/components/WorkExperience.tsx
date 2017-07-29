import * as React from 'react';

interface WorkExperienceProps {
  name: string,
  team?: string,
  date: string,
  title: string,
  bullets: string[]
}

export default function WorkExperience(props: WorkExperienceProps) {
  const team = props.team ? <span className="WorkExperience__Team">{props.team}</span> : "";
  return (
    <section className="WorkExperience">
      <div className="WorkExperience__NameContainer">
        <h1 className="WorkExperience__Name">{props.name}</h1>
        {team}
      </div>
      <div className="WorkExperience__DateContainer">
        <span className="WorkExperience__Date">{props.date}</span>
      </div>
      <h2 className="WorkExperience__Title">{props.title}</h2>
      <ul className="WorkExperience__BulletList">
        {props.bullets.map((item, index) =>
          <li className="WorkExperience__Bullet" key={index}>{item}</li>
        )}
      </ul>
    </section>
  );
}
