import * as React from 'react';

interface PostProps {
  title: string,
  date: string | null,
  startDate: string | null,
  endDate: string | null,
  location: string | null,
  locationDetail: string | null
};

export default class Post extends React.Component<PostProps, {}> {
  render() {
    let dateString = null;
    if (this.props.date) {
      dateString = this.props.date;
    } else if (this.props.startDate && this.props.endDate) {
      dateString = this.props.startDate + ' - ' + this.props.endDate;
    }
    return (
      <div className="Post">
        <h1>{this.props.title}</h1>
        {dateString &&
          <div className="PostDate">
            {dateString}
          </div>
        }
      </div>
    );
  }
}
