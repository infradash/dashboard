import React, { Component } from 'react';
import EventListener from 'react-event-listener';

export const SMALL = 1;
export const MEDIUM = 2;
export const LARGE = 3;

export default function resizeEvent(options = {}) {
  const {
    resizeInterval = 166,
  } = options;

  return (MyComponent) => {
    class ResizeEvent extends Component {
      state = {
        width: SMALL,
      };

      componentDidMount() {
        this.updateWidth();
      }

      componentWillUnmount() {
        clearTimeout(this.deferTimer);
      }

      handleResize = () => {
        clearTimeout(this.deferTimer);
        this.deferTimer = setTimeout(() => {
          this.updateWidth();
        }, resizeInterval);
      };

      updateWidth() {
        const innerWidth = window.innerWidth;
        let width;

        if (innerWidth >= 992) {
          width = LARGE;
        } else if (innerWidth >= 768) {
          width = MEDIUM;
        } else { // innerWidth < 768
          width = SMALL;
        }

        if (width !== this.state.width) {
          this.setState({
            width,
          });
        }
      }

      render() {
        return (
          <EventListener target="window" onResize={this.handleResize}>
            <MyComponent
              {...this.props}
              width={this.state.width}
            />
          </EventListener>
        );
      }
    }
    return ResizeEvent;
  };
}