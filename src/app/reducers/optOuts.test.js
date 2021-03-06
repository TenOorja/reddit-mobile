import routes from 'app/router';
import createTest from 'platform/createTest';
import { METHODS } from 'platform/router';
import * as platformActions from 'platform/actions';
import * as optOutsAction from 'app/actions/optOuts';
import optOuts, { DEFAULT } from './optOuts';
import { OPT_OUT_XPROMO_INTERSTITIAL } from '../../app/constants';

const { URL_FLAG, STORE_KEY } = OPT_OUT_XPROMO_INTERSTITIAL;

createTest({ reducers: { optOuts }, routes }, ({ getStore, expect }) => {
  describe('optOuts', () => {
    describe('XPromo', () => {
      it('if URL-flag is not used', () => {
        const { store } = getStore({ optOuts: DEFAULT });
        store.dispatch(platformActions.navigateToUrl(METHODS.GET, '/'));
        const { optOuts } = store.getState();
        expect(optOuts).to.eql(DEFAULT);
      });

      it('if URL-flag is turned on, and settled in true', () => {
        const { store } = getStore({ optOuts: DEFAULT });
        const platformNavigateActions = platformActions.navigateToUrl( 
          METHODS.GET, '/', {queryParams: {[URL_FLAG] : 'true'}}
        );
        store.dispatch(platformNavigateActions);
        const { optOuts } = store.getState();
        expect(optOuts[STORE_KEY]).to.eql(true);
      });

      it('if URL-flag is turned on, and settled in false', () => {
        const { store } = getStore({ optOuts: {[URL_FLAG] : 'false'} });
        const platformNavigateActions = platformActions.navigateToUrl( 
          METHODS.GET, '/', {queryParams: {[URL_FLAG] : 'false'}}
        );
        store.dispatch(platformNavigateActions);
        const { optOuts } = store.getState();
        expect(optOuts[STORE_KEY]).to.eql(undefined);
      });
    });

    it('if setting up the new flag', () => {
      const { store } = getStore({ optOuts: DEFAULT });
      store.dispatch(optOutsAction.setFlag(OPT_OUT_XPROMO_INTERSTITIAL));
      const { optOuts } = store.getState();
      expect(optOuts[STORE_KEY]).to.eql(true);
    });
  });
});
