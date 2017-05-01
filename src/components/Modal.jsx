import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalReact from 'react-modal';

import RadioSelector from './presentational/RadioSelector';
import Preview from './presentational/Preview';
import CopyCSS from './presentational/CopyCSS';

import * as actionCreators from '../store/actions/actionCreators';
import { framesSelector, settingsSelector, paletteGridSelector } from '../store/selectors/selectors';

class Modal extends React.Component {
  static generateRadioOptions(props) {
    let options;

    if (props.type !== 'load') {
      options = [{
        value: 'single',
        label: 'single',
        id: 3
      }];

      if (props.frames.length > 1) {
        const spritesheetSupport =
        props.type === 'download' ||
        props.type === 'twitter';

        const animationOption = {
          value: 'animation',
          label: spritesheetSupport ? 'GIF' : 'animation',
          id: 4
        };
        options.push(animationOption);

        if (spritesheetSupport) {
          options.push({
            value: 'spritesheet',
            label: 'spritesheet',
            id: 5
          });
        }
      }
    }

    return options;
  }

  constructor(props) {
    super(props);
    this.state = {
      previewType: 'single',
      loadType: 'storage'
    };
    this.changeRadioType = this.changeRadioType.bind(this);
  }

  getModalContent(props) {
    const options = this.constructor.generateRadioOptions(props);
    let content;
    const radioOptions = props.type !== 'load' ?
      (
        <div className="modal__preview">
          <RadioSelector
            name="preview-type"
            selected={this.state.previewType}
            change={this.changeRadioType}
            options={options}
          />
          {this.state.previewType !== 'spritesheet' ?
            <div className="modal__preview--wrapper">
              <Preview
                key="0"
                frames={props.frames}
                columns={props.columns}
                rows={props.rows}
                cellSize={props.type === 'preview' ? props.cellSize : 5}
                duration={props.duration}
                activeFrameIndex={props.activeFrameIndex}
                animate={this.state.previewType === 'animation'}
              />
            </div>
          : null
          }
        </div>
      )
      :
      (
        <div className="modal__load">
          <RadioSelector
            name="load-type"
            selected={this.state.loadType}
            change={this.changeRadioType}
            options={options}
          />
        </div>
      );

    switch (props.type) {
      case 'copycss':
        content = (
          <CopyCSS
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            activeFrameIndex={props.activeFrameIndex}
            animationCode={this.state.previewType !== 'single'}
            duration={props.duration}
          />
        );
        break;
      default:
    }

    return (
      <div className="modal">
        <button className="close" onClick={() => { props.close(); }}>
          CLOSE
        </button>
        {radioOptions}
        {content}
      </div>
    );
  }

  changeRadioType(value, type) {
    const newState = {};
    switch (type) {
      case 'load-type':
        newState.loadType = value;
        break;
      default:
        newState.previewType = value;
    }
    this.setState(newState);
  }

  render() {
    const styles = {
      modal: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        border: '4px solid #C5C5C5'
      }
    };

    return (
      <ModalReact
        isOpen={this.props.isOpen}
        onRequestClose={() => { this.props.close(); }}
        style={styles.modal}
        contentLabel={`Dialog ${this.props.type || ''}`}
      >
        {this.getModalContent(this.props)}
      </ModalReact>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    frames: framesSelector(state).frames,
    activeFrameIndex: framesSelector(state).activeFrameIndex,
    activeFrame: framesSelector(state).activeFrame,
    paletteGridData: paletteGridSelector(state).paletteGridColors,
    columns: framesSelector(state).activeFrame.columns,
    rows: framesSelector(state).activeFrame.rows,
    cellSize: settingsSelector(state).cellSize,
    duration: settingsSelector(state).animationDuration
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
export default ModalContainer;
