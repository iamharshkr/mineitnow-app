import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal, Text, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setPopUp} from '../../actions/themeActions';

const ModalScreen = ({isVisible, text}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(isVisible ? isVisible : false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    dispatch(setPopUp(true));
    setVisible(false);
  };
  const themes = useTheme();
  const {notice} = useSelector(state => state.user);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[
          styles.containerStyle,
          {backgroundColor: themes.colors.background},
        ]}>
        <View style={styles.innerContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.noticeTitle}>Notice</Text>
          </View>
          {text ? (
            <Text style={styles.noticemsg}>{text}</Text>
          ) : notice ? (
            notice[0].notice.split('\\n').map((i, key) => {
              return (
                <Text key={key} style={styles.noticemsg}>
                  {i}
                </Text>
              );
            })
          ) : null}
        </View>
        <View style={styles.btnConatiner}>
          <TouchableOpacity>
            <Button
              onPress={hideModal}
              labelStyle={{color: '#fff'}}
              style={styles.closeBtn}>
              Close
            </Button>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    flexDirection: 'column',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
  },
  noticeTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 5,
  },
  noticemsg: {
    fontSize: 18,
    textAlign: 'justify',
  },
  btnConatiner: {
    marginVertical: 5,
    padding: 5,
  },
  closeBtn: {
    backgroundColor: 'red',
  },
});
export default ModalScreen;
