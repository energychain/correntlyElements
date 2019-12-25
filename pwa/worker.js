self.addEventListener('install', event => {
  event.registerForeignFetch({
    scopes: [self.registration.scope],
    origins: ['*']
  });
});
