import UtilService from "../../services/UtilService";

describe('Util Service', () => {
  it('Should generate random id string', () => {
    const generatedId = UtilService.generateId();

    expect(generatedId).toBeTruthy();
  });
});
