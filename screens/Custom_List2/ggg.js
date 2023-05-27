

                  <View style={{
                    flexDirection: "column",
                    height: 118,

                  }}>

                    <View style={{
                      flexDirection: "column",

                    }}>

                      <View
                        style={{
                          // alignItems: "center",
                          // justifyContent: "center",
                          // flex: 2
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.black,
                            fontSize: 18,
                            fontFamily: "Raleway-BoldItalic"
                          }}
                        >
                          {item.Name}
                        </Text>
                      </View>


                      <View
                        style={{
                          // flex: 1,
                          // flexDirection: "row"
                        }}
                      >
                        <Text style={{ color: Colors.black, height: 58, width: screen_size_width * .5 ,  opacity: 0.4,}}>{item.Detail}</Text>
                      </View>


                    </View>




                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 5,
                      // alignSelf:'flex-end',
                      // alignItems: 'flex-end',
                      // alignContent: 'flex-end'

                    }}>

                      <View
                        style={{
                          flex: 2,
                          alignItems: "flex-start",
                      alignContent: "flex-start"
                        }}
                      >

                        <LinearGradient
                          style={{ borderRadius: 23, }}
                          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                          colors={['#446BD6', '#446BD6', '#5652D5']} >

                          <Text
                            style={{
                              // backgroundColor: Colors.footer,
                              paddingRight: 15,
                              paddingLeft: 15,
                              textAlign: "center",
                            
                              paddingBottom: 5,
                              paddingTop: 5,
                              fontSize: 17,
                              // borderRadius:20,
                              fontWeight: "bold",



                              // borderTopLeftRadius: 20,
                              // borderBottomLeftRadius: 20
                            }}
                          >
                            £ {item.Price}
                          </Text>

                        </LinearGradient>


                      </View>






                      {/* BUTTON ADD TO CART  Start*/}
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          // alignItems:'flex-end',
                          // marginLeft: 25,
                          // marginTop: 8
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.removeItem(item.Item_Id, item.C_ID, item)
                          }
                        >
                          {/* <Ionicons
                            name="ios-remove-circle"
                            size={35}
                            color="#000"
                          /> */}


                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/minus.png')}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity

                          style={{

                            marginLeft: 10,
                            marginRight:5
                          }}
                          onPress={() =>
                            this.addItem(
                              item.Item_Id,
                              item.C_ID,
                              item.Name,
                              item.Price,
                              item
                            )
                          }
                        >
                          {/* <Ionicons
                            name="ios-add-circle"
                            size={35}
                            color="#000"
                          /> */}
                          <Image
                            style={{ height: 28, width: 28, borderRadius: 8 }}
                            source={require('../../Images/plus.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* BUTTON ADD TO CART END */}



                    </View>




                  </View>


