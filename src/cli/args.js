export const getUserName = () => {
    let userName = '';
    Object.entries(process.argv).forEach(([ key, value ]) => {
      if (value.includes('username')) {
        const userNameArr = value.split('=');
        if (userNameArr.length > 1) userName = userNameArr[userNameArr.length - 1];
      } 
    });
    return (userName) ? userName : 'John Doe';
  }