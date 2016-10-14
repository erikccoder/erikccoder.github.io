// import ReactList from 'react-list';


const Duration = 5000; // in seconds

class App extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        message: 'this is default message!',
        index: 0,
        images: [],
        canvasW: 0,
        canvasH:0,
      };

      this.timeStamp = null;

      this.initCastReceiver();
      this.initMessageBus();

    };

    initCastReceiver(){

      window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
      console.log('Starting Receiver Manager');

      // handler for the 'ready' event
      castReceiverManager.onReady = function(event) {
        console.log('Received Ready event: ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Application status is ready...");
      };

      // handler for 'senderconnected' event
      castReceiverManager.onSenderConnected = function(event) {
        console.log('Received Sender Connected event: ' + event.data);
        console.log(window.castReceiverManager.getSender(event.data).userAgent);
      };

      // handler for 'senderdisconnected' event
      castReceiverManager.onSenderDisconnected = function(event) {
        console.log('Received Sender Disconnected event: ' + event.data);
        if (window.castReceiverManager.getSenders().length == 0) {
          window.close();
        }
      };

      // handler for 'systemvolumechanged' event
      castReceiverManager.onSystemVolumeChanged = function(event) {
        console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
            event.data['muted']);
      };
    };

    initMessageBus(){

      // create a CastMessageBus to handle messages for a custom namespace
      window.messageBus =
        window.castReceiverManager.getCastMessageBus(
            'urn:x-cast:1DFBC86D');

      // handler for the CastMessageBus message event
      window.messageBus.onMessage = (event) =>
      {
            console.log('Message [' + event.senderId + ']: ' + event.data);
            this.fetchJson(event.data);

        // display the message from the sender
        this.setState({
            message: event.data
        });

        // inform all senders on the CastMessageBus of the incoming message event
        // sender message listener will be invoked
        window.messageBus.send(event.senderId, event.data);
      }
      // initialize the CastReceiverManager with an application status message
      window.castReceiverManager.start({statusText: "Application is starting"});
      console.log('Receiver Manager started');
    };

    componentWillMount(){

      // this.fetchJson('./data.json');
      requestAnimationFrame(this.loop.bind(this));

    };

    fetchJson(url){

        console.log("start fetching", url);
      fetch(url)
        .then(response => response.json())
        .then(data=>
        {
            this.setState({
                images: data,
            });
            console.log("loaded",data);
        })
        .catch(err => console.warn('data.json failed',err));
    };

    loop(stamp){

        if(this.timeStamp === null){
          this.timeStamp = stamp;
          requestAnimationFrame(this.loop.bind(this));
          return;
        }

        let diff = stamp - this.timeStamp;

        if(diff >= Duration && this.state.images.length)
        {
          let _i = (this.state.index + 1) % this.state.images.length;
          this.setState({index: _i});
          this.timeStamp = stamp;
        }



        requestAnimationFrame(this.loop.bind(this));
    };

    getClassName(i)
    {
       let className = "image";

       if(this.state.index != i){
          className += " hide";
       }
       return className;
    };

    getBackgroundStyle(i){
      let imgUrl = this.state.images[i].original_url;
      return {
          backgroundImage: 'url('+ imgUrl +')'
      };
    };

    renderItem(index, key) {
      let className = this.getClassName(key);
      let style = this.getBackgroundStyle(key);
        console.log(index, style);
      return (
          <div className={className}
                key={key}
                style={style}
                ></div>
      );
    };
    render(){
      return (
              <ReactList
                itemRenderer={this.renderItem.bind(this)}
                length={this.state.images.length}
                type='uniform'
              />
      );
    };
}



ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('content')
);
