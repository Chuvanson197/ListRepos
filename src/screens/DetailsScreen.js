import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,FlatList,Image,Spinner,Button
} from 'react-native';
import {lightGray,darkBlue} from '../styles/Colors'
import {fontSizeResponsive} from '../utils/Metrics'
const screenWidth = Dimensions.get('window').width;


export default class DetailsScreen extends React.Component{
  static navigationOptions =({navigation}) =>{
    const params = navigation.state.params || {};
    return {
    header: null
    }
    } 
    constructor (props){
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      data: [],
      page: 2,
      loadMore: 'Load More'
    }
    }
    componentDidMount() {
      const {full_name}= this.props.navigation.state.params;
      this._getStarInfor(full_name)
      .then((res)=>{
      this.setState({
      data: res
    })
        console.log('new',this.state.data);
        
    })
    }
    _getStarInfor = (full_name) => {
    const url = `https://api.github.com/repos/${full_name}/stargazers`;
    console.log('url',url);
    
    return fetch(url).then((res) => res.json());  
  }
   _getPageStarInfor = (full_name) => {
    const url = `https://api.github.com/repos/${full_name}/stargazers?page=${this.state.page}`;
    console.log('url',url);
    
    return fetch(url).then((res) => res.json());  
  }
  //   _getStar= ()=>{
  //   const {full_name}= this.props.navigation.state.params;
  //   console.log('full_name',full_name);
    
  //   this._getStarInfor(full_name)
  //     .then((res) => {
  //       this.setState({data: [...this.state.data, ...res]});
  //       console.log('repos',res);
  //       console.log('data',this.state.data);
        
        
  //     });
  // }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  }
renderFooter = ()=>{
  const {username,data} = this.state;
      if(data.length>0){
        return(
      <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={
              ()=>{
                  this.setState({
                    page: (this.state.page+1)
                    }); 
                  this._handleLoadMore();
                  // console.log('page',this.state.page);                 
              }
              }
          >
            <Text style={styles.loadingText}>{this.state.loadMore}</Text>
          </TouchableOpacity>
        </View>
        );
      }else{
        return (
          <Text>Không có stargazers nào</Text>
        )
      }

}
_handleLoadMore = () => {
  const {full_name}= this.props.navigation.state.params;
    console.log('full_name',full_name);
    
    this._getPageStarInfor(full_name)
      .then((res) => {
        if(res<30){
          this.setState({
            loadMore: 'ĐÃ HẾT DATA'
          })
          // console.log('KHONG CO DATA');
          
        }else{
          this.setState({
          data: [...this.state.data, ...res]
        });
        }
        console.log('data',data);
        
      });

  // this._getStar() 
  // .then((res)=>{
  // this.setState({
  //     data: [...this.state.data, ...res]
  //   })
  //       console.log('new',this.state.data);
        
  //   })
  };
render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.isRefreshing}
          //     onRefresh={this.onRefresh.bind(this)}
          //   />
          // }
          renderItem={({ item }) => (
           
            <View style={{
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center'
            }}>
            <Image source={{ uri: item.avatar_url }} 
                style={{
                height: 50,
                width: 50,
                marginRight: 10
              }} />
              <Text style={{
                fontSize: 18,
                alignItems: 'center',
                color: '#65A7C5',
              }}>{item.login}</Text>
              
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
        />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    width: screenWidth - 20,
    height: 38,
    padding: 4,
    fontSize: 16,
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  ///
    loadingMore: {
    paddingTop: 20,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingButton: {
    padding: 10,
    width: '50%',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: lightGray
  },
  loadingText: {
    fontSize: fontSizeResponsive(2.1),
    color: darkBlue,
    textAlign: 'center'
  }
})