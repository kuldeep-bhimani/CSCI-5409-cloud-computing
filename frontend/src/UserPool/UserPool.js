import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_BbOcnTvvP",
  ClientId: "150me9d13i1vpqmg6vgd4u5uc2",
};

export default new CognitoUserPool(poolData);
