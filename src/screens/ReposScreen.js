import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,FlatList,Image,Spinner
} from 'react-native';
import {lightGray,darkBlue} from '../styles/Colors'
import {fontSizeResponsive} from '../utils/Metrics'
const screenWidth = Dimensions.get('window').width;

export default class ReposScreen extends Component {
  constructor (props){
    super(props);
    this.state = {
    username: '',
    repos: [],
    loading: false,
    isLoadingMore: false,
    isRefreshing: false,
    error: '',
    page: 2,
    loadMore: 'Load More'
    }
    
  }
static navigationOptions = {
        header: null
    }
  _handleChange = (evt) => {
    this.setState({
      username: evt.nativeEvent.text
    });
  }

  _getPageUserRepos = (username) => {

    username = username.toLowerCase().trim();
    try {
       const url = `https://api.github.com/users/${username}/repos?page=${this.state.page}`
        return fetch(url).then((res) => res.json());
    } catch (error) {
      console.log('error API',error);
      
    }
   
    
  }
  _getUserRepos = (username) => {

    username = username.toLowerCase().trim();
    try {
       const url = `https://api.github.com/users/${username}/repos`
        return fetch(url).then((res) => res.json());
    } catch (error) {
      console.log('error API',error);
      
    }
   
    
  }
  _handleSubmit = () => {
    this._getUserRepos(this.state.username)
      .then((res) => {
        this.setState({repos: res});
        // console.log('repos',res);
        
      });
  }



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
  const {username,repos} = this.state;
      if(repos.length>0){
        return(
      <View style={styles.loadingMore}>
          <TouchableOpacity
            style={styles.loadingButton}
            onPress={
              ()=>{
                  this.setState({page: (this.state.page+1)}); 
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
        return null;
      }

}
_handleLoadMore = () => {
  this._getPageUserRepos(this.state.username) 
  .then((res)=>{
  if(res.length<30){
    // console.log('Không còn data');
    this.setState({
      loadMore: 'Đã hết Repos'
    })
    
  }else{
    this.setState({
      repos: [...this.state.repos, ...res]
    })
  }
        // console.log('new',this.state.repos);
        
    })
  };

_renderItem =  ({ item }) => (
            <TouchableOpacity 
             onPress={
              () => this.props.navigation.navigate('Details',{full_name: item.full_name})
               }
            >
            <View style={{
              flexDirection: 'row',
              padding: 15,
              alignItems: 'center'
            }}>
            <Image source={{ uri: item.owner.avatar_url }} 
                style={{
                height: 50,
                width: 50,
                marginRight: 10
              }} />
              <Text style={{
                fontSize: 18,
                alignItems: 'center',
                color: '#65A7C5',
              }}>{item.full_name}</Text>
              <Text style={{
                
                fontSize: 18,
                alignItems: 'center',
                color: 'red',
              }}>{item.stargazers_count}</Text>
            </View>
            </TouchableOpacity>
          )

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          placeholder="Enter your github username"
          style={styles.input}
          onChange={this._handleChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={this._handleSubmit}
          >
          <Text style={styles.buttonText}>VIEW</Text>
        </TouchableOpacity>
        {/* { this._renderRepos() }, */}
        <FlatList
          data={this.state.repos}
          extraData={this.state}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.isRefreshing}
          //     onRefresh={this.onRefresh.bind(this)}
          //   />
          // }
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          // onEndReached={this.handleLoadMore}
        />
        {/* {this.renderFooter} */}
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
});