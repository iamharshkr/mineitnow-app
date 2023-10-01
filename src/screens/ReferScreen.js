import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {Button, Divider, Text} from 'react-native-paper';
import config from '../../config/config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../images/logo.png';
import {showToast} from '../layouts/alert';
import DataTableView from '../layouts/DataTableView';
import {clearErrors, getTeams} from '../../actions/userActions';
import notFound from '../images/noRefer.png';
import LoadingScreen from '../screens/LoadingScreen';
import onShare from '../layouts/share';

const ReferScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {teams, loading, error} = useSelector(state => state.teams);
  const dataTableHeader = [{
    header: 'Name',
  },
  {
    header: 'Active',

  }];
  const copyText = text => {
    Clipboard.setString(text);
    showToast('Copied Successfully');
  };
  useEffect(() => {
    if(error){
      showToast(error);
      dispatch(clearErrors());
    }
  },[error]);
  useEffect(() => {
    dispatch(getTeams());
    return ;
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.containerUp}>
              <Image style={styles.img} source={logo} />
              <TouchableOpacity onPress={() =>onShare(user.userId)}>
                <Button style={styles.shareBtn} mode="outlined">
                  <Text style={styles.shareBtnTxt}>Share </Text>
                  <Ionicons color={'#fff'} name="send-outline" size={21} />
                </Button>
              </TouchableOpacity>
              <View style={styles.copyContainer}>
                <Text style={styles.shareTxt}>Your Refer Code is :</Text>
                <Text style={styles.shareCode} selectable={true}>
                  {user.userId}
                </Text>
                <TouchableOpacity onPress={() => copyText(user.userId)}>
                  <Ionicons name="copy-outline" size={22} />
                </TouchableOpacity>
              </View>
              <Text style={styles.referText}>
                Refer your friends and increase your mining speed for each
                active referrer.
              </Text>
            </View>
            <Divider style={{height: 2}} />
            <View style={styles.containerDown}>
              <Text style={styles.teams}>Your Teams</Text>
              {teams && teams.length > 0 ? (
                <DataTableView dataTableHeader={dataTableHeader} teams={teams} />
              ) : (
                <View style={styles.noReferContainer}>
                  <Image source={notFound} style={styles.notReferImg} />
                  <Text style={styles.noReferText}>No Refer Found.</Text>
                  <Text style={styles.noReferText}>
                    Refer Your Friends now.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUp: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 20,
    padding: 5,
  },
  img: {
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 100,
    height: 100,
  },
  referText: {
    fontSize: 18,
    fontWeight: '700',
    color: config.ThemeColor,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: config.ThemeColor,
    borderRadius: 40,
    marginBottom: 5,
  },
  shareBtnTxt: {
    fontSize: 20,
    color: '#fff',
    paddingRight: 30,
    fontWeight: '600',
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareTxt: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 5,
  },
  shareCode: {
    fontSize: 20,
    fontWeight: '800',
    marginRight: 5,
  },
  containerDown: {
    flex: 3,
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
  },
  teams: {
    color: config.ThemeColor,
    fontSize: 20,
    fontWeight: '700',
  },
  noReferContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  notReferImg: {
    height: 200,
    width: 200,
    marginVertical: 10,
  },
  noReferText: {
    fontSize: 18,
    color: '#FB475E',
    fontWeight: '600',
    marginVertical: 5,
  },
});
export default ReferScreen;
