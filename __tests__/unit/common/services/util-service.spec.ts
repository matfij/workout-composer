import UtilService from '../../../../src/common/services/utils-service';

describe('Util Service', () => {
  it('Should generate random id string', () => {
    const generatedId = UtilService.generateId();
    expect(generatedId).toBeTruthy();
  });
});