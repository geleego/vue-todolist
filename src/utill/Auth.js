export default {
  /**
   * 로그인 사용자 ID 저장
   * @param {string} userID 
   * @returns {string | boolean}
   */
  setUser : (userID) => {
    let user = sessionStorage.setItem('userID', userID);
    return user ?? false;
  },

  /**
   * 로그인 사용자 ID 정보 호출
   * @returns {string | boolean}
   */
  getUser : () => {
    let userID = sessionStorage.getItem('userID');
    return userID ?? false;
  },
  
  /**
   * 사용자 로그아웃
   * @returns {boolean} true;
   */
  logout : () => {
    sessionStorage.clear();
    return true;
  }
}