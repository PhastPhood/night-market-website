import * as React from 'react';

import WorkExperience from './WorkExperience';

const workList = [
  {
    'name': 'Microsoft',
    'date': 'Summer 2016 to present',
    'title': 'Program manager',
    'bullets': [
        'Created consistent engineering practices, simplified dependencies, and clean up user interface for new Visual Studio Installer.',
        'Coodinated legal, marketing, and engineering teams to integrate Redgate’s tooling within Visual Studio. Wrote Visual Studio launch event demo to announce new functionality.',
        'Ran customer development interviews and exercises around improving Visual Studio usability.']
  },
  {
    'name': 'Facebook',
    'date': 'Summer 2015',
    'title': 'Software engineering intern',
    'bullets': [
        'Developed feature to promote sticker packs for new users, increasing sticker sends and user sticker pack variety.',
        'Refactored sticker image pipeline code to allow multiple animations to show on screen.',
        'Wrote end-to-end tests to help Android Messenger move to a one-week release cycle.']
  }
];

export default class Work extends React.Component<any, any> {
  render() {
    return (
      <div>
        {workList.map((item) =>
           <WorkExperience name={item.name} date={item.date} title={item.title} bullets={item.bullets}/>
         )}
      </div>
    );
  }
}
