import * as React from 'react';

const list = [
  {
    title: 'Graduated from Vanderbilt University',
    date: 'May 2017'
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }];

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div>
          <h2>Welcome to React</h2>
        </div>
        <p>
          To get started, edit <code>src/App.tsx</code> and save to reload. Does this work?
        </p>
        {list.map((item) =>
          <div>{item.title}</div>
        )}
      </div>
    );
  }
}
