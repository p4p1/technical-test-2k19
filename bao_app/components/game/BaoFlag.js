import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default class BaoFlag extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.flags.map(item => {
          if (item == 'fr-FR_ReneeVoice') {
            return <View style={styles.imageContainer}>
                    <Image style={styles.flagImg} source={{uri: "http://www.redapplereading.com/blog/wp-content/uploads/french_flag.jpg"}} />
                  </View>;
          } else if (item == 'pt-BR_IsabelaVoice') {
            return <View style={styles.imageContainer}>
              <Image style={styles.flagImg} source={{uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HFDP6apvouo_FycOJ2tmsAHaFL%26pid%3DApi&f=1"}} />
                  </View>;
          } else if (item == 'zh-CN_LiNaVoice') {
            return <View style={styles.imageContainer}>
              <Image style={styles.flagImg} source={{uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ffa%2FFlag_of_the_People%2527s_Republic_of_China.svg%2F255px-Flag_of_the_People%2527s_Republic_of_China.svg.png&f=1&nofb=1"}} />
                  </View>;
          } else if (item == 'en-GB_CharlotteV3Voice') {
            return <View style={styles.imageContainer}>
              <Image style={styles.flagImg} source={{uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.e_bbO_MwobphE7AiIzUzyQHaEA%26pid%3DApi&f=1"}} />
                  </View>;
          } else if (item == 'ar-AR_OmarVoice') {
            return <View style={styles.imageContainer}>
              <Image style={styles.flagImg} source={{uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F77%2FFlag_of_Algeria.svg%2F1200px-Flag_of_Algeria.svg.png&f=1&nofb=1"}} />
                  </View>;
          }
        })}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  imageContainer: {
    marginTop: 5,
  },
  flagImg: {
    width: 100,
    height: 70
  }
});
