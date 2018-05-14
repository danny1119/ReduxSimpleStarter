import React,{ Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import _ from 'lodash';

const API_KEY = 'AIzaSyA2qntta-_xRUd5OMiA_t9Bct1JuGu-my4';

//Create a new component. This component should produce
//some html

class App extends Component{
  constructor(props){
      super(props);

      this.state = {
        videos: [],
        selectedVideo: null
      };
      this.videoSearch('surfboard');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term},(videos)=>{
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      }); // gets data from searching put into valuable videos and set it to state
    });
  }


  render (){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange= {videoSearch}  />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos}/>
      </div>
    );
  }
}
// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />,document.querySelector('.container'));
