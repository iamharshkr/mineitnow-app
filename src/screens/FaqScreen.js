import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {List, Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../../config/config';

const FaqScreen = () => {
  const [expanded, setExpanded] = React.useState(true);
  const faqs = [
    {
      question: 'What is ' + config.APP_NAME + '?',
      answer:
        config.APP_NAME +
        ' is an app which helps you earn cryptoc coins. You have to just start your mining sessions in every 24 hours and for that you will get coins which you can convert into your favourite coins dn you can withdraw it to your wallet.',
    },
    {
      question: 'How this app helps in earing coins ?',
      answer:
        config.APP_NAME +
        ' app gives you minecoins for every mining seasons you started. You can withdraw your coins in your crypto wallet. Your money will be sent within one to two working days.',
    },
    {
      question: 'How refer and earn works ?',
      answer:
        'You can refer your friends and family to ' +
        config.APP_NAME +
        ' app. For every active referral your mining speed will be increased by 1 coin per hours.\nFor Eg: You have 5 active referral then you will get extra 5 five coins per hour.',
    },
    {
      question: 'Why mined coins and available coins are different ?',
      answer:
        'Mined coin is coin which you are mining right now after. When you start your another season, your all mined coins will be added to your account and your available coins will be increased. ',
    },
  ];
  const themes = useTheme();
  const handlePress = () => setExpanded(!expanded);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <List.Section
            style={styles.bcTransparent}
            titleStyle={styles.header}
            title="Frequently Asked Questions ?">
            {faqs.map(faq => (
              <List.Accordion
                titleStyle={styles.Accordion}
                key={faq.question}
                titleNumberOfLines={4}
                title={faq.question}
                left={props => (
                  <Ionicons
                    color={themes.colors.text}
                    name="help-circle-outline"
                    size={24}
                  />
                )}>
                <List.Item
                  style={styles.description}
                  descriptionNumberOfLines={10}
                  key={faq.answer}
                  description={faq.answer}
                />
              </List.Accordion>
            ))}
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: '700',
    color: 'blue',
  },
  bcTransparent: {
    backgroundColor: 'transparent',
  },
  description: {
    marginTop: -25,
    marginLeft: -25,
  },
  Accordion: {
    color: config.ThemeColor,
    fontWeight: '700',
  },
});
export default FaqScreen;
