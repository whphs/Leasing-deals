import React, { Component } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";

export default class MinMaxSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initList: [],
      minList: [],
      maxList: [],
      selectedMin: null,
      selectedMax: null
    };
  }

  componentDidMount() {
    const { min, max, step, prefix } = this.props;

    let minList = [
      {
        value: 0,
        label: "No Min"
      }
    ];
    let maxList = [
      {
        value: 0,
        label: "No Max"
      }
    ];
    let initList = [];

    for (let i = min + step; i <= max; i += step) {
      initList.push({
        value: i,
        label: prefix + i
      });

      minList.push({
        value: i,
        label: prefix + i
      });
      maxList.push({
        value: i,
        label: prefix + i
      });
    }

    this.setState({
      initList: initList,
      minList: minList,
      maxList: maxList,
      selectedMin: minList[0],
      selectedMax: maxList[0]
    });
  }

  handleMinChange = selectedMin => {
    let maxList = [];
    if (selectedMin.value === 0) {
      maxList = this.state.initList.slice();
    } else {
      let index = this.state.initList.indexOf(
        this.state.initList.find(element => element.value === selectedMin.value)
      );
      maxList = this.state.initList.slice(
        index + 1,
        this.state.initList.length
      );
    }
    maxList.splice(0, 0, this.state.maxList[0]);
    this.setState({
      selectedMin,
      maxList: maxList
    });

    this.props.handleChange(selectedMin.value, this.state.selectedMax.value);
  };

  handleMaxChange = selectedMax => {
    let minList;
    if (selectedMax.value === 0) {
      minList = this.state.initList.slice();
    } else {
      let index = this.state.initList.indexOf(
        this.state.initList.find(element => element.value === selectedMax.value)
      );
      minList = this.state.initList.slice(0, index);
    }
    minList.splice(0, 0, this.state.minList[0]);
    this.setState({
      selectedMax,
      minList: minList
    });

    this.props.handleChange(this.state.selectedMin.value, selectedMax.value);
  };

  render() {
    const { minList, maxList, selectedMin, selectedMax } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <Select
              value={selectedMin}
              onChange={this.handleMinChange}
              options={minList}
            />
          </Col>
          <Col>
            <Select
              value={selectedMax}
              onChange={this.handleMaxChange}
              options={maxList}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
