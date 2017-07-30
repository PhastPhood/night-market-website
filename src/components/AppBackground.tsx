import * as React from 'react';
import * as _ from 'lodash';
import {Action, Location} from 'history';
import {RouteComponentProps} from 'react-router';

import getGradientColor from '../utils/getGradientColor';

interface AppBackgroundState {
  weightTop: number;
  weightBottom: number;
}

export default class AppBackground extends React.Component<any, AppBackgroundState> {
  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {
      weightTop: 0,
      weightBottom: 1
    };

    this.updatePositions = _.throttle(this.updatePositions.bind(this), 10);
  }

  unlisten() {}

  componentDidMount() {
    window.onhashchange = function() {console.log('hashchange')};
    window.addEventListener('onresize', this.updatePositions);
    window.addEventListener('scroll', this.updatePositions);
    this.unlisten = this.props.history.listen((location:Location, action:Action) => setTimeout(function(){
      this.updatePositions();
    }.bind(this), 0));
    this.updatePositions();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.updatePositions);
    window.removeEventListener('onresize', this.updatePositions);
    window.removeEventListener('scroll', this.updatePositions);
    this.unlisten();
  }

  updatePositions() {
    const body = document.body;
    const html = document.documentElement;

    const documentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    const viewHeight = Math.max(html.clientHeight, window.innerHeight || 0);
    const bottomOffset = body.scrollTop + viewHeight;

    const weightTop = this.gradientTopFunction(body.scrollTop/documentHeight);
    let weightBottom = this.gradientBottomFunction(bottomOffset/documentHeight);
    console.log(body.scrollTop);

    this.setState({weightTop: weightTop,
        weightBottom: weightBottom});
  }

  gradientTopFunction(x:number) {
    return 0.8/(1 + Math.exp(-8 * (x - 0.6)));
  }

  gradientBottomFunction(x:number) {
    return 0.7/(1 + Math.exp(-8 * (x - 0.5))) + 0.3;
  }

  render() {
    const color1 = [17, 13, 57];
    const color2 = [54, 16, 73];
    const gradient1 = getGradientColor(color1, color2, this.state.weightTop);
    const gradient2 = getGradientColor(color1, color2, this.state.weightBottom);
    const gradient = {
      background: 'linear-gradient(rgb(' + gradient1[0] + ',' + gradient1[1] + ',' + gradient1[2] + '), rgb('
          + gradient2[0] + ',' + gradient2[1] + ',' + gradient2[2] + '))'
    };
    return (
      <div className="AppBackground" style={gradient}/>
    );
  }
}
