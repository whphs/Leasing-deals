import React, { Component } from "react";
import { Image } from "react-bootstrap";
export default class Vehicle extends Component {
  render() {
    const { vehicle } = this.props;
    return (
      <div>
        <div className="row shadow-sm p-3 mb-5 rgba(0,0,0,0.1) rounded">
          <div className="col-md-3 col-lg-2 col-12 text-center">
            <Image
              src={vehicle.image_url}
              alt="vehicle image"
              className="img-size"
            ></Image>
          </div>
          <div className="col-md-9 col-lg-5 col-12">
            <h4 className="font-weight-bold vehicel-brand">{vehicle.name}</h4>
            <div className="d-flex justify-content-between vehicles-font">
              <div>
                <p>
                  {vehicle.engine_type} | {vehicle.transmission} |
                  {vehicle.engine_size}
                </p>
                <p>
                  Contract Type <mark>{vehicle.contract_type}</mark>
                </p>
              </div>
              <div>
                <p>
                  Rental Profile <mark>{vehicle.rental_profile}</mark>
                </p>
                <p>
                  Contact term<mark>{vehicle.contract_term}</mark>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-6 text-md-right">
            <div className="mt-2">
              <Image
                src={vehicle.logo}
                alt="logo Image"
                style={{ width: "120px" }}
              ></Image>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 col-6 text-right vehicles-font min-mt-10">
            <mark>£{vehicle.monthly_rental}</mark>Monthly Rental
            <p className="mb-1 mr-2">
              <mark>£{vehicle.initial_rental}</mark>Initial Rental
            </p>
            <div className="btn btn-success mt-2">Review Deal</div>
          </div>
        </div>
      </div>
    );
  }
}
