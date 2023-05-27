import React, {Component} from 'react';
import {View, Image, FlatList} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Text from '../../../components/CustomText';
import _retrieveData from '../../../local_cache/_retrieveData';
import _fetch from '../../../fetch_function/_fetch';
import StarRating from 'react-native-star-rating';
import styles from './style';
import moment from 'moment';
import No_Record from '../../../components/No_Record';

export default class index extends Component {
  state = {
    dataSource: [
      {
        id: 1,
        customer_name: 'Ali',
        date: new Date(),
        pic_link: 'https://bootdey.com/img/Content/avatar/avatar1.png',
        cat: 'Category',
        review: 'Good ',
        rating: 3,
      },
    ],
    email: '',
    star_counting: 0,
    refreshing: true,
  };

  async componentDidMount() {
    this.load_data();
  }

  load_data = async () => {
    let email = await _retrieveData();
    this.setState({email});

    this.setState({
      refreshing: false,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.load_data(),
    );
  };

  render() {
    if (this.state.dataSource === 'No record') {
      return <No_Record>No Review</No_Record>;
    }
    return (
      <View style={styles.appContainer}>
        <NavigationEvents onDidFocus={() => this.componentDidMount()} />
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          columnWrapperStyle={styles.listContainer}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          extraData={this.state.metaData}
          data={this.state.dataSource}
          keyExtractor={item => item.id}
          style={styles.eventList}
          renderItem={event => {
            const item = event.item;
            return (
              <View style={styles.container}>
                <Image
                  source={{uri: item.pic_link}}
                  style={styles.customerImage}
                />
                <View style={styles.bodyContainer}>
                  <View style={styles.nameDateContainer}>
                    <View style={{flex: 1}}>
                      <Text style={styles.nameText}>
                        {' '}
                        {item.customer_name.split(' ')[0]}
                      </Text>
                    </View>

                    <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>
                        {' '}
                        {moment(item.date).format('L')}
                      </Text>
                    </View>
                  </View>
                  {/* END OF NAME AND DATE */}

                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}> {item.cat}</Text>
                  </View>

                  <View style={styles.ratingContainer}>
                    <StarRating
                      disabled={true}
                      starSize={18}
                      starStyle={{width: 20}}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={Number.parseFloat(item.rating)}
                      fullStarColor={'#f1c40f'}
                    />
                  </View>
                  {/* END OF RATING */}
                  <View style={styles.reviewContainer}>
                    <Text style={styles.reviewText}> {item.review}</Text>
                  </View>
                  {/* END OF COMMENT */}
                  <View>
                    <View style={styles.border} />
                  </View>
                  {/* END OF LINE DRAW */}
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
