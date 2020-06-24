const approveUrl = `https:\/\/bitbucket.org\/${process.env.BITBUCKET_WORKSPACE}\/(?<repository>[a-z0-9\-]{1,50}-ops)\/pull-requests\/(?<id>[0-9]{1,5})`;
const registerCommand = '\/register (?<userId>[0-9]{1,11}) (?<chatId>[0-9]{1,11})';
export const approveUrlRegExp = new RegExp(`^${approveUrl}`);
export const registerCommandRegExp = new RegExp(`^${registerCommand}$`);
// Negate other messages regex to send default messages
export const defaultMessageRegExp = new RegExp(`^(?!${approveUrl})(?!${registerCommand}).+`);
