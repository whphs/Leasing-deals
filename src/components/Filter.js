import React, { Component } from "react";
import MinMaxSelect from "../components/MinMaxSelect";
import { Row, Col } from "react-bootstrap";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: ["Personal", "Business"],
      selectedType: "Personal",
      rentalMin: 0,
      rentalMax: 0,
      selectedTransmissions: [],
      selectedEngineTypes: []
    };
  }

  handleRentalChange = (min, max) => {
    this.setState({
      rentalMin: min,
      rentalMax: max
    });

    this.props.handleChange({
      engineTypes: this.state.selectedEngineTypes,
      transmissions: this.state.selectedTransmissions,
      min: min,
      max: max
    });
  };

  handleEngineTypeClick = data => {
    let newValue = this.state.selectedEngineTypes.slice();
    let type = newValue.find(elem => elem === data);
    if (type) {
      newValue.splice(newValue.indexOf(type), 1);
    } else {
      newValue.push(data);
    }

    this.setState({
      selectedEngineTypes: newValue
    });

    this.props.handleChange({
      engineTypes: newValue,
      transmissions: this.state.selectedTransmissions,
      min: this.state.rentalMin,
      max: this.state.rentalMax
    });
  };

  handleTransmissonClick = data => {
    let newValue = this.state.selectedTransmissions.slice();
    let type = newValue.find(elem => elem === data);
    if (type) {
      newValue.splice(newValue.indexOf(type), 1);
    } else {
      newValue.push(data);
    }

    this.setState({
      selectedTransmissions: newValue
    });

    this.props.handleChange({
      engineTypes: this.state.selectedEngineTypes,
      transmissions: newValue,
      min: this.state.rentalMin,
      max: this.state.rentalMax
    });
  };

  handleTypeChange = data => {
    this.setState({
      selectedType: data
    });

    this.props.handleTypeChange(data.toLowerCase());
  };

  render() {
    const { rentalRange, transmissions, engineTypes } = this.props;

    const {
      types,
      selectedType,
      selectedTransmissions,
      selectedEngineTypes
    } = this.state;

    const typesPanel = (
      <div className="font-weight-bold">
        <div className="d-flex">
          {types.map((item, index) => (
            <button
              key={index}
              className={`toggle ${
                selectedType === item ? "selected" : ""
              } btn mr-1 filter-button-selected-primary font-weight-bold`}
              onClick={this.handleTypeChange.bind(this, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );

    const transmissonsPanel = transmissions ? (
      <div>
        <div className="d-flex">
          {transmissions.map((item, index) => (
            <button
              key={index}
              className={`toggle ${
                selectedTransmissions.find(elem => elem === item)
                  ? "selected"
                  : ""
              } btn mr-1 filter-button-selected-primary font-weight-bold`}
              onClick={this.handleTransmissonClick.bind(this, item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <div />
    );

    const engineTypesPanel = engineTypes ? (
      <Row>
        {engineTypes.map((item, index) => (
          <Col md={6} key={index}>
            <button
              className={`toggle ${
                selectedEngineTypes.find(elem => elem === item)
                  ? "selected"
                  : ""
              } btn mr-1 filter-button-selected-primary font-weight-bold`}
              onClick={this.handleEngineTypeClick.bind(this, item)}
            >
              {item}
            </button>
          </Col>
        ))}
      </Row>
    ) : (
      <div />
    );

    return (
      <div className="mt-2">
        <div className="font-weight-bold mb-2">Type</div>
        <div>{typesPanel}</div>
        <div className="mt-3">
          <div className="font-weight-bold mb-2">Monthly Rental</div>
          <MinMaxSelect
            min={0}
            max={rentalRange}
            step={100}
            prefix="£"
            handleChange={this.handleRentalChange}
          />
        </div>
        <div className="mt-3">
          <div className="font-weight-bold mb-2">Transmission</div>
          {transmissonsPanel}
        </div>
        <div className="mt-3">
          <div className="font-weight-bold mb-2">Engine type</div>
          {engineTypesPanel}
        </div>
      </div>
    );
  }
}
