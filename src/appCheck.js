const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('CE304B0D-98EE-4404-996A-5E77977FE54F'),
  
    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true
  });