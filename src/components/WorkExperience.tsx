import * as React from 'react';

interface WorkExperienceProps {
  name: string,
  date: string,
  title: string,
  bullets: string[]
}

export default function WorkExperience(props: WorkExperienceProps) {
  return (
    <section>
      <h1>{props.name}</h1>
      <h4>{props.date}</h4>
      <h2>{props.title}</h2>
      <ul>
        {props.bullets.map((item) =>
          <li>{item}</li>
        )}
      </ul>
    </section>
  );
}
