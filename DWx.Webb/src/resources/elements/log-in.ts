export class LogIn {
  private login(): void {
    let redirect =
      `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
client_id=233b8b15-868c-4125-b954-e64ae7c8e3a8
&response_type=id_token+token
&redirect_uri=https%3A%2F%2Flocalhost%3A5043%2F
&scope=openid+https%3A%2F%2Fgraph.microsoft.com%2Fuser.read
&nonce=678910
&response_mode=fragment
`;

    window.location.replace(redirect);
  }
}

