import {Share} from 'react-native';

const onShare = async (refer) => {
  const link= 'https://mineitnow.herokuapp.com/download/android';
  try {
    const result = await Share.share({
      title: 'Refer Your Friends',
      message:
        `Install this app and start mining crypto.\n\nUse this refer code while registering on the App : ${refer} \nAppLink : ${link}`,
      url: link,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default onShare;
