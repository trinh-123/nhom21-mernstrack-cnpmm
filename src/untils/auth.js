const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refeshToken";
const USER_ID = "userId";
const NAME = "name";
const GROUPID = "groupid";
const EMAIL = "email";
const PHONE ="phone";
const ADDRESS ="address";

export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID);
};

export const getName = () => {
  return localStorage.getItem(NAME);
};

export const getEmail = () => {
  return localStorage.getItem(EMAIL);
};
export const getGroupId = () => {
  return localStorage.getItem(GROUPID);
};
export const getPhone = () => {
  return localStorage.getItem(PHONE);
};
export const getAddress = () => {
  return localStorage.getItem(ADDRESS);
};
export const isLogin = () => {
  if (getAccessToken() === "undefined" || !getAccessToken()) {
    return false;
  }
  return true;
};

export const isRole = (groupid) => {
  return localStorage.getItem(GROUPID) === groupid;
};

export const setSession = (userName, accessToken, groupid, email, userID,phone,address) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(GROUPID, groupid);
  localStorage.setItem(NAME, userName);
  localStorage.setItem(EMAIL, email);
  localStorage.setItem(USER_ID, userID);
  localStorage.setItem(PHONE, phone);
  localStorage.setItem(ADDRESS, address);
};

export const removeSession = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(GROUPID);
  localStorage.removeItem(NAME);
  localStorage.removeItem(EMAIL);
  localStorage.removeItem(USER_ID);
};

// export const getNewAccessToken = async () => {
//     const result =await axios.get(url + "user/me/access-token", {
//         headers:{
//             refreshToken : getRefreshToken(),
//             userId: getUserId(),
//         },
//     });
//     if(result.data.status==="successfull"){
//         setAccessToken(result.data.data.accessToken);
//     }else{
//         throw Error("Cannot refresh your authentication");
//     }
// };
