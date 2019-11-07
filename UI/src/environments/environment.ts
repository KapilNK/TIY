// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  loginurl: '/api/login/authenticate',
  registerurl: '/api/register/submit',
  logouturl: '/api/logout/',
  domain: '.localhost.in',
  gallerycontent:'/api/gallerycontents',
  imagedetails:'/api/imagedetails',
  addPosturl: '/api/addpost',
  forgotpassword:'/api/password/forgetpassword',
  resetpurl: '/api/password/resetp',
  contactusurl: '/api/contactus'
};
