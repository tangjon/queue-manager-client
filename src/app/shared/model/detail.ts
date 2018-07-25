export class Detail {


  toString: () => string;

  constructor(previousValue, postValue, unitOfMeasurement) {
    this.toString = function () {
      return (`${previousValue} to ${postValue} ${unitOfMeasurement}`).trim()
    }
  }
}
